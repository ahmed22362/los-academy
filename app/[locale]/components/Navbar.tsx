import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';


export default function Navbar() {
    const t = useTranslations('Navbar');
    return(
        <nav>
            <h3>{t('navbar-title')}</h3>
            <ul>
                <li><Link locale='en' href="/">en</Link></li>
                <li><Link locale='ar' href="/">ar</Link></li>
            </ul>
        </nav>
    )
};
