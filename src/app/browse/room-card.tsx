import { type Room } from "@/server/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { splitTags } from "@/lib/utils";
import { TagList } from "@/components/tag-list";
import { LinkIcon } from "lucide-react";

export const RoomCard = ({ room }: { room: Room }) => {
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
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
