import { NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export default async (req) => {
  let token = req.cookies.get("token")?.value;
  const veryfiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err);
    }));
  if (
    (req.url.includes("/login") && !veryfiedToken) ||
    (req.url.includes("/register") && !veryfiedToken)
  ) {
    return;
  }
  if (
    (req.url.includes("/login") && veryfiedToken) ||
    (req.url.includes("/register") && veryfiedToken)
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!veryfiedToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export const config = {
  matcher: ["/", "/login", "/register", "/profil", "/chat"],
};
