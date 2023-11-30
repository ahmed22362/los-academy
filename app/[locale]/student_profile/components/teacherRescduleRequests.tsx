import moment from "moment-timezone";
import { Nullable } from "primereact/ts-helpers";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { CustomFlowbiteTheme, Tabs } from "flowbite-react";
import { Toast } from "primereact/toast";
import ContentLoader from "react-content-loader";
import RescheduleSession from "./rescheduleSession";

function TeacherRescduleRequests() {
  const cookie = new Cookies();
  const url = process.env.NEXT_PUBLIC_APIURL;
  const token = cookie.get("token");
  const [teatcherreschedule, setTeatcherReschedule] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
const [openRescheduleModal, setOpenRescheduleModal] = useState<boolean>(false);
const [sessionId, setSessionId] = useState<Number>()
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
// 
const fetchTeacherRescheduleRequests=()=>{
  fetch(`${url}/user/receivedRescheduleRequests`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Correct the header key to 'Authorization'
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const sortedRescheduleRequests = data.data.sort((a:any, b:any) => {
        // The exact sorting logic depends on the structure of your data
        // Assuming `status` is a string representing the status
        if (a.status === "pending" && b.status !== "pending") {
          return -1; // a comes before b
        } else if (a.status !== "pending" && b.status === "pending") {
          return 1; // b comes before a
        } else {
          return 0; // no change in order
        }
      });

      setTeatcherReschedule(sortedRescheduleRequests);
      // Set the retrieved Seeions in the state
    })
    .catch((error) => {
      console.error("Error fetching sessions:", error);
    })
    .finally(() => {
      setLoading(false);
    });
}
  const acceptReschedule = (requestId: number, newTime: string) => {
    console.log(requestId);
    console.log(newTime);

    const newData = {
      rescheduleRequestId: requestId,
      newDate: newTime,
    };
    fetch(`${url}/user/acceptReschedule`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response data
        if (data.status === "success") {
          showSuccess(data.message);
          fetchTeacherRescheduleRequests()
        } else {
          showError(data.message);
        }
        // Handle success, e.g., update state or show a success message
        console.log("Reschedule request accepted successfully");
      })
      .catch((error) => {
        showError("some thing went wrong");
        console.error("Error accepting reschedule request:", error);
      });
  };

  useEffect(() => {
    fetch(`${url}/user/receivedRescheduleRequests`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Correct the header key to 'Authorization'
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const sortedRescheduleRequests = data.data.sort((a:any, b:any) => {
          // The exact sorting logic depends on the structure of your data
          // Assuming `status` is a string representing the status
          if (a.status === "pending" && b.status !== "pending") {
            return -1; // a comes before b
          } else if (a.status !== "pending" && b.status === "pending") {
            return 1; // b comes before a
          } else {
            return 0; // no change in order
          }
        });
  
        setTeatcherReschedule(sortedRescheduleRequests);        // Set the retrieved Seeions in the state
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // deny Dates
  const denyAllReschedule = (requestId: number ,sessionId:Number) => {
    console.log(requestId);
    setSessionId(sessionId)
    const newData = {
      rescheduleRequestId: requestId,
    };

    fetch(`${url}/user/declineReschedule`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response data
        if (data.status === "success") {
          showSuccess(data.message);
            setOpenRescheduleModal(true)
            fetchTeacherRescheduleRequests();
          // Handle success, e.g., update state or show a success message
          console.log("Reschedule request declined successfully");
        } else {
          showError(data.message);
          fetchTeacherRescheduleRequests();

        }
      })
      .catch((error) => {
        showError("Something went wrong");
        console.error("Error declining reschedule request:", error);
      });
  };
  return (
    <div>
      <RescheduleSession
      setOpenRescheduleModal={setOpenRescheduleModal}
      openRescheduleModal={openRescheduleModal}
      sessionId={sessionId}
      fromTeacherRequest={true}
      />
      <Toast ref={toast} />
      <div className="md:min-h-[190px] max-md:min-h-[150px]">
        {loading ? (
          // React Content Loader while data is being fetched
          <ContentLoader
            speed={2}
            width={800}
            height={300}
            viewBox="0 0 800 300"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="3" ry="3" width="70" height="10" />
            <rect x="80" y="0" rx="3" ry="3" width="100" height="10" />
            <rect x="190" y="0" rx="3" ry="3" width="10" height="10" />
            {/* Add more rectangles or shapes as needed */}
          </ContentLoader>
        ) : (
          <>
            {teatcherreschedule?.length === 0 ? (
              <p>No reschedule requests available.</p>
            ) : (
              <ul className="h-full">
                {teatcherreschedule.map((request) => (
                  <li className="flex flex-col gap-3 bg-white-color py-3 mb-3 pl-2 rounded-lg mr-2" key={request.id}>
                    <p className="  font-medium">
                      Session ID:{" "}
                      <span className="bg-[--secondary-color] text-white p-1 rounded-2xl">
                        {request.sessionId}
                      </span>
                    </p>
                    <p className="  font-medium">
                      Status:{" "}
                      <span
                        className={`${
                          request.status === "pending"
                            ? "bg-yellow-400 text-white"
                            : "border shadow bg-white"
                        }  px-3 py-1 font-semibold rounded-lg `}
                      >
                        {request.status}
                      </span>
                    </p>
                    <p className="  font-medium">
                      Requested By: {request.requestedBy.toUpperCase()}
                    </p>
                    <p className="  font-medium flex  gap-4">
                      Old Date:
                      <span className="text-red-600">
                        {convertDateTimeZone(
                          request.oldDate,
                          "UTC",
                          Intl.DateTimeFormat().resolvedOptions().timeZone,
                          "DD/MMM/YYYY h:mm A"
                        )}
                      </span>
                    </p>
                    {request.status === "approved" ? (
                      <p className="  font-medium flex  gap-4">
                        New Date:
                        <span className="text-green-600">
                          {convertDateTimeZone(
                            request.newDate,
                            "UTC",
                            Intl.DateTimeFormat().resolvedOptions().timeZone,
                            "DD/MMM/YYYY h:mm A"
                          )}
                        </span>
                      </p>
                    ) : (
                      ""
                    )}
                    {request.status === "pending" ? (
                      <>
                        <div className="py- flex flex-col gap-3 ">
                          <h3 className="font-semibold text-lg ">
                            Accept the time that sitable for you :
                          </h3>
                          <div className="flex justify-center  items-center">
                            <div className="flex  items-center gap-5">
                              {request.newDatesOptions?.map(
                                (date: string, index: number) => (
                                  <div
                                    className="flex flex-col items-center"
                                    key={index}
                                  >
                                    <p className=" text-[--secondary-color]">
                                      {convertDateTimeZone(
                                        date,
                                        "UTC",
                                        Intl.DateTimeFormat().resolvedOptions()
                                          .timeZone,
                                        "DD/MMM/YYYY h:mm A"
                                      )}
                                    </p>
                                    <button
                                      onClick={() =>
                                        acceptReschedule(request.id, date)
                                      }
                                      className={`${
                                        request.status != "pending"
                                          ? "hidden"
                                          : ""
                                      } px-5 py-1 bg-green-600 hover:bg-green-700 rounded-3xl text-white`}
                                    >
                                      Accept
                                    </button>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          <hr />

                          <button
                            onClick={() => denyAllReschedule(request.id,request.sessionId)}
                            className={`${
                              request.status === "no_response" ? "hidden" : ""
                            } text-center m-auto px-5 py-1 bg-red-700 hover:bg-red-800 text-white rounded-xl`}
                          >
                            Deny All
                          </button>
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TeacherRescduleRequests;
