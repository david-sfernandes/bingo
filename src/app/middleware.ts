import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '../../firebaseConfig'
 
export function middleware(request: NextRequest) {
  if(auth.currentUser) return NextResponse.redirect(new URL('/room', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}