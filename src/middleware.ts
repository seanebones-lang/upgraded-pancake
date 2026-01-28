import { auth } from "@/auth"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  if (isLoggedIn && nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/', req.url))
  }

  if (!isLoggedIn && !nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', req.url))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}