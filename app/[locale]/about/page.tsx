
import { useTranslations } from 'next-intl';


export default function About() {
    const t = useTranslations('About');
    return(
        <>
            <h1 className='text-center'>{t('about-title')}</h1>
        </>
    )
};
