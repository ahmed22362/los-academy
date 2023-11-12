import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = [
    '/admin',
    '/admin/teachers', 
    '/admin/students',
    '/admin/material',
    '/admin/ongoing',
    '/admin/plans',
    '/admin/sessions',
    '/admin/transactions',
  ];

async function middleware(req: NextRequest) {
  
    const token = req.cookies.get('token');

    let accessStatus = false;
    
    // if(token) {
        
        // const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher/checkJWT/?token=${token.value}`, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token.value}`,
        //   },
        // })
        // const isAdmin = await res.json()
      //   if(isAdmin.status === 'success') {
      //       accessStatus = true
      //   } else {
      //       accessStatus = false
      //   }
      // }
    if (accessStatus === false && protectedRoutes.includes(req.nextUrl.pathname)) {
      const absoluteUrl = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(absoluteUrl.toString());
    }

  return createMiddleware({
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  })(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

export default middleware;