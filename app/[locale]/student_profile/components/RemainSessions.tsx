import React, { useEffect, useState } from 'react';
import styles from '../page.module.css';
import moment from 'moment-timezone';
import Cookies from 'universal-cookie';


function RemainSessions() {
  const cookie=new Cookies();
  const url ='https://los-academy.onrender.com/api/v1/';
  const token =cookie.get('token') ;
   const [sessions, setSessions] = useState<any[]>([]);

  const convertDateTimeZone = (inputTime: moment.MomentInput, inputTimezone: string, outputTimezone: string, ourFormat: string) => {
    const convertedTime = moment(inputTime)
      .tz(inputTimezone)
      .clone()
      .tz(outputTimezone);
    return convertedTime.format(ourFormat);
  };

  // api data
  useEffect(() => {
    fetch(`${url}user/upcomingSessions`, {
      method: 'GET', 
      headers: {
        Authorization: `Bearer ${token}` // Correct the header key to 'Authorization'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
      
        setSessions(data.data)
        // Set the retrieved Seeions in the state
        
      })
      .catch((error) => {
        console.error('Error fetching sessions:', error);
      });

  }, [])
  

 
  return (
    <div>
      <div className={`my-11 shadow-2xl p-5 rounded-3xl hover:shadow-lg duration-300 w-full`}>
        <div className={` `}>
          <h4 className={`${styles.secondary_head} `}>Remain Sessions</h4>
          <div className={`${styles.sessions} `}>
            {sessions.length > 0 ? (
              sessions.map((session, index) => (
                <div key={index} className={`${styles.session} flex justify-between gap-5 my-3`}>
                  <p>Session #{session.id}</p>
                  <p>
                  {convertDateTimeZone(`${session.sessionDate}T${session.sessionStartTime}`, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "h:mm A")}
                    {' - '}                  </p>
                  <p>{convertDateTimeZone(session.sessionDate, 'GMT', Intl.DateTimeFormat().resolvedOptions().timeZone, 'DD-MMM-YYYY')}</p>
                </div>
              ))
            ) : (
              <p>No upcoming sessions.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



export default RemainSessions