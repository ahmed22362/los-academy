import {useTranslations} from 'next-intl';
import {unstable_setRequestLocale} from 'next-intl/server';
import Hero from './components/Hero';
import TrySection from './components/TrySection';
import OurCourses from './components/OurCourses';
import AboutUs from './components/Aboutus';
import Plans from './components/Plans';
import FeedBack from './components/FeedBack';


export default function Home({params: {locale}}: {params: {locale: string}}) {

  const t = useTranslations('Hompage');

  unstable_setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <Hero />
      <TrySection />
      <OurCourses />
      <AboutUs />
      <Plans />
      <FeedBack />
    </main>
  )
}
