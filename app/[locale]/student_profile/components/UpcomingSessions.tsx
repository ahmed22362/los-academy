import React, { useEffect, useRef, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import moment from "moment-timezone";
import styles from "../page.module.css";
import Cookies from "universal-cookie";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import ContentLoader from "react-content-loader";
import RescheduleSession from "./rescheduleSession";
import Image from "next/image";
import Countdown from "react-countdown";
import MyTimer from "./timer";
import { Toast } from "primereact/toast";
import { Tooltip } from "flowbite-react";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from "primereact/button";
import ContinueWithModal from "./continueWithModal";
import { useRouter } from "next/navigation";

function UpcomingSessions() {
  const router=useRouter();
  const cookie = new Cookies();
  const url = process.env.NEXT_PUBLIC_APIURL;
  const token = cookie.get("token");
  const [upComingSession, setUpComingSession] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openRescheduleModal, setopenRescheduleModal] = useState(false);
  const [sessionId, setsessionId] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [isHere, setIsHere] = useState<boolean>(false);
  const [isImHereButtonDisabled, setIsImHereButtonDisabled] = useState(true);
  const [openContinueWithModal, setopenContinueWithModal] = useState(false)
  const [selectedFreeSessionId, setSelectedFreeSessionId] = useState("");

  

  const accept = (sessionId: any) => {
    setSelectedFreeSessionId(sessionId);
      fetch(`${url}/session/continueWithTeacher`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, willContinue: true }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
    
        if (data.status === "success") {
          console.log("POST request successful:", data);
          setopenContinueWithModal(true);
          toast.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });

        } else {
          console.error(data);
          // Handle error if needed
        }
      })
      .catch((error) => {
        console.error("Error during POST request:", error);
      });
   
   
  }

const reject = () => {
    toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
}
 
  const toast = useRef<Toast>(null);
  const showSuccess = (msg: any) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: msg,
      life: 5000,
    });
  };
  const showError = (msg: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 5000,
    });
  };

  const convertDateTimeZone = (
    inputTime: moment.MomentInput,
    inputTimezone: string,
    outputTimezone: string,
    ourFormat: string
  ) => {
    const convertedTime = moment(inputTime)
      .tz(inputTimezone)
      .clone()
      .tz(outputTimezone);
    return convertedTime.format(ourFormat);
  };

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  const isSessionRunning = (session: any) => {
    const currentTime = moment().tz(
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const sessionStartTime = moment(session.sessionDate);
    const sessionEndTime = moment(session.sessionDate).add(
      session.sessionDuration,
      "minutes"
    );

    return currentTime.isBetween(sessionStartTime, sessionEndTime);
  };

  useEffect(() => {
    if (upComingSession.length > 0) {
      const sessionStartTime = moment.utc(upComingSession[0].sessionDate);
      const allowedStartTime = sessionStartTime.clone().subtract(5, "minutes");
      const currentTime = moment().tz(
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );

      setIsImHereButtonDisabled(currentTime.isBefore(allowedStartTime));
    }
  }, [upComingSession]);
  // custom theme
  const CustomTHeme = {
    target: "w-full",
    animation: "transition-opacity",
    arrow: {
      base: "absolute z-10 h-2 w-2 rotate-45",
      style: {
        dark: "bg-gray-900 dark:bg-gray-700",
        light: "bg-white",
        auto: "bg-white dark:bg-gray-700",
      },
      placement: "-4px",
    },
    base: "absolute inline-block z-10 rounded-lg py-2 px-3 text-sm font-medium shadow-sm",
    hidden: "invisible opacity-0",
    style: {
      dark: "bg-gray-900 text-white dark:bg-gray-700",
      light: "border border-gray-200 bg-white text-gray-900",
      auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
    },
    content: "relative z-20",
  };
  //  Im Here =======================

  useEffect(() => {
    fetch(`${url}/user/upcomingSession`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Correct the header key to 'Authorization'
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setUpComingSession(data.data);
        setsessionId(data?.data[0]?.id);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
        setLoading(false);
      });
  }, []);


  const getOngoingSession = () => {
    fetch(`${url}/user/ongoingSession`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setUpComingSession(data.data);
        setsessionId(data?.data[0]?.id);
        // router.push(data?.data?.link)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
        setLoading(false);
      });
  };

  // Use useEffect to fetch upcoming sessions when the component is mounted
  

  // ... (your existing code)

  // Updated updateAttendance function
  const updateAttendance = () => {
    console.log(sessionId);
      getOngoingSession();

    fetch(`${url}/session/updateUserAttendance`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.status === "success") {
          console.log("POST request successful:", data);
          setIsHere(true);
          showSuccess(`${data.message}`);
          getOngoingSession();
        }
      })
      .catch((error) => {
        console.error("Error during POST request:", error);
      });
  };



  if (loading) {
    return (
      <div
        className={` w-full p-5 shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] rounded-[24px]`}
        style={{ overflow: "hidden" }}
      >
        <ContentLoader
          speed={2}
          width={340}
          height={100}
          viewBox="0 0 340 100"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="232" y="-10" rx="3" ry="3" width="152" height="10" />
          <rect x="139" y="30" rx="3" ry="3" width="78" height="13" />
          <rect x="8" y="29" rx="3" ry="3" width="113" height="15" />
          <rect x="9" y="63" rx="3" ry="3" width="113" height="15" />
          <rect x="142" y="64" rx="3" ry="3" width="78" height="13" />
          <rect x="239" y="62" rx="3" ry="3" width="78" height="13" />
        </ContentLoader>
      </div>
    ); // You can replace this with a loading spinner or any other loading indicator
  }
