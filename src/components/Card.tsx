"use client";
import useBingoStore from "@/store/state";
import generateNumbers from "@/utils/generateNumbers";
import { Button } from "@headlessui/react";
import NumberBlock from "./NumberBlock";

import Link from "next/link";

export default function Card() {
  const { setBingoNumbers, bingoNumbers, setSelectedNumbers, selectedNumbers } =
    useBingoStore();

  const updateNumbers = () => {
    setBingoNumbers(generateNumbers(10, 99));
  };

  if (selectedNumbers.length == 16) {
    alert("Bingo!");
  }

  const handleNumberClick = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  console.log(bingoNumbers);

  return (
    <div className="flex flex-col justify-center bg-white">
      {bingoNumbers.length == 0 && (
        <>
          <Button className="btn-green" onClick={updateNumbers}>
            Gerar cartela
          </Button>
          <Link href="/" className="btn-orange">
            Sair
          </Link>
        </>
      )}
      {bingoNumbers.length > 0 && (
        <>
          <p className="text-center text-gray-700 text-lg mb-1">
            {selectedNumbers.length}/{bingoNumbers.length}
          </p>
          <div className="border rounded-2xl overflow-hidden border-gray-400/80 grid grid-cols-4 grid-rows-4 gap-[2px] bg-gray-400/80 w-fit mx-auto">
            {bingoNumbers.map((num) => (
              <NumberBlock
                bingoNum={num}
                isSelected={selectedNumbers.includes(num)}
                handleClick={() => handleNumberClick(num)}
                key={`n-${num}`}
              />
            ))}
          </div>
          <Link href="/" className="btn-orange !mt-2">
            Sair
          </Link>
        </>
      )}
    </div>
  );
}
