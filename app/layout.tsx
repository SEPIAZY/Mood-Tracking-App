import type { Metadata } from "next";
import { Kumbh_Sans, Fugaz_One } from "next/font/google";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Head from "./head";
import "./globals.css";
import Signout from "@/components/Signout";

const kumbhsans = Kumbh_Sans({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Comfycuddle",
  description: "Find your cuddle companion today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={"/"}>
        <h1
          className={
            "text-lg sm:text-xl md:text-2xl textGradient " + fugaz.className
          }
        >
          Comfycuddle
        </h1>
      </Link>
      <Signout />
    </header>
  );
  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={"text-indigo-400 " + fugaz.className}>Create with Heart</p>
    </footer>
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <Head/>
      <AuthProvider>
        <body
          className={
            "w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 " +
            kumbhsans.className
          }
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
