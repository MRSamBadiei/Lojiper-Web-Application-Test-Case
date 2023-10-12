import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import SessionProvider from "./SeessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sam badiei",
  description: "Sam badiei",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="cupcake" className="h-full" lang="en">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
