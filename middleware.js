import { NextResponse } from 'next/server'

const MAX_ATTEMPTS = 10
const attemptsMap = new Map()

export function middleware(request) {
  const authHeader = request.headers.get('authorization')
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'

  const username = 'biir'
  const password = 'Jaishreekrishna'
  const correctAuth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')

  const attempts = attemptsMap.get(ip) || 0

  // If too many wrong attempts
  if (attempts >= MAX_ATTEMPTS) {
    return new NextResponse('Too many failed attempts. Access denied.', {
      status: 403,
    })
  }

  // If correct credentials
  if (authHeader === correctAuth) {
    attemptsMap.delete(ip)
    return NextResponse.next()
  }

  // Wrong credentials: increase attempt count
  attemptsMap.set(ip, attempts + 1)

  return new NextResponse('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}

// 👇 Add this at the bottom
export const config = {
  matcher: ['/admin/:path*'],
  // Protect only /admin route and subpaths
}
