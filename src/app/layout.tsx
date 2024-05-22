import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";

const cabin = Cabin({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bingo",
  description: "Generated by create next app"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={cabin.className}>{children}</body>
    </html>
  );
}
