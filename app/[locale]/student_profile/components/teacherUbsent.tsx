import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import moment from "moment-timezone";
import ContentLoader from "react-content-loader";

function TeacherUbsent() {
  const cookie = new Cookies();
  const url = process.env.NEXT_PUBLIC_APIURL;
  const token = cookie.get("token");
  const [teacherUbsentSessions, setTeacherUbsentSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
    const apiUrl = `${url}/user/mySessions?status=teacher_absent`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);

        // Assuming data.data contains the sessions
        setTeacherUbsentSessions(data.data);

        // Assuming data.data.status contains the status
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  }, []);

  return (
    <>
      <div>
        <div className="md:min-h-[190px] max-md:min-h-[150px]">
          {loading ? (
            // React Content Loader while data is being fetched
            <ContentLoader
              className="flex flex-col"
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
              {teacherUbsentSessions?.map((sessionInfo, index) => (
                <li className="flex flex-col gap-4 " key={sessionInfo.id}>
                  <p className="my-1 py-2 font-medium">
                    Session ID:{" "}
                    <span className="bg-[--secondary-color] text-white p-1 rounded-2xl">
                      {sessionInfo.id}
                    </span>
                  </p>
                  <p>
                    Type :{" "}
                    <span
                      className={`${
                        sessionInfo.type != "free"
                          ? "bg-red-500"
                          : "bg-green-600"
                      } px-3 py-1 text-white rounded-lg`}
                    >
                      {" "}
                      {sessionInfo.type.toUpperCase()}
                    </span>
                  </p>
                  <p className="my-1 flex justify-between items-center py-2 font-medium">
                    <div>
                      Status:{" "}
                      <span
                        className={`${
                          sessionInfo.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-green-600"
                        } px-3 py-1 text-white rounded-lg`}
                      >
                        {sessionInfo.status}
                      </span>
                    </div>
                    <span className="px-3 py-1">
                      Go to Pending Sessions To Reschedule This Session
                    </span>
                  </p>
                  <p className="my-1 py-2 font-medium">
                    Teacher Name: {sessionInfo?.SessionInfo?.teacher?.name}
                  </p>
                  <p className="my-1 py-2 font-medium flex  gap-4">
                    Old Date:
                    <span className="text-red-600">
                      {convertDateTimeZone(
                        sessionInfo.sessionDate,
                        "UTC",
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                        "DD/MMM/YYYY h:mm A"
                      )}
                    </span>
                  </p>

                  <hr />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default TeacherUbsent;
