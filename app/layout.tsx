import type { Metadata } from "next";
import "./globals.css";
import { iranSansDn } from "./lib/font";

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
      <body className={`overflow-hidden ${iranSansDn.className}`}>
        <main className="max-w-xl mx-auto h-full min-h-dvh outline">
          <header className="w-full h-14 flex justify-between items-center bg-primary-700  px-4">
            <h1 className="text-lg font-bold text-white">کیدزلــــرن</h1>
          </header>
          <section className="w-full p-4">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
