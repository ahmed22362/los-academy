import React, { useEffect, useState } from 'react';
import styles from '../page.module.css';
import moment from 'moment-timezone';
import Cookies from 'universal-cookie';
import MyLoader from './MyLoader';
import Image from 'next/image';


function RemainSessions() {
  const cookie=new Cookies();
  const url =process.env.NEXT_PUBLIC_APIURL;
  const token =cookie.get('token') ;
   const [sessions, setSessions] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

  const convertDateTimeZone = (inputTime: moment.MomentInput, inputTimezone: string, outputTimezone: string, ourFormat: string) => {
    const convertedTime = moment(inputTime)
      .tz(inputTimezone)
      .clone()
      .tz(outputTimezone);
    return convertedTime.format(ourFormat);
  };

  // api data
  useEffect(() => {
    setLoading(true); // Set loading to true when starting to fetch data

    fetch(`${url}/user/remainSessions`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSessions(data.data);
      })
      .catch((error) => {
        console.error('Error fetching sessions:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when data fetching is complete
      });
  }, [token, url]);
  

 
  return (
    <div>
             <div className={`${styles.sessions} `}>
        {loading ? (
          <div style={{overflow:'hidden'}}>
            <MyLoader />
          </div>
        ) : sessions?.length > 0 ? (
          sessions.map((session, index) => (
            <div key={index} className={`${styles.session} flex justify-between gap- my-3`}>
              <p className=''>Session #{session.id}</p>
              <p className=''>
                {convertDateTimeZone(session.sessionDate, 'UTC', Intl.DateTimeFormat().resolvedOptions().timeZone, 'h:mm A')}
                {' - '}
                {convertDateTimeZone(
                  moment(session.sessionDate)
                    .add(session.sessionDuration, 'minutes')
                    .format(),
                  'UTC',
                  Intl.DateTimeFormat().resolvedOptions().timeZone,
                  'h:mm A'
                )}
              </p>
              <p className=''> {convertDateTimeZone(session.sessionDate, 'UTC', Intl.DateTimeFormat().resolvedOptions().timeZone, 'MMM D,YYYY')}</p>
            </div>
          ))
        ) : (
          <div className="flex justify-center mt-5 items-center flex-col gap-5">
      <p className='font-meduim'> No Remmain Sessions</p>
      <Image src={'/vectors/list.png'} alt="no upcoming session" width={150} height={100} />
      </div>
        )}
      </div>
        </div>
      
  );

}



export default RemainSessions