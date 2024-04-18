import { type Client } from "osu-web.js";
import { create } from "zustand";

export type OsuStoreType = {
  client: Client<undefined> | null;
  setClient: (client: Client<undefined>) => void;
};

export const useOsuStore = create<OsuStoreType>((set) => ({
  client: null,
  setClient: (client) => set({ client }),
}));
