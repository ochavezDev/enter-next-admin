import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const AUTH_ONLY_PATHS = ["/admin/auth/sign-in", "/admin/auth/sign-up"];
const SESSION_COOKIE_NAME =
  process.env.NODE_ENV === "development"
    ? "better-auth.session_token"
    : "__Secure-better-auth.session_token";
// const ROLE_PROTECTED: { prefix: string; requiredRole: AppRole }[] = [
//   { prefix: "/admin/settings", requiredRole: "admin" },
//   { prefix: "/admin/users", requiredRole: "admin" },
// ];

export async function proxy(request: NextRequest) {
  // TODO: auth gate temporarily disabled — remove this early return to re-enable login
  return NextResponse.next();

  const { pathname } = request.nextUrl;
  const callbackUrl = `${pathname}${request.nextUrl.search}`;
  const isAuthOnly = AUTH_ONLY_PATHS.some((path) => pathname.startsWith(path));
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  // Better Auth handles its own /admin/api/auth routes
  if (pathname.startsWith("/admin/api")) {
    return NextResponse.next();
  }

  if (!sessionCookie) {
    if (!isAuthOnly) {
      const url = request.nextUrl.clone();
      url.searchParams.set("callbackUrl", callbackUrl);
      url.pathname = "/admin/auth/sign-in";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.session && !isAuthOnly) {
      const url = request.nextUrl.clone();
      url.searchParams.set("callbackUrl", callbackUrl);
      url.pathname = "/admin/auth/sign-in";
      return NextResponse.redirect(url);
    }

    // const sessionRole = (session?.user as { role?: string } | undefined)?.role;

    // if (roleProtectedRoute && sessionRole !== roleProtectedRoute.requiredRole) {
    //   return NextResponse.redirect(new URL("/admin", request.url));
    // }

    if (isAuthOnly && session?.session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  } catch (error) {
    console.error(error);
    if (!isAuthOnly) {
      const url = request.nextUrl.clone();
      url.searchParams.set("callbackUrl", callbackUrl);
      url.pathname = "/admin/auth/sign-in";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
