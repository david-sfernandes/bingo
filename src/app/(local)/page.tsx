"use client";
import EmailLogin from "@/components/EmailLogin";
import VerifyLoginLink from "@/components/VerifyLoginLink";
import useBingoStore from "@/store/state";
import generateNumbers from "@/utils/generateNumbers";
import { useRouter } from "next/navigation";

export default function Home() {
  const { setBingoNumbers } = useBingoStore();
  const route = useRouter();

  const updateNumbers = () => {
    setBingoNumbers(generateNumbers(10, 99));
    route.push("/local");
  };

  return (
    <>
      <EmailLogin />
      <VerifyLoginLink />

      <div className="w-full border-b border-b-gray-400 my-4" />

      <p className="text-lg">Jogar sem conta</p>
      <p className="text-gray-500 text-sm mb-2">
        Seu progresso ficará salvo localmente
      </p>
      <button onClick={updateNumbers} className="btn-green">
        Gerar cartela
      </button>
    </>
  );
}
