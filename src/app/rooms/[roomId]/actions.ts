"use server";

import { env } from "@/env";
import { getServerAuthSession } from "@/server/auth";
import { StreamChat } from "stream-chat";

export async function generateTokenAction() {
  const session = await getServerAuthSession();

  if (!session) {
    throw new Error("No session found");
  }

  const api_key = env.NEXT_PUBLIC_GET_STREAM_IO_API_KEY;
  const api_secret = env.GET_STREAM_IO_SECRET_KEY;
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const token = serverClient.createToken(session.user.id);
  console.log("token", token);
  return token;
}
