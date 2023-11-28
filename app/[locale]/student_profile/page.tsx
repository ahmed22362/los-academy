"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import RemainSessions from "./components/RemainSessions";
import CommunityStatistics from "./components/CommunityStatistics";
import UpcomingSessions from "./components/UpcomingSessions";
import EditProfile from "./components/edit_profile";
import BookModal from "./components/BookModal";
import Cookies from "universal-cookie";
import StudentAttendence from "./components/studentAttendence";
import MyInfo from "./components/myInfo";
import BannerComponent from "./components/Banner";
import MyReports from "./myReports";
import TeacherUbsent from "./components/teacherUbsent";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  id: number;
  gender: string;
  age?: number;
  sessionPlaced: boolean; // make age optional if it may not be present in the API response
}
export default function page() {
  const [myInfo, setMyInfo] = useState<UserInfo | undefined>();
  const [teacherName, setTeacherName] = useState("");
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("isFirstVisit") === null;

    if (myInfo?.sessionPlaced == false) {
      // Display tips for the first visit

      setShowBanner(true);
      // Set the flag to indicate that the user has seen the tips
    }
  }, []);

  return (
    <main
      className={
        "ps-10 pe-10 pt-[7rem] max-md:mt-7  max-md:justify-between max-md:items-center"
      }
    >
      {showBanner && <BannerComponent />}
      <div className="myInfo flex justify-center items-center">
        <MyInfo myInfo={myInfo} />
      </div>
      <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 justify-between gap-5	 mt-7">
        <div className="card w-full  ">
          <EditProfile setMyInfo={setMyInfo} />
          <div>
            <h3 className={`${styles.main_head} mb-8`}>Info</h3>

            <CommunityStatistics />
            <div
              className={`mb-10 mt-10  shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] rounded-[24px] p-5 pb-10 w-full`}
            >
              <h4 className={`${styles.secondary_head} pb-2`}>
                Remain Sessions:{" "}
                <span className="font-bold font-italic">
                  with teacher: {teacherName}
                </span>{" "}
              </h4>
              <RemainSessions setTeacherName={setTeacherName} />
            </div>
          </div>
        </div>
        <div className="card w-full mr-3 ">
          <h3 className={`${styles.main_head} mb-8 `}>Sessions</h3>
          <UpcomingSessions />
          {/* <div
            className={`my-11 p-5 shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] rounded-[24px]	`}
          >
            <StudentAttendence />
          </div> */}
          <div
            className={` ${
              myInfo?.sessionPlaced == true ? "hidden" : ""
            } my-11 shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] rounded-[24px]		 p-5  	`}
          >
            <h4 className={`${styles.secondary_head} ml-3 my-2`}>
              Book a Session
            </h4>
            <div className={`flex flex-col justify-center items-center`}>
              <BookModal myInfo={myInfo} />
            </div>
          </div>
        </div>
        <div className="card w-full ">
          <h3 className={`${styles.main_head} mb-8`}>Reports</h3>
          <div
            className={`mr-1  p-3  shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] rounded-[24px]	`}
          >
            <h4 className={`${styles.secondary_head} ml-3 my-2`}>My Reports</h4>
            <MyReports />
          </div>
          <div
            className={`mr-1  mb-10 mt-10  p-5  shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] rounded-[24px]	`}
          >
            <h3 className={`${styles.secondary_head} pb-2 ml-3 my-2`}>
              Teacher Ubsent Sessions
            </h3>
            <div className="h-[300px]  scrollAction">
              <TeacherUbsent />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
