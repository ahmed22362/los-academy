import Statistics from "@/app/[locale]/admin/components/statistics";
import OurChart from "@/app/[locale]/admin/components/chart";
import Attendance from "@/app/[locale]/admin/components/attendance";

export default function AdminPage() {
    return(
        <main className={"ps-[260px] pt-[2rem]"}>
            <Statistics />
            <Attendance />
        </main>
    )
}
