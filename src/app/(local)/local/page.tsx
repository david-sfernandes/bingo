"use client";
import Card from "@/components/Card";
import useBingoStore from "@/store/state";

export default function LocalPage() {
  const bingoNumbers = useBingoStore((state) => state.bingoNumbers);

  return <Card numbers={bingoNumbers} />;
}
