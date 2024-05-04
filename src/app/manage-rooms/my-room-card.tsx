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
import { Edit, LinkIcon, Trash } from "lucide-react";
import { TagList } from "@/components/tag-list";
import { splitTags } from "@/lib/utils";

export const MyRoomCard = (room: Room) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{room.name}</span>
          {room.osuCollectorLink && (
            <Button asChild variant={"outline"}>
              <Link href={room.osuCollectorLink}>
                <LinkIcon />
              </Link>
            </Button>
          )}
        </CardTitle>
        <CardDescription className="truncate">
          {room.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TagList tagList={splitTags(room.tags)} />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
        <div className="flex gap-4">
          <Button asChild variant={"secondary"}>
            <Link href={`/edit-room/${room.id}`}>
              <Edit />
            </Link>
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteRoomAction(room.id)}
          >
            <Trash />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
