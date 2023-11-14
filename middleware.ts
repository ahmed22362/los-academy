import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentTeacher } from './helpers/getMe';

const protectedAdminRoutes = [
    '/admin',
    '/admin/teachers', 
    '/admin/students',
    '/admin/material',
    '/admin/ongoing',
    '/admin/plans',
    '/admin/sessions',
    '/admin/transactions',
    '/admin/courses',
  ];

  const protectTeacherRoutes = [
    '/teacher',
    '/teacher/transactions',
    '/teacher/material',
    '/teacher/students'
  ]

async function middleware(req: NextRequest) {
    
    let accessAdminStatus = false;
    let accessTeacherStatus = false;

    const token = req.cookies.get('token');
    const id = req.cookies.get('id')
    
    if(id && token) {
      
      const getUserRole = await getCurrentTeacher(id?.value, token?.value);
      const role = getUserRole.data?.role
      const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher/checkJWT/?token=${token.value}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`,
          },
        })
        
        const validToken = await res.json()
        
        if(validToken.status === 'success' && role === 'admin') {
          accessAdminStatus = true
        
        } else if (validToken.status === 'success' && role === 'teacher') {
          accessTeacherStatus = true
        } else {
          accessAdminStatus = false
          accessTeacherStatus = false
        }
      }

    if (
      (
        accessAdminStatus === false && protectedAdminRoutes.includes(req.nextUrl.pathname) 
      || 
      accessTeacherStatus === false && protectTeacherRoutes.includes(req.nextUrl.pathname))) {
        
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