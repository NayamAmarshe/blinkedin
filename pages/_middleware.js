import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // if the user is on / route
  const session = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  if (req.nextUrl.pathname === "/") {
    // don't forget the await, important for redirection to work
    if (!session) {
      // if session is invalid, redirect to /home login/signup page
      return NextResponse.redirect("/home");
    }
  } else if (req.nextUrl.pathname === "/home") {
    if (session) {
      return NextResponse.redirect("/");
    }
  }
}
