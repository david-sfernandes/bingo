import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {
  bingoNumbers: number[];
  email: string;
  name: string;
  uuid: string;
  setBingoNumbers: (bingoNumbers: number[]) => void;
  login: (email: string, name: string, uuid: string) => void;
}

const useBingoStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        bingoNumbers: [],
        email: "",
        name: "",
        uuid: "",
        setBingoNumbers: (bingoNumbers) => set({ bingoNumbers }),
        login: (email, name, uuid) => set({ email, name, uuid}),
      }),
      {
        name: "bingo-storage",
      }
    )
  )
);

export default useBingoStore;
