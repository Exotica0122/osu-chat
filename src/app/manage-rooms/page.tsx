import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserRooms } from "@/data-access/rooms";
import { type Room } from "@/server/db/schema";
import Link from "next/link";

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

const RoomCard = (room: Room) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>{room.tags}</CardContent>
      <CardFooter>
        <Button>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
