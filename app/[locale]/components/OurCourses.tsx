"use client";

import { useTranslations } from "next-intl";
import OurCard from "./OurCard";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Skeleton } from "primereact/skeleton";
import { ScrollTop } from "primereact/scrolltop";
function OurCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const t2 = useTranslations("Hompage");
  const noData = {
    title: "No Courses Found",
    description: "No Courses Found",
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: (courses?.length < 2 ? courses?.length : 3) ?? 0,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: courses?.length > 1 ? 3 : 1,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: courses?.length > 1 ? 2 : 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getCourses = () => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/course`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.data ?? []);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <section className="py-12 px-20 max-sm:px-8" id="courses">
      <h3 className="text-center text-3xl mb-5 font-bold text-black-one-color">
        {t2("courses-title")}
      </h3>

      {isLoading ? (
        <div className="flex flex-row justify-between gap-5 w-full">
          <div className="w-full flex flex-col gap-3">
            <Skeleton
              width="10rem"
              height="4rem"
              borderRadius="16px"
            ></Skeleton>
            <Skeleton className="mb-2" borderRadius="16px"></Skeleton>
            <Skeleton
              width="10rem"
              className="mb-2"
              borderRadius="16px"
            ></Skeleton>
            <Skeleton
              width="5rem"
              borderRadius="16px"
              className="mb-2"
            ></Skeleton>
            <Skeleton
              height="2rem"
              className="mb-2"
              borderRadius="16px"
            ></Skeleton>
          </div>
          <div className="w-full flex flex-col gap-3">
            <Skeleton
              width="10rem"
              height="4rem"
              borderRadius="16px"
            ></Skeleton>
            <Skeleton className="mb-2" borderRadius="16px"></Skeleton>
            <Skeleton
              width="10rem"
              className="mb-2"
              borderRadius="16px"
            ></Skeleton>
            <Skeleton
              width="5rem"
              borderRadius="16px"
              className="mb-2"
            ></Skeleton>
            <Skeleton
              height="2rem"
              className="mb-2"
              borderRadius="16px"
            ></Skeleton>
          </div>
          <div className="w-full flex flex-col gap-3">
            <Skeleton
              width="10rem"
              height="4rem"
              borderRadius="16px"
            ></Skeleton>
            <Skeleton className="mb-2" borderRadius="16px"></Skeleton>
            <Skeleton
              width="10rem"
              className="mb-2"
              borderRadius="16px"
            ></Skeleton>
            <Skeleton
              width="5rem"
              borderRadius="16px"
              className="mb-2"
            ></Skeleton>
            <Skeleton
              height="2rem"
              className="mb-2"
              borderRadius="16px"
            ></Skeleton>
          </div>
        </div>
      ) : (
        <>
          {courses && courses.length > 0 ? (
            <Slider {...settings}>
              {courses.map((course: any, index: number) => (
                <OurCard key={index} data={course} />
              ))}
            </Slider>
          ) : (
            <div>There is no courses found</div>
          )}
        </>
      )}
      <ScrollTop className="bg-secondary-color hover:bg-secondary-hover" />
    </section>
  );
}

export default OurCourses;
