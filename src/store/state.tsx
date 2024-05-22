import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {
  bingoNumbers: BingoNum[];
  setBingoNumbers: (bingoNumbers: BingoNum[]) => void;
}

const useBingoStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        bingoNumbers: [],
        setBingoNumbers: (bingoNumbers) => set({ bingoNumbers }),
      }),
      {
        name: "bingo-storage",
      }
    )
  )
);

export default useBingoStore;
