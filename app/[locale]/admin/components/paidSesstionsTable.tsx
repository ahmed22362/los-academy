export default function PaidSesstionsTable() {
    return(
        <div className={"w-full my-5"}>
            <h3 className={"adminBoxTitle responsiveText"}>Newest Paid Sessions</h3>
            <div className={"adminBox mt-4 flex flex-col w-[390px] mx-auto"}>
                <div className={"p-1 my-2 font-semibold flex w-full justify-between items-center text-base"}>
                    <h5>Session #2</h5>
                    <span>4:00 - 4:30 PM</span>
                    <span>12- oct-2023</span>
                </div>
                <div className={"p-1 my-2 font-semibold flex w-full justify-between items-center text-base"}>
                    <h5>Session #2</h5>
                    <span>4:00 - 4:30 PM</span>
                    <span>12- oct-2023</span>
                </div>
                <div className={"p-1 my-2 font-semibold flex w-full justify-between items-center text-base"}>
                    <h5>Session #2</h5>
                    <span>4:00 - 4:30 PM</span>
                    <span>12- oct-2023</span>
                </div>
            </div>
        </div>
    )
}