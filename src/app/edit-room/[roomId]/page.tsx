import { getRoom } from "@/data-access/rooms";
import { EditRoomForm } from "./edit-room-form";
import { type Room } from "@/server/db/schema";

export default async function EditRoomPage(props: {
  params: { roomId: string };
}) {
  const roomId = props.params.roomId;
  let room: Room | undefined;

  try {
    room = await getRoom(roomId);
  } catch (e) {
    console.error(`No room found for id:${roomId}`);
  }

  if (!room) {
    return <p>This room does not exist!</p>;
  }

  return (
    <>
      <EditRoomForm room={room} />
    </>
  );
}
