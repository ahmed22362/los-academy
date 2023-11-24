import moment from "moment-timezone";
import { Nullable } from "primereact/ts-helpers";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { CustomFlowbiteTheme, Tabs } from "flowbite-react";
import { Toast } from "primereact/toast";
import ContentLoader from "react-content-loader";

function TeacherRescduleRequests() {
  const cookie = new Cookies();
  const url = process.env.NEXT_PUBLIC_APIURL;
  const token = cookie.get("token");
  const [teatcherreschedule, setTeatcherReschedule] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const convertDateTimeZone = (
    inputTime: moment.MomentInput,
    inputTimezone: string,
    outputTimezone: string,
    ourFormat: string
  ) => {
    const convertedTime = moment(
      `${moment().format("YYYY-MM-DD")}T${inputTime}`,
      "YYYY-MM-DDTHH:mm:ss.SSS"
    )
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
        } else {
          showError(data.message);
        }
        // Handle success, e.g., update state or show a success message
        console.log("Reschedule request accepted successfully");
      })
      .catch((error) => {
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

        setTeatcherReschedule(data.data);
        // Set the retrieved Seeions in the state
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
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
          <ul className="h-full">
            {teatcherreschedule.map((request) => (
              <li className="" key={request.id}>
                <p className="my-1 py-2 font-medium">
                  Session ID:{" "}
                  <span className="bg-[--secondary-color] text-white p-1 rounded-2xl">
                    {request.sessionId}
                  </span>
                </p>
                <p className="my-1 py-2 font-medium">
                  Status:{" "}
                  <span className="bg-yellow-500 px-3 py-1 text-white rounded-lg">
                    {request.status}
                  </span>
                </p>
                <p className="my-1 py-2 font-medium">
                  Requested By: {request.requestedBy.toUpperCase()}
                </p>
                <p className="my-1 py-2 font-medium flex  gap-4">
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
                <div className="py-4 flex flex-col gap-5 ">
                  <h3 className="font-semibold text-lg ">
                    choose the time that sitable for you :
                  </h3>
                  <div className="flex justify-center gap-10 items-center">
                    <div className="flex flex-col items-center gap-3">
                      <p className="my-1 text-[--secondary-color]">
                        {convertDateTimeZone(
                          request.newDateStartRange,
                          "UTC",
                          Intl.DateTimeFormat().resolvedOptions().timeZone,
                          "DD/MMM/YYYY h:mm A"
                        )}{" "}
                      </p>
                      <button
                        onClick={() =>
                          acceptReschedule(
                            request.id,
                            request.newDateStartRange
                          )
                        }
                        className=" px-5 py-1 bg-green-600 hover:bg-green-700  rounded-3xl text-white"
                      >
                        Accept
                      </button>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <p className="my-1 text-[--secondary-color]">
                        {" "}
                        {convertDateTimeZone(
                          request.newDateEndRange,
                          "UTC",
                          Intl.DateTimeFormat().resolvedOptions().timeZone,
                          "DD/MMM/YYYY h:mm A"
                        )}
                      </p>
                      <button
                        onClick={() =>
                          acceptReschedule(request.id, request.newDateEndRange)
                        }
                        className=" px-5 py-1 bg-green-600 hover:bg-green-700  rounded-3xl text-white"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                  <button className="text-center m-auto px-5 py-1 bg-red-700 hover:bg-red-800 text-white rounded-3xl">
                    Deny All
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TeacherRescduleRequests;
