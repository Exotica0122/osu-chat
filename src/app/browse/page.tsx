import { getRooms } from "@/data-access/rooms";
import { SearchBar } from "./search-bar";
import { RoomCard } from "./room-card";

export default async function Browse({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  const rooms = await getRooms(searchParams.search);

  return (
    <>
      <p>Browse</p>
      <SearchBar />
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </>
  );
}
