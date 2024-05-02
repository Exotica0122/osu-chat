import { type Room } from "@/server/db/schema";
import { db } from "@/server/db";

export async function createRoom(
  roomData: Omit<Room, "id" | "userId">,
  userId: string,
) {
  const inserted = await db
    .insert(room)
    .values({ ...roomData, userId })
    .returning();
  return inserted[0];
}
