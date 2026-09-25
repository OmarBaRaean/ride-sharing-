"use server";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isLogedin } from "./app/Myapis";

export default async function middleware(request: NextRequest) {
  let logedin = await isLogedin();
  const thePath = request.nextUrl.pathname;

  if (!logedin && thePath !== "/login" && thePath !== "/") {
    const loginURL = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(loginURL);
  }

  if (logedin && thePath === "/login") {
    const mainURL = new URL("/raids", request.nextUrl.origin);
    return NextResponse.redirect(mainURL);
  }

  return NextResponse.next();
}

// Matcher configuration
export const config = {
  matcher: [
    // Apply middleware to all pages except the root, login, and static files
    "/((?!pai|_next/static|_next/image|favicon.ico).*)",
  ],
};
