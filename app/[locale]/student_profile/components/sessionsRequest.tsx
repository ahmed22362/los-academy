import { error } from "console";
import moment from "moment-timezone";
import { Calendar, CalendarProps } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { Nullable } from "primereact/ts-helpers";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
interface Session {
  id: number;
  sessionDates: string[];
  status: string;
  type: string;
  sessionDate: string;
  fromStudentProfile?:boolean // You might need to adjust the type based on your actual data structure
}
function SessionsRequest({ fromStudentProfile }: { fromStudentProfile?: boolean }) {
  const cookie = new Cookies();
  const [sessionsRequest, setSessionsRequest] = useState<any[]>([]);
  const [updateCalendar, setUpdateCalendar] = useState<boolean>(true);
  const [newDates, setNewDates] = useState<Nullable<Date> | any>(null);
  const [updatedId, setUpdatedId] = useState<Number>();

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

  const cancelMySessionRequest = (requestId:number) => {
  
    if (!requestId || isNaN(requestId)) {
      showError('Please enter a valid number for the request!');
      return;
    }
  
    const requestBody = {
      requestId: Number(requestId),
    };
  
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/user/cancelSessionRequest`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cookie.get('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'success') {
          showSuccess(data.message);
        } else {
          showError(data.message);
        }
      })
      .catch((error) => {
        showError('An Error Occurred');
        console.error(error);
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
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/user/mySessionReq`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`, // Correct the header key to 'Authorization'
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);

        const sortedSessions = data.data.map((session: Session) => ({
          ...session,
          sessionDates: session.sessionDates.map((date) =>
            moment(date).toDate()
          ),
        }));

        sortedSessions.sort((a: Session, b: Session) => {
          const dateA = new Date(
            Math.max(...a.sessionDates.map((date: any) => date.getTime()))
          );
          const dateB = new Date(
            Math.max(...b.sessionDates.map((date: any) => date.getTime()))
          );
          return dateB.getTime() - dateA.getTime();
        });

        setSessionsRequest(sortedSessions);
        console.log("sorted session requests ", sortedSessions);
        const pendingSessions = sortedSessions.filter(
          (session: Session) => session.status === "pending"
        );
        if(fromStudentProfile===true){
          setSessionsRequest(pendingSessions)
        }
        // Set the retrieved Seeions in the state
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  }, [updateCalendar]);

  //   update Dates
  const handleUpdateDates = (sessionId: Number | any) => {
    if (!newDates || newDates.length === 0) {
      showError("You should choose at least one Date");
      return;
    }

    if (newDates && Array.isArray(newDates) && newDates.length > 0) {
      const updatedDates = newDates.map((date) => date.toISOString());

      const updatedSession = {
        sessionDates: updatedDates,
      };
      // const updatedSession = {
      //   sessionDates: newDates.map((date: Date) => moment(date).format('YYYY-MM-DD')),
      // };

      fetch(
        `${process.env.NEXT_PUBLIC_APIURL}/user/mySessionReq/${sessionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.get("token")}`,
          },
          body: JSON.stringify(updatedSession),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // Handle the response if needed
          showSuccess(data.message);
          console.log("Updated session:", data);
          // Fetch and update the sessions again to reflect the changes
          setUpdateCalendar(true);
        })
        .catch((error) => {
          console.error("Error updating session:", error);
        });
    }
  };

  const handleUpdateButton = (id: Number) => {
    setUpdateCalendar(false);
    setUpdatedId(id);
  };
  return (
    <div className="md:min-h-[190px] mx-2 max-md:min-h-[150px] ">
      <Toast ref={toast} />

      {updateCalendar ? (
        <div className="">
          {sessionsRequest.length === 0 ? (
            <p className="flex justify-center items-center">
              No session requests available.
            </p>
          ) : (
            sessionsRequest.map((session) => (
              <div
                className="flex flex-col my-2 gap-3 bg-white-color p-3 rounded-xl"
                key={session.id}
              >
                <p>Session Dates:</p>
                <ul>
                  {session.sessionDates.map((date: string) => (
                    <li key={date}>
                      <span className="mx-3">
                        {moment(date).format("D-MMM-YYYY")}
                      </span>
                      {convertDateTimeZone(
                        date,
                        "UTC",
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                        "h:mm A"
                      )}
                    </li>
                  ))}
                </ul>

                <p className="mr-3 font-semibold flex justify-between items-center">
                  Status:
                  <span
                    className={
                      session.status === "pending"
                        ? `rounded-full p-2 px-3 text-sm bg-[#ffaa38] ml-2 border text-white`
                        : "ml-2 text-sm px-3"
                    }
                  >
                    {" "}
                    {session.status}{" "}
                  </span>
                </p>
                {/* <p>
                  Type:
                  <span
                    className={`${
                      session.type != "free"
                        ? "bg-red-500 text-white"
                        : "bg-white border"
                    } shadow  px-3 py-1 ml-2  rounded-lg`}
                  >
                    {" "}
                    {session.type === "paid" ? "Paid$" : "Free"}{" "}
                  </span>{" "}
                </p> */}
                <div
                  className={`${
                    session.status === "pending" ? "flex" : "hidden"
                  }  mt-4  justify-center gap-10 items-center `}
                >
                  <button
                    onClick={() => handleUpdateButton(session.id)}
                    className={`${
                      session.status === "pending"
                        ? "bg-secondary-color py-1 px-3 rounded-lg text-white  w-fit"
                        : "hidden"
                    }`}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => cancelMySessionRequest(session.id)}
                    className={`px-3 py-1 bg-red-600 rounded-lg text-white`}
                  >
                    Cancel Request
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div>
          {sessionsRequest.length === 0 ? (
            <h1 className="text-center my-2 font-semibold">
              Choose Your New Dates
            </h1>
          ) : (
            <div className="flex flex-col gap-5 items-center">
              <Calendar
                className="w-full "
                value={newDates}
                onChange={(e: CalendarProps | any) => setNewDates(e.value)}
                showTime
                hourFormat="12"
                style={{
                  outline: "4px solid var(--secondary-color)",
                  borderRadius: "16px",
                }}
                inline
                selectionMode="multiple"
              />
              <div className="flex justify-center items-center gap-5 mx-2">
                <button
                  className="bg-[#EB5757] rounded-2xl text-white px-5 py-2 w-fit "
                  onClick={() => setUpdateCalendar(true)}
                >
                  Cancel
                </button>
                <button
                  className="bg-secondary-color  hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-3 px-10  rounded-full w-50 mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
                  onClick={() => handleUpdateDates(updatedId)}
                >
                  Update Dates
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SessionsRequest;
