import { NextResponse } from "next/server"

export function middleware(request) {
  const { pathname } = request.nextUrl
  const isTokenExist = request.cookies.get('token')
  const isLoginPage = pathname.startsWith('/login')
  const isRegisterPage = pathname.startsWith('/register')

  if (!isTokenExist && !isLoginPage && !isRegisterPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isTokenExist && (isLoginPage || isRegisterPage)) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)',]
  }