import '../globals.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import {notFound} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import Footer from './layout/Footer';
import CustomNavbar from './layout/Navbar';

  const workSans = Work_Sans({
    subsets: ['latin'],
    display: "swap",
    variable: "--font-work-sans",
    weight: ["100","200","300","400", "500", "600", "700", "800"],
    style: "normal",
    preload: true
  })

export const metadata: Metadata = {
  title: 'LOS Academy',
  description: 'Learning Forgeins Kids Arabic And Islamic Courses',
}

export default async function LocaleLayout({children, params: {locale}}: {children: React.ReactNode, params: {locale: string}}) {

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html className={workSans.className} lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <header>
          <CustomNavbar />
        </header>
          {children}
        <Footer />
        </NextIntlClientProvider>
        </body>
    </html>
  )
}
