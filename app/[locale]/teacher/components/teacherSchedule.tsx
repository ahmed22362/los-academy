
import { getAllSessions } from "@/helpers/getAllSessions";
import TeacherScheduleData from './teacherScheduleData';


export default async function TeacherSchedule() {

    const allSessiosns = await getAllSessions('teacher/upcomingSessions');
    // console.log(allSessiosns)
    const sortedSessiosns = allSessiosns.data.sort((a: any, b: any) => {
        return new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime();
    })

    return(
        <div className={"adminBox w-full flex-col"}>
            <h3 className={"adminBoxTitle"}>My Schedule</h3>
            <div className="w-full flex-col h-[200px] scrollAction mb-[20px]">
                {sortedSessiosns.map((session: any, index: number) => {
                    return(
                        <TeacherScheduleData data={session} key={index} />
                    )
                })}
            </div>
        </div>
    )
}