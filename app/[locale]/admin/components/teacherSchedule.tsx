import { getAllSessions } from "@/utilities/getAllSessions";
import TeacherScheduleData from "./teacherScheduleData";

export default async function TeacherSchedule() {
  const allSessions = await getAllSessions(
    "session?status=pending&limit=10&page=1&orderBy=ASC",
  );

  const sortedSessions = allSessions?.data ?? [];

  return (
    <div className={"adminBox w-full flex-col"}>
      <h3 className={"adminBoxTitle"}>Teachers Schedule</h3>
      <div className="w-full flex-col h-[200px] scrollAction mb-[20px]">
        {sortedSessions && sortedSessions.length > 0 ? (
          sortedSessions.map((session: any, index: number) => {
            return <TeacherScheduleData data={session} key={index} />;
          })
        ) : (
          <p className="mt-3 p-3 bg-warning-color text-white w-fit rounded-full font-bold">
            No Sessions
          </p>
        )}
      </div>
    </div>
  );
}
