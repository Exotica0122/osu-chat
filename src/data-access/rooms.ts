import { room, type Room } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq, ilike, or } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";

export async function getRooms(search: string | undefined) {
  const searchName = search ? ilike(room.name, `%${search}%`) : undefined;
  const searchTag = search ? ilike(room.tags, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({
    where: or(searchTag, searchName),
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

export async function editRoom(roomData: Room) {
  const updated = await db
    .update(room)
    .set({
      name: roomData.name,
      description: roomData.description,
      osuCollectorLink: roomData.osuCollectorLink,
      tags: roomData.tags,
    })
    .where(eq(room.id, roomData.id))
    .returning();
  return updated[0];
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

export async function getRoom(roomId: string) {
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}

export async function deleteRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId));
}
