import { getUserAccessToken } from "@/data-access/accounts";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("id")!;

  const accessToken = await getUserAccessToken(userId);

  if (!accessToken) {
    return new Response(`Token not found for userId: ${userId}`, {
      status: 404,
    });
  }

  return NextResponse.json({ accessToken });
}
