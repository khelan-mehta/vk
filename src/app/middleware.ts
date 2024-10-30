// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { getServerAuthSession } from "./api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Redirect authenticated users away from auth pages
    console.log(req.nextauth);
    console.log(getServerAuthSession());
    if (req.nextUrl.pathname.startsWith("/auth/") && req.nextauth.token) {
      return NextResponse.redirect("/");
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow unauthenticated users to access signin and signup pages
        if (
          req.nextUrl.pathname === "/auth/signin" ||
          req.nextUrl.pathname === "/auth/signup"
        ) {
          return true;
        }
        // Redirect unauthenticated users to signin page for other routes
        if (!token) {
          return false;
        }
        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
