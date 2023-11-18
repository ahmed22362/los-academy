
import { getStaticData } from "@/helpers/getStaticData";
import ReportData from "./reportData";
import SectionHeader from "./sectionHeader";

export default async function Reports() {

    const allReports = await getStaticData('teacher/myReports');
    // console.log(allReports)
    const theResult = await allReports.data;

    return(
        <div className={"adminBox w-full flex-col my-5"}>
            <SectionHeader />
            <div className="w-full flex-col gap-2 h-[200px] scrollAction ">
               {theResult.length > 0 ? theResult.map((report: any, index: number) => {
                   return (
                       <ReportData data={report} key={index} />
                   )
               }) : <p>No Reports</p>}
            </div>

        </div>
    )
}