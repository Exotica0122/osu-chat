import { db } from "@/server/db";
import { accounts } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getUserAccessToken(userId: string) {
  const token = await db.query.accounts.findFirst({
    columns: { access_token: true },
    where: eq(accounts.userId, userId),
  });

  if (!token?.access_token) {
    return;
  }

  return token.access_token;
}
