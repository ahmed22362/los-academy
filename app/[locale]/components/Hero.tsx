'use client';

import Image from "next/image";
// import { PrimaryButton } from "./PrimaryButton";
import PrimaryButton from "./PrimaryButton";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("Hompage");
  
  return (
      <section id="hero" className="flex flex-row justify-center items-center mt-24 py-20 max-md:flex-wrap px-10 max-md:px-3">
        <div className="flex flex-col justify-center items-flex-start gap-3">
              <h1 className='font-bold text-5xl'>
                {t('hero-title')}
              </h1>
            <p className="text-2xl font-normal text-black-two-color">
              {t('hero-paragraph')}
            </p>
            <span className="text-xl font-normal text-gray-one-color">
              {t('hero-span')}
            </span>
          <PrimaryButton text={t('bookNow-btn')} ourStyle="bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-2.5 px-12 shadow rounded-full w-50 mx-auto mt-5" />
        </div>
        <Image src="/vectors/Header1.svg" alt="header image" width={800} height={400} loading="lazy" className="w-[800px] h-auto max-md:w-full"/>
      </section>
  )
}

export default Hero