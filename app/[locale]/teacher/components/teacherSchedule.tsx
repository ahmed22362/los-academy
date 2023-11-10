
import { getAllSessions } from "@/helpers/getAllSessions";
import TeacherScheduleData from './teacherScheduleData';

export default async function TeacherSchedule() {
    
    const allSessiosns = await getAllSessions('teacher/upcomingSession');
    // console.log(allSessiosns)

    const sortedSessiosns = allSessiosns.data?.sort((a: any, b: any) => {
        return new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime();
    })

    return(
        <div className={"adminBox w-full flex-col"}>
            <h3 className={"adminBoxTitle"}>My Schedule</h3>
            <div className="w-full flex-col h-[200px] scrollAction mb-[20px]">
                {sortedSessiosns.length > 0 ? sortedSessiosns.map((session: any, index: number) => {
                    return(
                        <TeacherScheduleData data={session} key={index} />
                    )
                })
                :  <p className="p-3">No Sessions</p>
            }
            </div>
        </div>
    )
}