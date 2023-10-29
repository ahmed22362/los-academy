export default function OnGoingBox() {
    return(
        <div className={"flex-col justify-center items-center gap-[16px] h-[240px] text-center w-[340px] adminBox"}>
            <h3 className={"adminBoxTitle"}>Ongoing Sessions</h3>
            <div className={"bg-white-color p-5 rounded-[16px] "}>
                <div className={"flex flex-col items-start text-md font-semibold text-[black-color-one]"}>
                    <span>14:50 - 18:30 PM</span>
                    <p>(Omar Hussein with Anas Sayed)</p>
                </div>
                <button className={
                    "bg-secondary-color hover:bg-secondary-hover transition-colors rounded-full mt-1 font-semibold px-5 py-2 text-white"
                }>Join</button>
            </div>
        </div>
    )
}
