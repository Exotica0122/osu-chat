"use client";

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

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { generateTokenAction } from "./actions";

const apiKey = env.NEXT_PUBLIC_GET_STREAM_IO_API_KEY;

export const VideoPlayer = ({ room }: { room: { id: string } }) => {
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
      void call.leave();
      void client.disconnectUser();
    };
  }, [room, session]);

  return (
    <>
      {client && call && (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <StreamTheme>
              <SpeakerLayout />
              <CallControls />
            </StreamTheme>
          </StreamCall>
        </StreamVideo>
      )}
    </>
  );
};
