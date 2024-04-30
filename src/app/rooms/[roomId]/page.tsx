import { VideoPlayer } from "./video-player";

export default function CallRoom(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;
  return <VideoPlayer room={{ id: roomId }} />;
}
