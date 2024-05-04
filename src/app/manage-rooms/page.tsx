import { Button } from "@/components/ui/button";
import { getUserRooms } from "@/data-access/rooms";
import Link from "next/link";
import { RoomCard } from "./room-card";

export default async function ManageRooms() {
  const rooms = await getUserRooms();

  console.log(rooms);

  return (
    <>
      <Button asChild>
        <Link href={"/create-room"}>Create Rooms</Link>
      </Button>

      <div>
        {rooms.map((room) => (
          <RoomCard {...room} key={room.id} />
        ))}
      </div>
    </>
  );
}
