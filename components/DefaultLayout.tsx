"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function DefaultLayout() {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");
  return (
    <>
      {!isAuthPage && (
        <div className="absolute top-0">
          <Navbar />
        </div>
      )}
    </>
  );
}
