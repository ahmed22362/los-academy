"use client";

import { convertDateTimeZone } from "@/utilities";
function TeacherScheduleData({ data }: { data: any }) {
  const session = data && data;

  const convertDate = convertDateTimeZone;

  return (
    <div
      className={
        "py-5 px-4 bg-white-color rounded-[16px] my-4 flex gap-3 font-semibold flex-wrap"
      }
    >
      <span>
        {convertDate(
          session.sessionDate,
          "UTC",
          Intl.DateTimeFormat().resolvedOptions().timeZone,
          "MM/DD/YYYY hh:mm A",
        )}
      </span>
      <p>{`${session.sessionInfo.teacher.name} with ${session.sessionInfo.user.name}`}</p>
    </div>
  );
}

export default TeacherScheduleData;
