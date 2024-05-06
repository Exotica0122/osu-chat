import { Button } from "@/components/ui/button";
import { getUserRooms } from "@/data-access/rooms";
import Link from "next/link";
import { MyRoomCard } from "./my-room-card";

export default async function ManageRooms() {
  const rooms = await getUserRooms();

  console.log(rooms);

  return (
    <>
      <Button asChild>
        <Link href={"/create-room"}>Create Rooms</Link>
      </Button>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <MyRoomCard {...room} key={room.id} />
        ))}
      </div>
    </>
  );
}
