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

const apiKey = env.NEXT_PUBLIC_GET_STREAM_IO_API_KEY;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjFlMjJmYzYtYmQ0NC00NWI3LTkyNmUtZDkwMjY0YTNlMTUyIn0.VdmsjSJTH2JROQccvDFbS3B-qE1-rjgM01clEIGv1Ns";

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
      token,
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

// export const MyVideoUI = () => {
//   const { useParticipants } = useCallStateHooks();
//   const participants = useParticipants();
//   return (
//     <>
//       {participants.map((p) => (
//         <ParticipantView participant={p} key={p.sessionId} />
//       ))}
//     </>
//   );
// };
