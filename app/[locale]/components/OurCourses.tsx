"use client"

import { useTranslations } from "next-intl";
import OurCard from "./OurCard"
import { useEffect, useState} from "react";
import Slider from "react-slick";

function OurCourses() {

  const [settings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 855,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        }
      },
    ]
  });

  const t = useTranslations('courses');
  const t2 = useTranslations('Hompage');

  useEffect(() => {
    
    const htmlElement = document.getElementsByTagName('html')[0];
    
    const dir = htmlElement.getAttribute('dir');
    
    const arrowNext = document.getElementsByClassName('slick-next')[0];
    
    const arrowPrev = document.getElementsByClassName('slick-prev')[0];
    
    
    if(dir === "rtl") {
      arrowNext?.classList.add('slick-next-rtl');
      arrowPrev?.classList.add('slick-prev-rtl');
    } else {
      arrowNext?.classList.remove('slick-next-rtl');
      arrowPrev?.classList.remove('slick-prev-rtl');
      arrowNext?.classList.add('slick-next-ltr');
      arrowPrev?.classList.add('slick-prev-ltr');
    }

  }, [])

  


  return (
      <section className="py-12 px-20 max-sm:px-8" id="courses">
        <h3 className="text-center text-3xl mb-5 font-bold text-black-one-color">{t2('courses-title')}</h3>
          <Slider {...settings} className="flex justify-center">
            <OurCard title={t('0.name')} paragraph={t('0.paragraph')} modalTarget={1}/>
            <OurCard title={t('1.name')} paragraph={t('1.paragraph')} modalTarget={2}/>
            <OurCard title={t('2.name')} paragraph={t('2.paragraph')} modalTarget={3}/>
            <OurCard title={t('2.name')} paragraph={t('2.paragraph')} modalTarget={4}/>
          </Slider>
      </section>
  )
}

export default OurCourses