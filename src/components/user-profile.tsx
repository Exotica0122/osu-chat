"use client";

import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { LoaderIcon, LogInIcon, UserIcon } from "lucide-react";

export function UserProfile() {
  const session = useSession();

  const renderIcon = () => {
    if (session.status === "unauthenticated") {
      return <LogInIcon className="mr-1" />;
    }

    if (session.status === "authenticated" && session.data?.user.image) {
      return (
        <Image
          alt="User avatar"
          className="rounded-full"
          height="32"
          src={session.data.user.image}
          style={{
            aspectRatio: "32/32",
            objectFit: "cover",
          }}
          width="32"
        />
      );
    }

    if (session.status === "authenticated") {
      return <UserIcon className="mr-1" />;
    }

    return <LoaderIcon />;
  };

  const renderMenuContent = () => {
    if (session.status === "loading") return;

    if (session.status === "authenticated") {
      return (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{session.data.user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      );
    }
    return (
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => signIn("osu")}>Login</DropdownMenuItem>
      </DropdownMenuContent>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          {renderIcon()}
        </Button>
      </DropdownMenuTrigger>
      {renderMenuContent()}
    </DropdownMenu>
  );
}
