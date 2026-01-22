import type { Metadata } from "next";
import "./globals.css";
import { iranSansDn } from "./lib/font";
import LogoIcon from "./components/icons/LogoIcon";
import { LessonsInitializer } from "./context/LessonsInitializer";

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
      <LessonsInitializer/>
        <main className="max-w-xl mx-auto h-full min-h-dvh outline">
          <header className="w-full h-14 gap-2 flex items-center shadow shadow-primary-light px-4">
            <LogoIcon className="fill-primary w-5" />
            <h1 className="text-lg font-bold text-primary">کیدزلــــرن</h1>

          </header>
          <section className="w-full p-4">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
