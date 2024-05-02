"use client";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { env } from "@/env";
import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  type Call,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { generateTokenAction } from "./actions";
import { useRouter } from "next/navigation";

const apiKey = env.NEXT_PUBLIC_GET_STREAM_IO_API_KEY;

export const VideoPlayer = ({ room }: { room: { id: string } }) => {
  const router = useRouter();
  const session = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);

  useEffect(() => {
    if (!session.data || !room) return;

    const userId = session.data.user.id;

    const client = new StreamVideoClient({
      apiKey,
      user: { id: userId },
      tokenProvider: () => generateTokenAction(),
    });
    const call = client.call("default", room.id);

    setClient(client);
    setCall(call);

    call.join({ create: true }).catch((error) => console.log(error));

    return () => {
      call
        .leave()
        .then(() => client.disconnectUser())
        .catch(console.error);
    };
  }, [room, session]);

  return (
    <>
      {client && call && (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <StreamTheme>
              <SpeakerLayout />
              <CallControls onLeave={() => router.push("/browse")} />
            </StreamTheme>
          </StreamCall>
        </StreamVideo>
      )}
    </>
  );
};
