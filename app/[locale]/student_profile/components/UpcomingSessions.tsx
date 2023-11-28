"use client";
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
import { Toast } from "primereact/toast";
import { Tooltip } from "flowbite-react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { IoTimeOutline } from "react-icons/io5";
import ContinueWithModal from "./continueWithModal";
import { useRouter } from "next/navigation";
import { FaCalendarDays } from "react-icons/fa6";

function UpcomingSessions() {
  const router = useRouter();
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
  const [openContinueWithModal, setopenContinueWithModal] = useState(false);
  const [selectedFreeSessionId, setSelectedFreeSessionId] = useState<number>();
  const [sessionLink, setSessionLink] = useState("");
  const [isRescheduleButtonDisabled, setIsRescheduleButtonDisabled] =
    useState(false);
  const [sessionWillStartTime, setSessionWillStartTime] =
    useState<moment.Moment | null>(null);
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] =
    useState<boolean>(false);
  const [countdownCompleted, setCountdownCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if the local storage item is set to true
      const storedConfirmDialogValue =
        localStorage.getItem("confirmDialog") === "true";
      setIsConfirmDialogVisible(storedConfirmDialogValue);
    }
  }, []);
  useEffect(() => {
    if (countdownCompleted) {
      fetchUpcomingSessions();
    }
  }, [countdownCompleted]);

  const accept = (sessionId: number) => {
    setSelectedFreeSessionId(sessionId);
    const continueData = {
      sessionId: Number(sessionId),
      willContinue: true,
    };
    console.log(continueData);

    fetch(`${url}/session/continueWithTeacher`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(continueData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.status === "success") {
          console.log("POST request successful:", data);
          toast.current?.show({
            severity: "info",
            summary: "Confirmed",
            detail: "You have accepted",
            life: 3000,
          });
          setTimeout(() => {
            setopenContinueWithModal(true);
          }, 3000);
        } else {
          console.error(data);
          // Handle error if needed
        }
      })
      .catch((error) => {
        console.error("Error during POST request:", error);
      });
  };

  const reject = (sessionId: any) => {
    fetch(`${url}/session/continueWithTeacher`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId, willContinue: false }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.status === "success") {
          console.log("POST request successful:", data);
          toast.current?.show({
            severity: "warn",
            summary: "Rejected",
            detail: "You have rejected",
            life: 3000,
          });
          localStorage.setItem("confirmDialog", "false");
        } else {
          console.error(data);
          // Handle error if needed
        }
      })
      .catch((error) => {
        console.error("Error during POST request:", error);
      });
  };

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
    const updateButtonsState = () => {
      if (upComingSession.length > 0) {
        const sessionStartTime = moment.utc(upComingSession[0].sessionDate);
        const allowedStartTimeForJoin = sessionStartTime
          .clone()
          .subtract(1, "minute");
        const allowedStartTimeForReschedule = sessionStartTime
          .clone()
          .subtract(20, "minute");

        const currentTime = moment().tz(
          Intl.DateTimeFormat().resolvedOptions().timeZone
        );

        setIsImHereButtonDisabled(
          currentTime.isBefore(allowedStartTimeForJoin)
        );
        setIsRescheduleButtonDisabled(
          currentTime.isAfter(allowedStartTimeForReschedule)
        );
      }
    };

    // Schedule the update after the component has been rendered
    const timerId = setTimeout(updateButtonsState, 0);

    // Cleanup function to clear the timer
    return () => clearTimeout(timerId);
  }, [
    upComingSession,
    setIsImHereButtonDisabled,
    setIsRescheduleButtonDisabled,
  ]);

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

  useEffect(() => {
    if (upComingSession.length > 0) {
      const sessionDate: any = convertDateTimeZone(
        upComingSession[0].sessionDate,
        "UTC",
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        "MMM D,YYYY h:mm A"
      );
      // const ourSessionDate = new Date(sessionDate);

      const currentDate: any = new Date();
      const currentTime = moment();
      const ourSessionDate = moment(sessionDate);

      const timeDifference = ourSessionDate.diff(currentTime);

      const intervalId = setInterval(() => {
        // console.log("start TIME" ,sessionDate);
        // console.log("ourSessionDate TIME" ,ourSessionDate);
        // console.log("currentDate TIME" ,currentDate);
        // console.log("timeDifference TIME" ,timeDifference);

        // Check if timeDifference is zero and initiate the fetch
        if (timeDifference === 0) {
          fetchOngoingSessions();
          clearInterval(intervalId); // Stop the interval once fetch is triggered
        }
      }, 1000); // Check every second

      return () => clearInterval(intervalId);
    }
  }, [upComingSession]);
  const fetchOngoingSessions = () => {
    // Fetch ongoing sessions
    fetch(`${url}/user/ongoingSession`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);

        if (data.data.length > 0) {
          // If there are ongoing sessions, display them
          setUpComingSession(data.data);
          setsessionId(data?.data[0]?.id);
          setLoading(false);
          setSessionLink(data?.data[0]?.meetingLink);
        }
      })
      .catch((error) => {
        console.error("Error fetching ongoing sessions:", error);
        // Handle error if needed
      });
  };

  useEffect(() => {
    // Fetch ongoing sessions
    fetch(`${url}/user/ongoingSession`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("ongoingSession", data);
        setUpComingSession(data.data);
        // Check if the local storage item is set to true
        if (data.data.length > 0) {
          // If there are ongoing sessions, display them
          console.log(localStorage.getItem("confirmDialog"));
          localStorage.setItem("sessionId", data?.data[0]?.id);

          setsessionId(data?.data[0]?.id);
          setLoading(false);
          setSessionLink(data?.data[0]?.meetingLink);
        } else {
          // If there are no ongoing sessions, fetch upcoming sessions
          fetchUpcomingSessions();
        }
      })
      .catch((error) => {
        console.error("Error fetching ongoing sessions:", error);
        // If there's an error, fetch upcoming sessions
        fetchUpcomingSessions();
      });
  }, []);

  const fetchUpcomingSessions = () => {
    fetch(`${url}/user/upcomingSession`, {
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching upcoming sessions:", error);
        setLoading(false);
      });
  };

  // Updated updateAttendance function
  const updateAttendance = () => {
    console.log(sessionId);

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
          window.open(sessionLink, "_blank");
        }
      })
      .catch((error) => {
        console.error("Error during POST request:", error);
      });
  };

  if (loading) {
    return (
      <div
        className={` w-full bg-white-color pr-3 p-5 shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] rounded-[24px]`}
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
      <ContinueWithModal
        openContinueWithModal={openContinueWithModal}
        setopenContinueWithModal={setopenContinueWithModal}
      />
      <Toast ref={toast} />

      <h4 className={`${styles.secondary_head} my-2`}>
        {upComingSession[0]?.status || "upcoming session"}
      </h4>
      {upComingSession?.length > 0 ? (
        upComingSession?.map((session, index) => (
          <div className="" key={index}>
            <p>{`Session #${session.id} with title ${session.type}`}</p>
            <div className={`${styles.date} flex justify-gap-5 my-2`}>
              <div className={`flex justify-center  items-center `}>
                <FaCalendarDays />
                <p className={`ml-3 mr-1`}>
                  {moment(session.sessionDate).format("D-MMM-YYYY")}
                </p>
              </div>
              <div className={`flex justify-center items-center`}>
                <IoTimeOutline />
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
                      setCountdownCompleted(true);
                      if (upComingSession[0]?.type === "free") {
                        setAlertVisible(true);
                        localStorage.setItem("confirmDialog", "true");
                      }
                      return (
                        <span>
                          {isConfirmDialogVisible && (
                            <ConfirmDialog
                              closable={false}
                              visible={isConfirmDialogVisible}
                              message={
                                "Do you want to Continue With This Teacher?"
                              }
                              acceptClassName="bg-secondary-color text-white px-2 py-1 rounded-md"
                              rejectClassName="px-2 text-white mr-2 bg-red-500 hover:bg-red-600 py-1"
                              header="Continue With This Teacher"
                              icon="bi bi-info-circle"
                              position="top"
                              accept={() => accept(session.id)}
                              reject={() => reject(session.id)}
                            />
                          )}
                        </span>
                      );
                    } else {
                      // Render the timer
                      return (
                        <span className=" flex flex-col items-center gap-5 rounded-3xl px-3 py-1 ">
                          <p className="text-[#333]">
                            This Session will End within
                          </p>{" "}
                          <p>
                            {" "}
                            <span className="font-bold text-lg">
                              {minutes} mins
                            </span>{" "}
                            <span className="font-bold text-lg">
                              {seconds} sec
                            </span>
                          </p>
                        </span>
                        // <span className="font-bold text-lg">{hours} hours</span>
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
                  disabled={isImHereButtonDisabled}
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
                className={` max-md-px-1 text-sm font-semibold transition-colors shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] h-10 px-3 w-full  rounded-full w-50 mx-auto max-md:px-4 max-md:w-45 ${
                  isRescheduleButtonDisabled
                    ? "bg-gray-500 cursor-not-allowed text-white"
                    : "hover:bg-[#0a01c09a] hover:text-white"
                }`}
                disabled={isRescheduleButtonDisabled}
              >
                Reschedule Session
              </button>
            </div>
            <span>
              {isConfirmDialogVisible && session.type === "free" && (
                <ConfirmDialog
                  closable={false}
                  visible={isConfirmDialogVisible}
                  message={"Do you want to Continue With This Teacher?"}
                  acceptClassName="bg-secondary-color text-white px-2 py-1 rounded-md"
                  rejectClassName="px-2 text-white mr-2 bg-red-500 hover:bg-red-600 py-1"
                  header="Continue With This Teacher"
                  icon="bi bi-info-circle"
                  position="top"
                  accept={() => accept(session.id)}
                  reject={() => reject(session.id)}
                />
              )}
            </span>
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
            <span>
              {isConfirmDialogVisible && (
                <ConfirmDialog
                  closable={false}
                  visible={isConfirmDialogVisible}
                  message={"Do you want to Continue With This Teacher?"}
                  acceptClassName="bg-secondary-color text-white px-2 py-1 rounded-md"
                  rejectClassName="px-2 text-white mr-2 bg-red-500 hover:bg-red-600 py-1"
                  header="Continue With This Teacher"
                  icon="bi bi-info-circle"
                  position="top"
                  accept={() =>
                    accept(Number(localStorage.getItem("sessionId")))
                  }
                  reject={() =>
                    reject(Number(localStorage.getItem("sessionId")))
                  }
                />
              )}
            </span>
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
