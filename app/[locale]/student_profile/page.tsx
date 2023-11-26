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
  const [reports, setReports] = useState([]);
  const [myInfo, setMyInfo] = useState<UserInfo | undefined>();
  const [teacherName, setTeacherName] = useState("");
  const [showBanner, setShowBanner] = useState(true);

  const url = process.env.NEXT_PUBLIC_APIURL;
  const cookie = new Cookies();
  const token = cookie.get("token");

  useEffect(() => {
    // Fetch reports when the component mounts
    fetch(`${url}/user/myReports`, {
      method: "GET", // Specify the HTTP method as 'GET'
      headers: {
        Authorization: `Bearer ${token}`, // Correct the header key to 'Authorization'
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Set the retrieved reports in the state
        setReports(data);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
      });
  }, []);

useEffect(() => {
  const isFirstVisit = localStorage.getItem('isFirstVisit') === null;

if (myInfo?.sessionPlaced==false) {
  // Display tips for the first visit
   
  setShowBanner(true)
  // Set the flag to indicate that the user has seen the tips
}

 
}, [])


  return (
    <main
      className={
        "ps-10 pe-10 pt-[7rem]  max-md:justify-between max-md:items-center"
      }
    >
       {showBanner && (
        <BannerComponent/>
    )}
      <MyInfo myInfo={myInfo} />
      <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 justify-between gap-5	 mt-7">
        <div className="card w-full  ">
          <EditProfile setMyInfo={setMyInfo} />
          <div>
            <h3 className={`${styles.main_head} mb-8`}>Info</h3>

            <CommunityStatistics />
            <div
              className={` mt-10  shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] rounded-[24px] p-5 pb-10 w-full`}
            >
              <h4 className={`${styles.secondary_head} `}>
                Remain Sessions:{" "}
                <span className="font-bold font-italic">
                  with teacher: {teacherName}
                </span>{" "}
              </h4>
              <RemainSessions setTeacherName={setTeacherName} />
            </div>
          </div>
        </div>
        <div className="card w-full  ">
          <h3 className={`${styles.main_head} mb-8`}>Sessions</h3>
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
            className={`mr-1 my-11 	 p-4  shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] rounded-[24px]	`}
          >
            <h4 className={`${styles.secondary_head}  my-2`}>
              Report 1 (5-Sep-2023)
            </h4>
            <p>Title : Revision</p>
          </div>
        </div>
      </div>
    </main>
  );
}
