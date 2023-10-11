import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import SessionProvider from "./SeessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="cupcake" className="h-full bg-white" lang="en">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
