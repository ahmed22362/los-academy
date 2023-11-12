import React, { useEffect, useState } from 'react'
import PrimaryButton from '../../components/PrimaryButton'
import Link from 'next/link';
import moment from 'moment-timezone';
import styles from '../page.module.css'
import Cookies from 'universal-cookie';


function UpcomingSessions() {

    const cookie=new Cookies();
    const url ='https://los-academy.onrender.com/api/v1/';
    const token =cookie.get('token') ;
     const [upComingSession, setUpComingSession] = useState<any[]>([]);
  
    const convertDateTimeZone = (inputTime: moment.MomentInput, inputTimezone: string, outputTimezone: string, ourFormat: string) => {
      const convertedTime = moment(inputTime)
        .tz(inputTimezone)
        .clone()
        .tz(outputTimezone);
      return convertedTime.format(ourFormat);
    };
  
    // api data
    useEffect(() => {
      fetch(`${url}user/upcomingSession`, {
        method: 'GET', 
        headers: {
          Authorization: `Bearer ${token}` // Correct the header key to 'Authorization'
        }
      })
        .then((response) => response.json())
        .then((data) => {
            
          console.log(data.data);
        
          setUpComingSession(data.data)
          
        })
        .catch((error) => {
          console.error('Error fetching sessions:', error);
        });
  
    }, [])
    
//   return (
// <div className={`shadow-2xl	w-full p-5  rounded-3xl	hover:shadow-lg duration-300	`}>
//                       <h4 className={`${styles.secondary_head}  my-2`}>Upcoming Sessions</h4>
//                         <p>Session #5 with title Arabic lesson</p>
//                       <div className={`${styles.date} flex justify- gap-5 my-2`}>
//                       <div className={`flex justify-center items-center`}>
//                       <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
//                         <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/>
//                         </svg>
//                       <p className={`ml-3`}>10- oct-2023</p>
//                       </div>
//                           <div className={`flex justify-center items-center`}>
//                       <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
//                         <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
//                         </svg> 
//                       <p className={`ml-3`}>3:00 - 3:30 PM </p>
//                           </div>
//                       </div>
//                       <div className={`flex gap-4 mb-3 mt-7`}>
//                       <PrimaryButton 
//                         ourStyle="bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]   h-10 w-full shadow rounded-full  mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
//                         text={'Join Meeting'}
//                          />               
//                           <PrimaryButton 
//                       ourStyle=" hover:bg-secondary-hover text-sm font-semibold transition-colors  shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] h-10 px-3 w-full shadow rounded-full w-50 mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
//                       text={'reschedule session'}
//                     />        
//                       </div>
//                           <div className={`flex justify-center items-center `}>
//                       <Link className={`decoration-1	underline`}  href={``}>Update Meeting link</Link>
//                           </div>
//            </div>  )

return (
    <div className={`shadow-2xl w-full p-5 rounded-3xl hover:shadow-lg duration-300`}>
      <h4 className={`${styles.secondary_head} my-2`}>Upcoming Sessions</h4>
      {upComingSession?.map((session, index) => (
        <div key={index}>
          <p>{`Session #${session.id} with title ${session.type}`}</p>
          <div className={`${styles.date} flex justify-gap-5 my-2`}>
            <div className={`flex justify-center items-center `}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
              <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/>
              </svg>
              <p className={`ml-3 mr-1`}>{moment(session.sessionDate).format('D-MMM-YYYY')}</p>
            </div>
            <div className={`flex justify-center items-center`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
              </svg>
              <p className={`ml-3`}>
              {convertDateTimeZone(session.sessionDate, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "h:mm A")}
                      {' - '}
              {convertDateTimeZone(
                        moment(session.sessionDate)
                          .add(session.sessionDuration, 'minutes')
                          .format(), // Calculate end time by adding sessionDuration
                        "UTC",
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                        "h:mm A"
                      )}
              </p>
            </div>
          </div>
          <div className={`flex gap-4 mb-3 mt-7`}>
            <PrimaryButton
              ourStyle="bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] h-10 w-full shadow rounded-full mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
              text={'Join Meeting'}
            />
            <PrimaryButton
              ourStyle="hover:bg-secondary-hover text-sm font-semibold transition-colors shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] h-10 px-3 w-full shadow rounded-full w-50 mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
              text={'Reschedule Session'}
            />
          </div>
          <div className={`flex justify-center items-center`}>
            <Link className={`decoration-1 underline`} href={''}>
              Update Meeting Link
            </Link>
          </div>
        </div>
      ))}
    </div>
  ); 
      }
export default UpcomingSessions