import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');

    return(
        <footer>
            <p>{t('footer-title')}</p>
        </footer>
    )
};
