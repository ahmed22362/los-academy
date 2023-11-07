import { getStaticData } from "@/helpers/getStaticData";
import ReportData from "./reportData";

export default async function Reports() {

    const allReports = await getStaticData('report');
    const theResult = await allReports.data;
    
    return(
        <div className={"adminBox w-full flex-col my-5"}>
            <h3 className={"adminBoxTitle"}>Reports</h3>
            <div className="w-full flex-col gap-2 h-[200px] scrollAction ">
                {theResult.map((report: any, index: number) => {
                    return(
                        <ReportData data={report} key={index}/>
                    )
                })}
            </div>
        </div>
    )
}