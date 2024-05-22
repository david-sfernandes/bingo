"use client";
import useBingoStore from "@/store/state";
import { useState } from "react";

export default function NumberBlock({ bingoNum }: { bingoNum: BingoNum }) {
  const { setBingoNumbers, bingoNumbers } = useBingoStore();

  const handleClick = () => {
    const newNumbers = bingoNumbers.map((item) =>
      item.num == bingoNum.num
        ? { num: item.num, selected: !item.selected }
        : item
    );
    setBingoNumbers(newNumbers);
  };

  return (
    <div
      className="border border-gray-400/80 p-4 cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`relative text-4xl font-medium text-center rounded-full p-2 text-zinc-950
        before:content-[''] before:absolute before:inset-0 before:rounded-full isolate before:bg-green-500/90
        before:transition-transform before:scale-0 before:transform before:-z-10 before:m-auto before:h-14 before:w-14
        ${
          bingoNum.selected &&
          " before:scale-100 before:transform before:transition-transform"
        }`}
      >
        {bingoNum.num}
      </div>
    </div>
  );
}
