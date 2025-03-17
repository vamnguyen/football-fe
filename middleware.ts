import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ["/", "/sign-in", "/sign-up"];
  const authPaths = ["/sign-in", "/sign-up"];
  const isPublicPath = publicPaths.includes(path);
  const isAuthPath = authPaths.includes(path);

  const refreshToken = request.cookies.get("refreshToken")?.value || "";

  // If user is not authenticated
  if (!refreshToken) {
    // Allow access to public paths
    if (isPublicPath) {
      return NextResponse.next();
    }

    // Redirect to sign-in with callbackUrl for protected paths
    const callbackUrl = encodeURIComponent(
      request.nextUrl.pathname + request.nextUrl.search
    );
    return NextResponse.redirect(
      new URL(`/sign-in?callbackUrl=${callbackUrl}`, request.url)
    );
  }

  // If user is authenticated
  if (isAuthPath) {
    // Redirect to home page if trying to access auth paths
    return NextResponse.redirect(new URL(`/`, request.url));
  }

  // Allow access to protected paths
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
