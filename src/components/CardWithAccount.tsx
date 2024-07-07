"use client";
import NumberBlock from "./NumberBlock";

import { onSnapshot, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";

export default function CardWithAccount({ userDoc }: { userDoc: any }) {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const getPlayerNumbers = () => {
    if (!auth.currentUser || !userDoc) return;
    const data = userDoc.data().numbers;
    setNumbers(data);
  };

  const getSelectedNumbers = () => {
    if (!auth.currentUser || !userDoc) return;
    const data = userDoc.data().selectedNumbers;
    setSelectedNumbers(data);
  };

  const selectNumber = async (num: number) => {
    if (!numbers.includes(num)) return;
    const list = [...selectedNumbers, num];
    await updateDoc(userDoc.ref, { selectedNumbers: list });
    setSelectedNumbers(list);
  };

  const unselectNumber = async (num: number) => {
    const list = selectedNumbers.filter((n) => n != num);
    await updateDoc(userDoc.ref, { selectedNumbers: list });
    setSelectedNumbers(list);
  };

  const handleClick = async (num: number) => {
    if (!auth.currentUser || !userDoc) return;
    console.log("click", num);
    if (selectedNumbers.includes(num)) {
      await unselectNumber(num);
    } else {
      await selectNumber(num);
    }
  };

  useEffect(() => {
    getPlayerNumbers();
    getSelectedNumbers();
  }, [userDoc]);

  console.log("render");
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
            {selectNumber.length}/{numbers.length}
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
