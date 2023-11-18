
'use client';

import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { CustomFlowbiteTheme, Tabs } from "flowbite-react";
import Cookies from 'universal-cookie';
import moment from 'moment-timezone';
import MyLoader from './MyLoader';
import RemainSessions from './RemainSessions';
import Image from 'next/image';



export default function SessionsModal() {
  const [openSeesionModal, setOpenSeesionModal] = useState(false);
  const cookie=new Cookies();
  const url = process.env.NEXT_PUBLIC_APIURL;
  const token =cookie.get('token') ;
   const [historySessions, setHistorySessions] = useState<any[]>([]);

  const convertDateTimeZone = (inputTime: moment.MomentInput, inputTimezone: string, outputTimezone: string, ourFormat: string) => {
    const convertedTime = moment(inputTime)
      .tz(inputTimezone)
      .clone()
      .tz(outputTimezone);
    return convertedTime.format(ourFormat);
  };
  const customeTheme: CustomFlowbiteTheme = {
    tab: {
      tablist: {
        base: "flex  items-center  w-fit  ",
        tabitem: {
          styles: {
            pills: {
              active: {
                on: " bg-white focus:ring-0 text-black w-fit   border-b-2 border-[#6D67E4]	",
                off: "   focus:ring-0  hover:bg-white hover:text-black    hover:border-[#6D67E4] 	 transition-colors",
              },
            },
          },
        },
      },
    },
  };


  // History Sessions Api

  useEffect(() => {
    fetch(`${url}/user/myHistorySessions`, {
      method: 'GET', 
      headers: {
        Authorization: `Bearer ${token}` // Correct the header key to 'Authorization'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
      
        setHistorySessions(data.data)
        // Set the retrieved Seeions in the state
        
      })
      .catch((error) => {
        console.error('Error fetching sessions:', error);
      });

  }, [])


 
  return (
    <>
      <Button onClick={() => setOpenSeesionModal(true)}>Toggle Sessions modal</Button>
      <Modal   show={openSeesionModal} className='block space-y-0 md:flex md:space-y-0 md:space-x-4 ' size={'xl'}  onClose={() => setOpenSeesionModal(false)}>
      <Modal.Header className='p-0 m-0 border-0'></Modal.Header>

        <Modal.Body >
          <div>
            <h3 className='font-semibold text-lg mb-3'>Sessions</h3>
            <div className="taps">
            <Tabs.Group aria-label="Pills" theme={customeTheme.tab} style="pills">
      <Tabs.Item active title="Pending" >
              <RemainSessions />
             </Tabs.Item>
      <Tabs.Item title="History">
      <div className={` md:min-h-[300px] max-md:min-h-[150px]`}>
          {historySessions === null ? (
              <MyLoader />
            ) : historySessions?.length > 0 ? (
              historySessions.map((session, index) => (
                
                <div key={index} className={`flex justify-between gap-5 my-3 items-center`}>
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
                 <p> {convertDateTimeZone(session.sessionDate, "UTC", Intl.DateTimeFormat().resolvedOptions().timeZone, "MMM D,YYYY")}</p>
                 {session.type==="free" ? <p className='px-4 bg-white rounded-full py-2 border shadow'> {session.type}</p>:''}
                </div>
              ))
              )
               : (
                <div className="flex justify-center mt-5 items-center flex-col gap-5">
                <p className='font-meduim'> No History Sessions</p>
                <Image src={'/vectors/list.png'} alt="no upcoming session" width={150} height={100} />
                </div>
              )}
          </div>   
            </Tabs.Item>
    </Tabs.Group>
            </div>
            <div className='flex justify-center items-center'>
              <button
              onClick={()=> setOpenSeesionModal(false)}
              className='bg-secondary-color  hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-3 px-10  rounded-full w-50 mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45'>Done</button>
            </div>
          </div>
        </Modal.Body>
        
      </Modal>
    </>
  );
}
