"use client";
import NumberBlock from "./NumberBlock";

import { updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";

export default function CardWithAccount({ userDoc }: { userDoc: any }) {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const getPlayerData = () => {
    if (!auth.currentUser || !userDoc) return;
    setNumbers(userDoc.data().numbers);
    setSelectedNumbers(userDoc.data().selectedNumbers);
  };

  const updateSelectedNumbers = async (num: number, isSelected: boolean) => {
    let list = [];
    if (isSelected) list = selectedNumbers.filter((n) => n !== num);
    else list = [...selectedNumbers, num];
    await updateDoc(userDoc.ref, { selectedNumbers: list });
    setSelectedNumbers(list);
  };

  const handleClick = async (num: number) => {
    if (!auth.currentUser || !userDoc) return;
    const isSelected = selectedNumbers.includes(num);
    await updateSelectedNumbers(num, isSelected);
  };

  useEffect(() => getPlayerData(), [userDoc]);

  console.log("card");
  if (!numbers) return null;

  return (
    <div className="flex flex-col justify-center bg-white">
      {numbers.length == 0 && (
        <>
          <Link href="/" className="btn-orange">
            Sair
          </Link>
        </>
      )}
      {numbers.length > 0 && (
        <>
          <p className="text-center text-gray-700 text-lg mb-1">
            {selectedNumbers.length}/{numbers.length}
          </p>
          <div className="border rounded-2xl overflow-hidden border-gray-400/80 grid grid-cols-4 grid-rows-4 gap-[2px] bg-gray-400/80 w-fit mx-auto">
            {numbers.map((num) => (
              <NumberBlock
                bingoNum={num}
                isSelected={selectedNumbers.includes(num)}
                handleClick={() => handleClick(num)}
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
