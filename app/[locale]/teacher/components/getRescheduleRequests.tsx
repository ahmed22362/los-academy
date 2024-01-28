import SessionData from "./sessionData";
import { fetchRescheduledSession } from "@/utilities/fetchRescheduledSession";
import { cookies } from "next/headers";

export default async function RescheduleSessions() {
  const token = cookies().get("token")?.value;
  const allSessions = await fetchRescheduledSession(token);

  return (
    <div className={"adminBox w-full mx-4 h-[350px] flex-col mb-5"}>
      <h3 className={"adminBoxTitle"}>Reschedule Sessions</h3>
      <div className="w-full flex-col gap-2 h-[300px] scrollAction ">
        {allSessions && allSessions.length > 0 ? (
          allSessions.data.map((report: any, index: number) => {
            return <SessionData data={report} key={index} />;
          })
        ) : (
          <p className="p-3 bg-warning-color text-white w-fit rounded-full mt-2 font-bold">
            No Reschedule Requests
          </p>
        )}
      </div>
    </div>
  );
}
