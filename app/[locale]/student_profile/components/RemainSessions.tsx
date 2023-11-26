"use client";
import React, { useEffect, useState } from "react";
import styles from "../page.module.css";
import moment from "moment-timezone";
import Cookies from "universal-cookie";
import MyLoader from "./MyLoader";
import Image from "next/image";
import RescheduleSession from "./rescheduleSession";

function RemainSessions({ setTeacherName }: any) {
  const cookie = new Cookies();
  const url = process.env.NEXT_PUBLIC_APIURL;
  const token = cookie.get("token");
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null
  );
  const [openRescheduleModal, setOpenRescheduleModal] = useState(false);
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

  const handleRescheduleClick = (sessionId: number) => {
    setSelectedSessionId(sessionId);
    // Open the reschedule modal
    setOpenRescheduleModal(true);
  };

  // api data
  useEffect(() => {
    setLoading(true); // Set loading to true when starting to fetch data

    fetch(`${url}/user/remainSessions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSessions(data.data);
        setTeacherName(data?.data[0]?.SessionInfo?.teacher.name);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when data fetching is complete
      });
  }, [token, url]);

  return (
    <div>
      <div className={`${styles.sessions} px-2 h-[200px]  scrollAction`}>
        {loading ? (
          <div style={{ overflow: "hidden" }}>
            <MyLoader />
          </div>
        ) : sessions?.length > 0 ? (
          <>
            {sessions.map((session, index) => (
              <div
                key={index}
                className={`${styles.session} bg-white-color px-2 rounded-2xl py-3 w-full  flex justify-between items-center gap- my-3`}
              >
                <div>
                  <p className="">Session #{session.id}</p>
                  <p className="">
                    Time:{" "}
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
                        .format(),
                      "UTC",
                      Intl.DateTimeFormat().resolvedOptions().timeZone,
                      "h:mm A"
                    )}
                  </p>
                  <p className="">
                    Date:{" "}
                    {convertDateTimeZone(
                      session.sessionDate,
                      "UTC",
                      Intl.DateTimeFormat().resolvedOptions().timeZone,
                      "MMM D,YYYY"
                    )}
                  </p>
                  <div
                    className={
                      session.teacherAttended ? "hidden" : "text-red-500  py-1 "
                    }
                  >
                    {/* {session.teacherAttended ? "" : "Teacher Ubsent"} */}
                  </div>
                </div>

                <button
                  onClick={() => handleRescheduleClick(session.id)}
                  className="bg-[--secondary-color] hover:bg-[#453ed2] h-fit text-sm rounded-full py-2 text-white px-2"
                >
                  Reschedule
                </button>
              </div>
            ))}{" "}
          </>
        ) : (
          <div className="flex justify-center mt-5 items-center flex-col gap-5">
            <p className="font-meduim"> No Remmain Sessions</p>
            <Image
              src={"/vectors/list.png"}
              alt="no upcoming session"
              width={150}
              height={100}
            />
          </div>
        )}
      </div>
      <RescheduleSession
        sessionId={selectedSessionId}
        openRescheduleModal={openRescheduleModal}
        setopenRescheduleModal={setOpenRescheduleModal}
      />
    </div>
  );
}

export default RemainSessions;
