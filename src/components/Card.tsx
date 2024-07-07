import useBingoStore from "@/store/state";
import generateNumbers from "@/utils/generateNumbers";
import { Button } from "@headlessui/react";
import NumberBlock from "./NumberBlock";

import actionCodeSettings from "@/config/actionCodeSettings ";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";

export default function Card({ numbers }: { numbers: number[] }) {
  const { setBingoNumbers } = useBingoStore();
  const auth = getAuth();
  const [email, setEmail] = useState("");

  const loginWithEmail = () => {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  const updateNumbers = () => {
    setBingoNumbers(generateNumbers(10, 99));
  };

  const endGame = () => {
    setBingoNumbers([]);
  };

  const selectCount = numbers.filter((num) => false).length;
  if (selectCount == 16) {
    alert("Bingo!");
  }

  return (
    <div className="flex flex-col justify-center bg-white">
      {numbers.length == 0 && (
        <>
          <Button className="btn-green" onClick={updateNumbers}>
            Gerar cartela
          </Button>
          <Link href="/" className="btn-orange">
            Sair
          </Link>
        </>
      )}
      {numbers.length > 0 && (
        <>
          <p className="text-center text-gray-700 text-lg mb-1">
            {selectCount}/{numbers.length}
          </p>
          <div className="border rounded-2xl overflow-hidden border-gray-400/80 grid grid-cols-4 grid-rows-4 gap-[2px] bg-gray-400/80 w-fit mx-auto">
            {numbers.map((num) => (
              <NumberBlock bingoNum={num} />
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
