import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = Boolean(req.auth);
  if (!isLoggedIn) {
    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
});

export const config = {
  // Protects /admin and everything under it except the login page
  // itself, so the login flow can complete.
  matcher: ["/admin", "/admin/((?!login).*)"],
};
