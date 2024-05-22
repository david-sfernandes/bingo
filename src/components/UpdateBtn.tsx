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
    <button onClick={updateNumbers} className="text-slate-500 p-1">
      <ArrowPathIcon className="h-7 w-7"/>
    </button>
  );
}
