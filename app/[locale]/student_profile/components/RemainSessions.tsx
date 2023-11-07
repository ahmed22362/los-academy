import React, { useEffect, useState } from 'react';
import styles from '../page.module.css';
import moment from 'moment-timezone';


function RemainSessions() {

  const url ='https://los-academy.onrender.com/api/v1/';
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxSEVGWEMxQlNCU1NXNDVFRE00TVY4NkM4IiwiaWF0IjoxNjk5MTk0MDExLCJleHAiOjE3MDQzNzgwMTF9.OvSfZHnrL8y8sthkSc1A2uxTfp7ydtxMlUaY8yVK_EQ";
  const [reports, setReports] = useState([]);

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

  }, [])
  

  return (
    <div>
         <div className={`my-11 shadow-2xl	p-5  rounded-3xl hover:shadow-lg duration-300	w-full`}>
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
  )
}

export default RemainSessions