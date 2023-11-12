"use client"

import { useTranslations } from "next-intl";
import OurCard from "./OurCard"
import { useEffect, useState} from "react";
import Slider from "react-slick";


function OurCourses() {


  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const t = useTranslations('courses');
  const t2 = useTranslations('Hompage');

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


  const getCourses = () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/course`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => response.json()).then(data => {
        console.log(data.data);
        setCourses(data.data)
        setIsLoading(false)
    }).catch(err => console.log(err))
}

  // useEffect(() => {
  //   const htmlElement = document.getElementsByTagName('html')[0];
  //   const dir = htmlElement.getAttribute('dir');
  //   const arrowNext = document.getElementsByClassName('slick-next')[0];
  //   const arrowPrev = document.getElementsByClassName('slick-prev')[0];

  //   if(dir === "rtl") {
  //     arrowNext?.classList.add('slick-next-rtl');
  //     arrowPrev?.classList.add('slick-prev-rtl');
  //   } else {
  //     arrowNext?.classList.remove('slick-next-rtl');
  //     arrowPrev?.classList.remove('slick-prev-rtl');
  //     arrowNext?.classList.add('slick-next-ltr');
  //     arrowPrev?.classList.add('slick-prev-ltr');
  //   }
  // }, [])

  useEffect(() => {
    getCourses();
  }, [])



  return (
      <section className="py-12 px-20 max-sm:px-8" id="courses">
        <h3 className="text-center text-3xl mb-5 font-bold text-black-one-color">{t2('courses-title')}</h3>
          <Slider {...settings} className="flex justify-center ourSlickStyle">
            { isLoading ? <p>Loading...</p> :
              courses.map((course: any, index: number) => (
                <OurCard data={course} key={index}/>
                ))
            }
          </Slider>
      </section>
  )
}

export default OurCourses