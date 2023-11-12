import React, { useEffect, useState } from 'react';
import styles from '../page.module.css';
import moment from 'moment-timezone';
import Cookies from 'universal-cookie';
import MyLoader from './MyLoader';


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
    fetch(`${url}user/remainSessions`, {
      method: 'GET', 
      headers: {
        Authorization: `Bearer ${token}` // Correct the header key to 'Authorization'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      
        setSessions(data.data)
        // Set the retrieved Seeions in the state
        
      })
      .catch((error) => {
        console.error('Error fetching sessions:', error);
      });

  }, [])
  

 
  return (
    <div>
          <div className={`${styles.sessions} `}>
          {sessions === null ? (
              <MyLoader />
            ) : sessions?.length > 0 ? (
              sessions.map((session, index) => (
                <div key={index} className={`${styles.session} flex justify-between gap-3 my-3`}>
                  <p>Session #{session.id}</p>
                  <p>
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
                  {convertDateTimeZone(session.sessionDate, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "MMM D,YYYY")}
                </div>
              ))
              )
               : (
                <p>No remaining sessions</p>
              )}
          </div>
        </div>
      
  );

}



export default RemainSessions