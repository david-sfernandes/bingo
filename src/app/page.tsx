"use client";
import Card from "@/components/Card";
import UpdateBtn from "@/components/UpdateBtn";
import useBingoStore from "@/store/state";

export default function Home() {
  const { bingoNumbers } = useBingoStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900">
      <section className="flex flex-col">
        <div className="flex p-1">
          <h1 className="font-extrabold text-3xl text-center mb-3 mx-auto">
            Bingo
          </h1>
          <UpdateBtn />
        </div>
        <Card numbers={bingoNumbers} />
      </section>
    </main>
  );
}
