"use server";

import { deleteRoom, getRoom } from "@/data-access/rooms";
import { getServerAuthSession } from "@/server/auth";
import { revalidatePath } from "next/cache";

export async function deleteRoomAction(roomId: string) {
  const session = await getServerAuthSession();

  if (!session) {
    throw new Error("you must be logged in to create this room");
  }

  const room = await getRoom(roomId);

  if (room?.userId !== session.user.id) {
    throw new Error("User not authorized");
  }

  await deleteRoom(roomId);

  revalidatePath("/manage-rooms");
}
