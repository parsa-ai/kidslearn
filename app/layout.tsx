import type { Metadata } from "next";
import "./globals.css";
import { iranSansDn } from "./lib/font";
import { LessonsInitializer } from "./context/LessonsInitializer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "کیدزلرن | صفحه اصلی",
  description: "آموزش به کودکان ۳ تا ۸ سال",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`overflow-hidden ${iranSansDn.className} `}>
        <LessonsInitializer />
        <main className="max-w-xl mx-auto h-dvh min-h-dvh outline outline-gray-300 landscape:hidden md:landscape:block">
          <header className="w-full h-14 shadow shadow-primary-light px-4 z-50 relative">
            <Link href='/' className="h-full w-fit gap-2  flex items-center ">
              <h1 className="text-lg font-bold text-primary">کیدزلــــرن</h1>
            </Link>

          </header>
          <section className="w-full h-[90dvh] overflow-y-auto">
            {children}
          </section>
        </main>
        <span className="landscape:flex justify-center text-primaryx w-screen h-screen items-center md:landscape:hidden">
          لطفا گوشی رو بچرخونید {":)"}
        </span>
      </body>
    </html>
  );
}
