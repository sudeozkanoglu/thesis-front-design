import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/login", "/register"];

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();
  const isPublic = PUBLIC_PATHS.some((path) => url.pathname.startsWith(path));

  if (!token && !isPublic) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      const userType = payload.userType;

      if (
        userType === "Teacher" &&
        (url.pathname.startsWith("/admin") ||
          url.pathname.startsWith("/student"))
      ) {
        url.pathname = "/teacher/teacherDashboard";
        return NextResponse.redirect(url);
      } else if (
        userType === "Student" &&
        (url.pathname.startsWith("/teacher") ||
          url.pathname.startsWith("/admin"))
      ) {
        url.pathname = "/student/dashboard";
        return NextResponse.redirect(url);
      } else if (
        userType === "Admin" &&
        (url.pathname.startsWith("/teacher") ||
          url.pathname.startsWith("/student"))
      ) {
        url.pathname = "/admin";
        return NextResponse.redirect(url);
      } else {
        return NextResponse.redirect("/login");
      }


    } catch (err) {
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
