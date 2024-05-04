import { getRoom } from "@/data-access/rooms";
import { RoomDescriptionCard } from "./room-description-card";
import { VideoPlayer } from "./video-player";

export default async function CallRoom(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;
  const room = await getRoom(roomId);

  if (!room) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h2>This room no longer exists!</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 md:flex-row">
      <div className="flex-1">
        <VideoPlayer room={{ id: roomId }} />
      </div>
      <div className="md:w-80">
        <RoomDescriptionCard room={room} />
      </div>
    </div>
  );
}