// 



      
  return (
    <div
      className={` w-full p-5 shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] rounded-[24px]`}
    >
      <Toast ref={toast} />

      <h4 className={`${styles.secondary_head} my-2`}>{upComingSession[0]?.status} session</h4>
      {upComingSession?.length > 0 ? (
        upComingSession?.map((session, index) => (
          <div key={index}>
            <p>{`Session #${session.id} with title ${session.type}`}</p>
            <div className={`${styles.date} flex justify-gap-5 my-2`}>
              <div className={`flex justify-center  items-center `}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
                </svg>
                <p className={`ml-3 mr-1`}>
                  {moment(session.sessionDate).format("D-MMM-YYYY")}
                </p>
              </div>
              <div className={`flex justify-center items-center`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                </svg>
                <p className={`ml-3`}>
                  {convertDateTimeZone(
                    session.sessionDate,
                    "UTC",
                    Intl.DateTimeFormat().resolvedOptions().timeZone,
                    "h:mm A"
                  )}
                  {" - "}
                  {convertDateTimeZone(
                    moment(session.sessionDate)
                      .add(session.sessionDuration, "minutes")
                      .format(), // Calculate end time by adding sessionDuration
                    "UTC",
                    Intl.DateTimeFormat().resolvedOptions().timeZone,
                    "h:mm A"
                  )}
                </p>
                {/* <MyTimer expiryTimestamp={time} /> */}
              </div>
            </div>
            <div className="flex justify-center items-center">
              {isSessionRunning(session) ? (
                <Countdown
                  date={moment(session.sessionDate)
                    .add(session.sessionDuration, "minutes")
                    .toDate()}
                  renderer={({ hours, minutes, seconds, completed }) => {
                    if (completed) {
                      setAlertVisible(true);
                      if (upComingSession[0].type === "free") {
                        // Show the ConfirmDialog after the session has ended
                        confirmDialog({
                          message: 'Do you want to Continue With This Teacher?',
                          header: 'Continue With This Teacher',
                          icon: 'bi bi-info-circle',
                          position: 'top',
                          accept: () => accept(session.id) ,
                          reject: reject
                        });
                      }
                      // Render something when the timer completes
                      return <span>Session ended</span>;
                    } else {
                      // Render the timer
                      return (
                        <span className="bg-secondary-color rounded-3xl px-3 py-1 text-white">
                          The Session Will End After {hours}:{minutes}:{seconds}
                        </span>
                      );
                    }
                  }}
                />
              ) : null}
            </div>
            <div className={`flex justify-center items-center gap-4 mb-3 mt-7`}>
              <Tooltip
                theme={CustomTHeme}
                className=" px-5"
                content={
                  isImHereButtonDisabled
                    ? `The session cannot be attended until session starts `
                    : "update your Attendence"
                }
              >
                <PrimaryButton
                  onClick={isHere ? updateAttendance : updateAttendance}
                  ourStyle={`w-full max-md-px-1  text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] h-10 w-full shadow rounded-full mx-auto max-md:px-4 max-md:w-45 ${
                    isImHereButtonDisabled
                      ? " bg-gray-500 cursor-not-allowed"
                      : "bg-secondary-color hover:bg-secondary-hover"
                  }`}
                  text={`${"Join Meeting"}`}
                />
              </Tooltip>

              <button
                onClick={() => setopenRescheduleModal(true)}
                className="hover:bg-[#0a01c09a] hover:text-white max-md-px-1 text-sm font-semibold transition-colors shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] h-10 px-3 w-full  rounded-full w-50 mx-auto max-md:px-4 max-md:w-45"
              >
                Reschedule Session
              </button>
            </div>

            <RescheduleSession
              sessionId={sessionId}
              openRescheduleModal={openRescheduleModal}
              setopenRescheduleModal={setopenRescheduleModal}
            />
            <ContinueWithModal
            openContinueWithModal={openContinueWithModal}
            setopenContinueWithModal={setopenContinueWithModal}
            />
          </div>
        ))
      ) : (
        <>
          <div className="flex justify-center mt-5 items-center flex-col gap-5">
            <p className="font-meduim">No Upcoming Sessions</p>
            <Image
              src={"/vectors/empty-calendar.png"}
              alt="no upcoming session"
              width={150}
              height={100}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default UpcomingSessions;
