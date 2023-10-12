import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {useLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {unstable_setRequestLocale} from 'next-intl/server';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] })

const locales = ['en', 'ar'];

export const metadata: Metadata = {
  title: 'LOS Academy',
  description: 'Learning Forgeins Kids Arabic And Islamic Courses',
}

export default function LocaleLayout({children, params: {locale}}: {children: React.ReactNode, params: {locale: string}}) {

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <header>
          <Navbar />
        </header>
          {children}
        <Footer />
        </body>
    </html>
  )
}
