"use server";

import { createRoom } from "@/data-access/rooms";
import { getServerAuthSession } from "@/server/auth";
import { type Room } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getServerAuthSession();

  if (!session) {
    throw new Error("you must be logged in to create this room");
  }

  const room = await createRoom(roomData, session.user.id);

  revalidatePath("/browse");

  return room;
}
