export default function TeacherSchedule() {
    return(
        <div className={"adminBox w-full flex-col h-[200px] scrollAction mb-[20px]"}>
            <h3 className={"adminBoxTitle"}>Teacher’s Schedule</h3>
            <div className={"py-5 px-4 bg-white-color rounded-[16px] my-10 flex gap-3 font-semibold"}>
                <span>14:56 PM</span>
                <p>(Omar sayed with khaled)</p>
            </div>
        {/*    Repeat */}
            <div className={"py-5 px-4 bg-white-color rounded-[16px] my-10 flex gap-3 font-semibold"}>
                <span>14:56 PM</span>
                <p>(Omar sayed with khaled)</p>
            </div>
            <div className={"py-5 px-4 bg-white-color rounded-[16px] my-10 flex gap-3 font-semibold"}>
                <span>14:56 PM</span>
                <p>(Omar sayed with khaled)</p>
            </div>
        </div>
    )
}