import { room, type Room } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq, ilike } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";

export async function getRooms(search: string | undefined) {
  const searchTag = search ? ilike(room.tags, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({
    where: searchTag,
  });

  return rooms;
}

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

export async function getUserRooms() {
  const session = await getServerAuthSession();

  if (!session) {
    throw new Error("User is not logged in!");
  }

  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });
  return rooms;
}
