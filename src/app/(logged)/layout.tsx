import Header from "@/components/Header";
import RoomNumbers from "@/components/RoomNumbers";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  params: {
    id: number;
  }
};

const Layout = ({ children, params }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="flex h-screen w-screen flex-col items-center justify-center shadow-inner">
        <section className="flex flex-col p-2 absolute inset-x-0 bottom-4 mx-auto bg-white rounded-2xl shadow-xl w-[440px] h-[540px] overflow-hidden">
          <div className="flex bg-grad-orange p-2 pt-3 rounded-2xl border border-b-4 border-[#CD633F] mb-2">
            <h1 className="font-extrabold text-5xl text-center mb-3 mx-auto text-white w-full">
              Bingo!
            </h1>
          </div>
          <div className="p-2">{children}</div>
        </section>
        {params.id && <RoomNumbers id={params.id} />}
      </main>
    </>
  );
};

export default Layout;
