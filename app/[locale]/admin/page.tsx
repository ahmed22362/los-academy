import Statistics from "@/app/[locale]/admin/components/statistics";
import Attendance from "@/app/[locale]/admin/components/attendance";
import OnGoingBox from "@/app/[locale]/admin/components/onGoingBox";
import TeacherSchedule from "@/app/[locale]/admin/components/teacherSchedule";
import Reports from "@/app/[locale]/admin/components/reports";
import CalendarSection from "@/app/[locale]/admin/components/calendarSection";
import FreeTrialTable from "@/app/[locale]/admin/components/freeTrialTable";
import PaidSesstionsTable from "@/app/[locale]/admin/components/paidSesstionsTable";

export default function AdminPage() {
    return(
        <main className={"ps-[260px] pt-[7rem] flex gap-5 flex-wrap max-md:justify-center max-md:items-center"}>
            <section className={"max-md:w-full max-md:flex max-md:flex-col max-md:gap-5 max-md:items-center w-[700px]"}>
                <Statistics />
                <div className={"flex items-center gap-5 pb-[20px] w-full flex-wrap"}>
                    <Attendance />
                    <OnGoingBox/>
                </div>
                <TeacherSchedule />
                <Reports />
            </section>
            <section className={"w-[calc(100% - 700px)]"}>
                <CalendarSection />
                <FreeTrialTable />
                <PaidSesstionsTable />
            </section>
        </main>
    )
}
