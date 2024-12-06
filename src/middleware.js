import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/verify") )
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && url.pathname.startsWith("/cart")) {
    return NextResponse.redirect(new URL("/sign-in", request.url)); 
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/cart/:path*"],
};
