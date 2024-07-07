"use client";
import useBingoStore from "@/store/state";
import generateNumbers from "@/utils/generateNumbers";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

export default function UpdateBtn() {
  const { setBingoNumbers } = useBingoStore();

  const updateNumbers = () => {
    setBingoNumbers(generateNumbers(10, 99));
  };

  return (
    <button onClick={updateNumbers} className="text-white p-1">
      <ArrowPathIcon className="h-8 w-8"/>
    </button>
  );
}
