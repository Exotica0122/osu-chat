"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Room } from "@/server/db/schema";
import Link from "next/link";
import { deleteRoomAction } from "./actions";

export const RoomCard = (room: Room) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>{room.tags}</CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
        <Button onClick={() => deleteRoomAction(room.id)}>Delete Room</Button>
      </CardFooter>
    </Card>
  );
};
