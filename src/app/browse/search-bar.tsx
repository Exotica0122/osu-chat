"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [query] = useDebounce(search, 1000);

  useEffect(() => {
    if (searchParams.get("search")) {
      setSearch(searchParams.get("search") ?? "");
    }
  }, [searchParams]);

  useEffect(() => {
    if (query) {
      void router.push(`/browse?search=${search}`);
    } else {
      void router.push(`/browse`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, router]);

  return (
    <div className="flex">
      <Input value={search} onChange={(e) => void setSearch(e.target.value)} />
    </div>
  );
};
