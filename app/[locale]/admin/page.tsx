import Statistics from '@/app/[locale]/admin/components/statistics';
import Attendance from '@/app/[locale]/admin/components/attendance';
import OnGoingBox from '@/app/[locale]/admin/components/onGoingBox';
import TeacherSchedule from '@/app/[locale]/admin/components/teacherSchedule';
import Reports from '@/app/[locale]/admin/components/report/reports.box';
import PaidSessionsTable from '@/app/[locale]/admin/components/sessionRequests/paidSessionsTable';
import FreeSessionsTable from './components/sessionRequests/freeTrialTable';
import ReplaceTeacher from './components/replaceTeacher';

export default function AdminPage() {
  return (
    <main
      className={
        'ps-[255px] max-md:ps-[20px] pe-[20px] pt-[7rem] flex justify-start gap-5 lg:gap-8 xl:gap-10 flex-wrap max-md:justify-between max-md:items-center max-w-[1800px] mx-auto'
      }
    >
      <section
        className={
          'max-md:w-full max-md:flex max-md:flex-col max-md:gap-5 max-md:items-center w-[600px] lg:w-[700px] xl:w-[800px] 2xl:w-[900px] flex-shrink-0'
        }
      >
        <Statistics />
        <div
          className={
            'flex items-center gap-5 pb-[20px] w-(calc(100% / 2)) max-md:flex-wrap'
          }
        >
          <Attendance />
          <OnGoingBox />
        </div>
        <TeacherSchedule />
        <Reports />
      </section>
      <section className="flex-1 min-w-[400px] max-md:w-full max-md:px-[20px]">
        <div className="px-2">
          <FreeSessionsTable isAdmin={true} />
          <PaidSessionsTable isAdmin={true} />
          <ReplaceTeacher />
        </div>
      </section>
    </main>
  );
}
