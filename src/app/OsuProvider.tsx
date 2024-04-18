"use client";

import { useOsuStore } from "@/store/useOsuStore";
import { type ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Client } from "osu-web.js";

export default function OsuProvider({ children }: { children: ReactNode }) {
  const session = useSession();
  const setClient = useOsuStore((state) => state.setClient);

  useEffect(() => {
    async function getOsuClient() {
      if (session.data) {
        const response = await fetch(
          `/api/osu/token?id=${session.data.user.id}`,
        );
        const data = (await response.json()) as { accessToken: string };

        if (!data)
          throw new Error(
            `No access token found for user: ${session.data.user.id}`,
          );

        const client = new Client(data.accessToken);

        setClient(client);
      }
    }
    void getOsuClient();
  }, [session, setClient]);

  return <>{children}</>;
}
