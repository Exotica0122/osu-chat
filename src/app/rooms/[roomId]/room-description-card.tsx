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
import { LinkIcon } from "lucide-react";
import { TagList } from "@/components/tag-list";
import { splitTags } from "@/lib/utils";
import Link from "next/link";

export const RoomDescriptionCard = ({ room }: { room: Room }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {room.name}
        </CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <TagList tagList={splitTags(room.tags)} />
      </CardContent>
      {room.osuCollectorLink && (
        <CardFooter>
          <Button asChild variant={"outline"}>
            <Link href={room.osuCollectorLink}>
              <LinkIcon />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
