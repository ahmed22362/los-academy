"use client"
import { useTranslations } from 'next-intl';
import FooterMain from '../components/FooterMain';
import FooterFollow from '../components/FooterFollow';

export default function Footer() {
    const t = useTranslations('Footer');

    return(
        <footer className='flex flex-col items-center justify-center pt-12 gap-9'>
            <section className="w-full border-b-[1px] pb-4 border-secondary-color"><FooterMain /> </section>
            <section className="w-full"><FooterFollow/> </section>
            <section className='w-full text-center p-4 border-t-[1px] border-secondary-color'> <p className='font-semibold text-sm text-black-one-color'>{t('footer-title')}</p> </section>
        </footer>
    )
};
