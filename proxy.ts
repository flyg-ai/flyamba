import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Redirect any URL containing uppercase characters in its path to the
// all-lowercase canonical form (e.g. /Barcelona -> /barcelona, /LONDON -> /london).
// 308 = permanent redirect that preserves the method. Guarded by the check so it
// never loops on an already-lowercase path.
// Next 16: this is the `proxy` convention (formerly `middleware`).
export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = url;

  if (pathname !== pathname.toLowerCase()) {
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
