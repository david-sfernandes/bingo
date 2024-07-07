"use client";
import useBingoStore from "@/store/state";
import { Checkbox } from "@headlessui/react";
import { useState } from "react";

export default function NumberBlock({
  bingoNum,
  isSelected,
  handleClick,
}: {
  bingoNum: number;
  isSelected: boolean;
  handleClick: () => void;
}) {
  const [isChecked, setIsChecked] = useState(isSelected);

  return (
    <Checkbox
      defaultChecked={isChecked}
      className="group flex justify-center items-center cursor-pointer bg-white size-20"
      onClick={() => {
        setIsChecked(!isChecked);
        handleClick();
      }}
    >
      <p
        className={`relative text-4xl font-medium text-center rounded-full p-2 text-zinc-950 isolate size-14
          transition-all duration-200 ease-in-out 
          group-data-[checked]:bg-orange-500 group-data-[checked]:text-white group-data-[checked]:shadow-lg group-data-[checked]:scale-105"}`}
      >
        {bingoNum}
      </p>
    </Checkbox>
  );
}
