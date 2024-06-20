import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    
    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/"

    const token = request.cookies.get("token")?.value || ""

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl))
    }
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/dashboard/:path*",
        "/about",
        "/cart",
    ],
}