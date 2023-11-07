
import { getAllSessions } from "@/helpers/getAllSessions";
import TeacherScheduleData from './teacherScheduleData';


export default async function TeacherSchedule() {

    const allSessiosns = await getAllSessions('session');

    const sortedSessiosns = allSessiosns.data.sort((a: any, b: any) => {
        return new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime();
    })
    
    const result = sortedSessiosns.slice(0, 10);

    return(
        <div className={"adminBox w-full flex-col"}>
            <h3 className={"adminBoxTitle"}>Teacher’s Schedule</h3>
            <div className="w-full flex-col h-[200px] scrollAction mb-[20px]">
                {result.map((session: any, index: number) => {
                    return(
                        <TeacherScheduleData data={session} key={index} />
                    )
                })}
            </div>
        </div>
    )
}