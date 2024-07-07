"use client";
import { auth } from "../../firebaseConfig";

import useBingoStore from "@/store/state";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const { email } = useBingoStore((state) => state);
  const pathname = usePathname();
  const route = useRouter();

  if (!auth.currentUser) {
    if (pathname === "/") route.push("/room");
  }

  return (
    <header className="z-10 py-1 px-3 bg-white rounded-lg shadow-lg absolute top-1 inset-x-1 flex justify-between items-center">
      <div>
        <p className="text-xs text-gray-400">Usuário: </p>
        <p className="text-sm text-zinc-800">{email}</p>
      </div>

      <button className="btn-default bg-grad-orange !w-16 !m-0">
        <ArrowLeftEndOnRectangleIcon className="text-white h-6 w-6" />
      </button>
    </header>
  );
}
