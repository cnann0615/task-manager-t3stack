import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/Header";

export const metadata: Metadata = {
  title: "Chiritsumo",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Header />
        {/* tRPCクライアントを利用可能に */}
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
