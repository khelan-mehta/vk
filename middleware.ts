import { auth } from "@/auth"
 
export default auth((req) => {
    const regex = /^\/(?!gallery|api|auth|_next\/static|_next\/image|favicon\.ico).+$/;
  if (!req.auth && regex.test(req.nextUrl.pathname)) {
    const newUrl = new URL("/auth/login", req.nextUrl.origin)
    return Response.redirect(newUrl);
  }
  if(req.auth && (req.nextUrl.pathname === "/auth/login" || req.nextUrl.pathname === "/auth/register")) {
    const newUrl = new URL("/profile/orders", req.nextUrl.origin)
    return Response.redirect(newUrl);
  }
})