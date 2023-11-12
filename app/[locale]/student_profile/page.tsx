"use client"
import React, { useEffect, useState } from 'react';
import styles from './page.module.css'
import Image from 'next/image';
import PrimaryButton from '../components/PrimaryButton';
import Link from 'next/link';
import RemainSessions from './components/RemainSessions';
import StudentPlan from './components/StudentPlanModal';
import CommunityStatistics from './components/CommunityStatistics';
import UpcomingSessions from './components/UpcomingSessions';
// import SessionsModal from './components/SessionsModal';?
import EditProfile from './components/edit_profile';
import Subscribtion from './components/Subscribtion';
import BookModal from './components/BookModal';
import Cookies from 'universal-cookie';
import SessionsModal from './components/SessionsModal';

export default function page() {

    const [reports, setReports] = useState([]);

    const url = process.env.NEXT_PUBLIC_APIURL;
    const cookie=new Cookies();
    const token =cookie.get('token');
      

    useEffect(() => {
      // Fetch reports when the component mounts
      fetch(`${url}/user/myReports`, {
        method: 'GET', // Specify the HTTP method as 'GET'
        headers: {
          Authorization: `Bearer ${token}` // Correct the header key to 'Authorization'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Set the retrieved reports in the state
          setReports(data);
        })
        .catch((error) => {
          console.error('Error fetching reports:', error);
        });
       
    }, []);
      return (

    <main className={"ps-[245px] pe-10 pt-[7rem]  max-md:justify-between max-md:items-center"}>
       <StudentPlan/>
        <div className='flex flex-col pl-10 justify-center items-center gap-5 w-fit '>
                <div className='rounded-full  bg-[#EBF6FE] w-20 h-20 flex justify-center items-end '>
            <Image className='rounded-full  bg-[#EBF6FE]' src={'/vectors/courses.png'} width={60} height={60} alt='profile photo'/>
                </div>
            <h2 className='font-bold text-lg'>Ahmed Mostafa</h2>
        </div>
        <div className="grid grid-cols-3  justify-between gap-5	 mt-7">
                <div className="card ">
                  <EditProfile/>
                  <Subscribtion/>
                  <div>
                    <h3 className={`${styles.main_head} mb-8`}>Infos</h3>
                    <p className={`mb-8 ml-5 w-[23rem] mt-3 `}>
                    Hello , I am committed to learning the art of Quranic recitation (Tajweed), studying the interpretation of the Quran (Tafsir), and memorizing its verses.
                    </p>
                   <CommunityStatistics/>
                   <div className={`my-11 shadow-2xl p-5 rounded-3xl hover:shadow-lg duration-300 w-full`}>
                   <h4 className={`${styles.secondary_head} `}>Remain Sessions</h4>
                   <RemainSessions/>
                   </div>
                    <SessionsModal />
                  </div>
                </div>
                <div className="card ">
                <div className={``}>
                    <h3 className={`${styles.main_head} mb-8`}>Sessions</h3>
                    <UpcomingSessions/>
                    <div className={`my-11 shadow-2xl	w-[25rem]	 p-5  rounded-3xl hover:shadow-lg duration-300	`}>
                    <div className={`flex flex-col justify-center items-center gap-5	`}>
                      <h4 className={`${styles.secondary_head} `}>Are you here and ready for the session ?</h4>
                        <p>This Session will Start within</p>
                        <h1 className={`font-bold	 text-lg	`}>9 mins 23 sec</h1>
                        <PrimaryButton 
                        ourStyle="bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]   h-10 w-75 px-8 m-auto my-3 shadow rounded-full  mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
                        text={'I’m here'}
                         /> 
                    </div>
                    </div>
                    <div className={`my-11 shadow-2xl	w-[25rem]	 p-5  rounded-3xl  hover:shadow-lg duration-300	`}>
                    <h4 className={`${styles.secondary_head} ml-3 my-2`}>Book a Session</h4>
                        <div className={`flex flex-col justify-center items-center`}>
                       <BookModal/>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                <div className={``}>
                    <h3 className={`${styles.main_head} mb-8`}>Reports</h3>             
                    <div className={`mr-10 my-11 shadow-2xl	w-[25rem]	 p-4  rounded-3xl  hover:shadow-lg duration-300	`}>
                    <h4 className={`${styles.secondary_head}  my-2`}>Report 1 (5-Sep-2023)</h4>
                        <p>Title : Revision</p>
                    </div>
                  </div>
                </div>

        </div>
    </main >

  )
}
