import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
// import { getSession } from "@/auth"
import ClientSessionProvider from "./ClientSessionProvider";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import DefaultLayout from "@/components/DefaultLayout";
import { Session } from "next-auth";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Vaikunth",
  description: "Jai Shree Krishna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = Session();

  return (
    <html lang="en" className="">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-x-hidden bg-[#fff] customScrollBar2 font-lato">
        <SessionProvider>
          <Suspense fallback={null}>
            <DefaultLayout />
            {children}
          </Suspense>
        </SessionProvider>
      </body>
    </html>
  );
}
