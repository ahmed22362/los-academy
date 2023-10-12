import {useTranslations} from 'next-intl';
import {unstable_setRequestLocale} from 'next-intl/server';

export default function Home({params: {locale}}: {params: {locale: string}}) {

  const t = useTranslations('Hompage');

  unstable_setRequestLocale(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>{t('home-title')}</h2>
    </main>
  )
}
