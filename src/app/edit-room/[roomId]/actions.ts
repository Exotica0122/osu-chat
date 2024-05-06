"use server";

import { editRoom } from "@/data-access/rooms";
import { getServerAuthSession } from "@/server/auth";
import { type Room } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData: Room) {
  const session = await getServerAuthSession();

  if (!session) {
    throw new Error("you must be logged in to create this room");
  }

  await editRoom(roomData);

  revalidatePath("/manage-rooms");
  revalidatePath(`/edit-room/${roomData.id}`);
  redirect("/manage-rooms");
}
