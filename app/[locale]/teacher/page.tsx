import Attendance from "./components/attendance";
import RescheduleSessions from "./components/getRescheduleRequests";
import Reports from "./components/reports";
import Statistics from "./components/statistics";
import TeacherSchedule from "./components/teacherSchedule";
import FetchingUpComingSessions from "./components/fetchingUpComingSessions";
import StudentAbsent from "./components/studentAbsent";
import PaidSesstionsTable from "./components/paidSessionsTable";
import FreeSesstionsTable from "./components/freeTrialTable";

export default function TeacherPage() {
  return (
    <main
      className={
        "ps-[255px] max-md:ps-[20px] w-full items-center pt-[7rem] flex justify-center gap-5 max-lg:flex-wrap "
      }
    >
      <section
        className={
          "max-md:w-full max-md:flex max-md:flex-col max-md:gap-5 max-md:items-center w-[600px]"
        }
      >
        <div className="flex items-center justify-between pb-[20px] gap-5 max-md:flex-wrap">
          <Attendance />
          <FetchingUpComingSessions />
        </div>
        <div
          className={
            "flex lg:flex-col max-md:flex-row w-full justify-center items-center gap-5 pb-[20px] max-md:flex-wrap"
          }
        >
          <TeacherSchedule />
          <StudentAbsent />
        </div>
        <Reports />
      </section>
      <section className="mx-auto w-full">
        <RescheduleSessions />
        <div className="px-3 w-full">
          <FreeSesstionsTable/>
          <PaidSesstionsTable/>
          <Statistics />
        </div>
      </section>
    </main>
  );
}
