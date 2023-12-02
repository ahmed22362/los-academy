import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import ContentLoader from "react-content-loader";
import moment from "moment-timezone";

function MyRescheduleRequest() {
  const cookie = new Cookies();
  const [myReschedule, setMyReschedule] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/user/requestReschedule`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`, // Correct the header key to 'Authorization'
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const sortedData = data.data.sort((a: any, b: any) =>
          moment(a.newDatesOptions[0]).isBefore(b.newDatesOptions[0]) ? 1 : -1
        );
        setMyReschedule(sortedData);
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
          <>
            {myReschedule?.length === 0 ? (
              <p>No reschedule requests available.</p>
            ) : (
              <ul className="">
                {myReschedule.map((request, index) => (
                  <li className="flex flex-col gap-5 mb-3" key={request.id}>
                    <div className="bg-white-color p-2 flex flex-col gap-1 rounded-xl ">
                      <div className="flex justify-center items-center  mt-2">
                        <h3 className="px-2 py-1 font-semibold text-lg bg-blueviolet-600 rounded-xl">
                          With Teacher:{" "}
                          {request.session.SessionInfo.teacher.name}
                        </h3>{" "}
                      </div>
                      <p className="my-1  font-medium">
                        Session ID:{" "}
                        <span className="bg-[--secondary-color] text-white p-1 rounded-2xl">
                          {request.sessionId}
                        </span>
                      </p>
                      <p className="my-1  font-medium">
                        Status:{" "}
                        <span
                          className={`${
                            request.status === "pending"
                              ? "bg-yellow-500 text-white"
                              : "border shadow"
                          } px-3 py-1 bg-white rounded-lg`}
                        >
                          {request.status}
                        </span>
                      </p>
                      <p className="my-1  font-medium">
                        Requested By:{" "}
                        {request.requestedBy === "user"
                          ? "Me"
                          : request.requestedBy.toUpperCase()}
                      </p>
                      <p className="my-1  font-medium flex  gap-4">
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
                        <p className="my-1  font-medium flex  gap-4">
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
                          <div className=" flex flex-col gap-3 ">
                            <h3 className="font-semibold text-lg ">
                              The Date You Chose :
                            </h3>
                            <div className="flex m-auto items-center gap-3">
                              {request.newDatesOptions.map(
                                (date: string, i: number) => (
                                  <p
                                    className="my-1 text-[--secondary-color]"
                                    key={i}
                                  >
                                    {convertDateTimeZone(
                                      date,
                                      "UTC",
                                      Intl.DateTimeFormat().resolvedOptions()
                                        .timeZone,
                                      "DD/MMM/YYYY h:mm A"
                                    )}
                                  </p>
                                )
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
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

export default MyRescheduleRequest;
