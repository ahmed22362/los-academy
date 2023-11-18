import React, { useEffect, useState } from 'react'
import styles from '../page.module.css'
import PrimaryButton from '../../components/PrimaryButton'
import Cookies from 'universal-cookie';

function StudentAttendence() {
  const cookie=new Cookies();
  const url =process.env.NEXT_PUBLIC_APIURL;
  const token =cookie.get('token') ;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());


  useEffect(() => {
    fetch(`${url}/user/upcomingSession`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}` // Correct the header key to 'Authorization'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.error('Error fetching sessions:', error);
      });
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  function calculateTimeLeft() {
    const currentTime = new Date();
    const startTime = new Date(lectureStartTime);
    const difference = startTime - currentTime;

    if (difference < 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor(difference / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    return { hours, minutes, seconds };
  }


  return (
    <div className={`flex flex-col justify-center items-center gap-5	`}>
    <h4 className={`${styles.secondary_head} `}>Are you here and ready for the session ?</h4>
      <p>This Session will Start within</p>
      <h1 className={`font-bold	 text-lg	`}>9 mins 23 sec</h1>
      <PrimaryButton 
      ourStyle="bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]   h-10 w-75 px-8 m-auto my-3 shadow rounded-full  mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
      text={'I’m here'}
       /> 
  </div>
  )
}

export default StudentAttendence