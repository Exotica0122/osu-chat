"use client";

import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

export const TagList = ({ tagList }: { tagList: string[] }) => {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      {tagList.map((tag) => (
        <Badge
          key={tag}
          onClick={() => router.push(`/browse?search=${tag}`)}
          className="cursor-pointer"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};
