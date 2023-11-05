"use client"
import React, { useEffect, useState } from 'react';
import styles from './page.module.css'
import Image from 'next/image';
import PrimaryButton from '../components/PrimaryButton';
import Link from 'next/link';
import StudentPlan from './components/studentPlan';

export default function page() {

  const url ='https://los-academy.onrender.com/api/v1/';
  const [reports, setReports] = useState([]);
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxSEVGWEMxQlNCU1NXNDVFRE00TVY4NkM4IiwiaWF0IjoxNjk5MTk0MDExLCJleHAiOjE3MDQzNzgwMTF9.OvSfZHnrL8y8sthkSc1A2uxTfp7ydtxMlUaY8yVK_EQ";

    useEffect(() => {
      // Fetch reports when the component mounts
      fetch(`${url}user/myReports`, {
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
        fetch(`${url}user/upcomingSessions`, {
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
            console.error('Error fetching sessions:', error);
          });
   
    }, []);
      return (

    <main className={"ps-[245px] pe-10 pt-[7rem]  max-md:justify-between max-md:items-center"}>
       <StudentPlan/>
        <div className='flex flex-col justify-center items-center gap-5 w-fit '>
                <div className='rounded-full  bg-[#EBF6FE] w-20 h-20 flex justify-center items-end '>
            <Image className='rounded-full  bg-[#EBF6FE]' src={'/vectors/courses.png'} width={60} height={60} alt='profile photo'/>
                </div>
            <h2 className='font-bold text-lg		'>Ahmed Mostafa</h2>
        </div>
        <div className="grid grid-cols-3  justify-between gap-5	 mt-7">
                <div className="card ">
                  <div>
                    <h3 className={`${styles.main_head} mb-8`}>Infos</h3>
                    <p className={`mb-8 ml-5 w-[25rem] mt-3 `}>
                    Hello , I am committed to learning the art of Quranic recitation (Tajweed), studying the interpretation of the Quran (Tafsir), and memorizing its verses.
                    </p>
                    <div  className={`shadow-2xl	w-full p-5  rounded-3xl	hover:shadow-lg duration-300	`}>
                      <h4 className={`${styles.secondary_head} ml-3`}>Community statistics</h4>
                      <div className={`flex justify-between gap-5 items-center my-5`}>
                        <PrimaryButton 
                      ourStyle="bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-4 px-12 shadow rounded-full w-50 mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
                      text={'Done    5Sessions'}
                    />
                <PrimaryButton
                  ourStyle="bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-4 px-12 shadow rounded-full w-50 mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
                  text={'100% Attendence'}
                  />
                      </div>
                      
                    </div>
                    <div className={`my-11 shadow-2xl		 p-5  rounded-3xl hover:shadow-lg duration-300	w-full`}>
                    <div className={`	`}>
                      <h4 className={`${styles.secondary_head} `}>Remain Sessions</h4>
                      <div className={`${styles.sessions} `}>
                          <div className={`${styles.session} flex justify-between gap-5 my-3`}>
                          <p>Session #6</p>
                          <p> 3:00 - 3:30 PM </p>
                          <p>17- oct-2023</p>
                          </div>
                          <div className={`${styles.session} flex justify-between gap-5 my-3`}>
                          <p>Session #6</p>
                          <p> 3:00 - 3:30 PM </p>
                          <p>17- oct-2023</p>
                          </div>
                          <div className={`${styles.session} flex justify-between gap-5 my-3`}>
                          <p>Session #6</p>
                          <p> 3:00 - 3:30 PM </p>
                          <p>17- oct-2023</p>
                          </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
                <div className="card ">
                <div className={``}>
                    <h3 className={`${styles.main_head} mb-8`}>Sessions</h3>
                    <div className={`shadow-2xl	w-full p-5  rounded-3xl	hover:shadow-lg duration-300	`}>
                      <h4 className={`${styles.secondary_head}  my-2`}>Upcoming Sessions</h4>
                        <p>Session #5 with title Arabic lesson</p>
                      <div className={`${styles.date} flex justify- gap-5 my-2`}>
                      <div className={`flex justify-center items-center`}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/></svg>
                      <p className={`ml-3`}>10- oct-2023</p>
                      </div>
                          <div className={`flex justify-center items-center`}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg> 
                      <p className={`ml-3`}>3:00 - 3:30 PM </p>
                          </div>
                      </div>
                      <div className={`flex gap-4 mb-3 mt-7`}>
                      <PrimaryButton 
                        ourStyle="bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]   h-10 w-full shadow rounded-full  mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
                        text={'Join Meeting'}
                         />               
                          <PrimaryButton 
                      ourStyle=" hover:bg-secondary-hover text-sm font-semibold transition-colors  shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] h-10 px-3 w-full shadow rounded-full w-50 mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
                      text={'reschedule session'}
                    />        
                      </div>
                          <div className={`flex justify-center items-center `}>
                      <Link className={`decoration-1	underline`}  href={``}>Update Meeting link</Link>
                          </div>
                    </div>
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
                        <PrimaryButton 
                        ourStyle="bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]   h-10 w-75 px-8 m-auto my-3 shadow rounded-full  mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
                        text={'Book '}
                         />
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
