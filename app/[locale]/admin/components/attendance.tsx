import { ResponseSessionStatistsData } from "@/types";
import { getStaticData } from "@/utilities/fetchDataFunctionAsync";
import TeacherChart from "../../teacher/components/teacherChart";

interface ResponseData {
  data: ResponseSessionStatistsData[];
}
export default async function Attendance() {
  const myStatistics: ResponseData = await getStaticData("session/statistics");
  const totalCount = myStatistics.data.reduce(
    (total, item) => total + item.count,
    0,
  );
  return (
    <div
      className={
        "flex flex-row justify-center items-center flex-wrap gap-[10px] h-[240px] w-[400px] max-md:h-auto text-center max-md:w-full shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] rounded-[24px] p-[15px]"
      }
    >
      <div className={"flex flex-col justify-center items-center gap-1"}>
        <h3 className={"text-black-color-one font-semibold text-[16px]"}>
          Attendance Overview
        </h3>
        <TeacherChart
          totalSessions={totalCount}
          teacherStatistics={myStatistics.data}
        />{" "}
      </div>
      <span className={"font-semibold text-base text-black-color-one"}>
        Total: {totalCount} Sessions
      </span>
    </div>
  );
}
