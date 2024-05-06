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
      <p className="mb-2">Search</p>
      <SearchBar />

      <div className="mt-12">
        <p className="my-4">Browse</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </>
  );
}
