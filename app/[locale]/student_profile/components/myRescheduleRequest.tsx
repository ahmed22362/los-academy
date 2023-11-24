import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import ContentLoader from "react-content-loader";
import moment from "moment-timezone";

function MyRescheduleRequest() {
  const cookie = new Cookies();
  const url = process.env.NEXT_PUBLIC_APIURL;
  const token = cookie.get("token");
  const [myReschedule, setMyReschedule] = useState<any[]>([]);
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
  useEffect(() => {
    fetch(`${url}/user/requestReschedule`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Correct the header key to 'Authorization'
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMyReschedule(data.data);
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
            {/* Add your loader shapes here */}
          </ContentLoader>
        ) : (
          <ul>
            {myReschedule.map((request, index) => (
              <li className="" key={request.id}>
                <div className="flex justify-center items-center py-2 mt-5">
                  <h3 className="px-2 py-1 font-semibold text-lg bg-blueviolet-600 rounded-xl">
                    {index + 1}
                  </h3>{" "}
                </div>
                <p className="my-1 py-2 font-medium">
                  Session ID:{" "}
                  <span className="bg-[--secondary-color] text-white p-1 rounded-2xl">
                    {request.sessionId}
                  </span>
                </p>
                <p className="my-1 py-2 font-medium">
                  Status:{" "}
                  <span
                    className={`${
                      request.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-green-600"
                    } px-3 py-1 text-white rounded-lg`}
                  >
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
                    The Date You Chose :
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
                      {/* <button
                    disabled={request.status==='approved'? true :false}
                    className={` ${request.status==='approved'? 'bg-gray-500': 'bg-green-600 hover:bg-green-700'} px-5 py-1    rounded-3xl text-white`}>
                      change
                    </button> */}
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
                      {/* <button 
                    disabled={request.status==='approved'? true :false}
                    className={` ${request.status==='approved'? 'bg-gray-500': 'bg-green-600 hover:bg-green-700'} px-5 py-1    rounded-3xl text-white`} >
                      change
                    </button> */}
                    </div>
                  </div>
                </div>
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyRescheduleRequest;
