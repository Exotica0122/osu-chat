import { getRooms } from "@/data-access/rooms";
import { SearchBar } from "./search-bar";

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
        <>
          <p>{room.name}</p>
          <p>{room.tags}</p>
        </>
      ))}
    </>
  );
}
