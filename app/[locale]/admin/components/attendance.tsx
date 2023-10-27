import OurChart from "@/app/[locale]/admin/components/chart";
export default function Attendance() {
    return(
        <div className={"flex flex-col justify-center items-center gap-[16px] text-center w-[300px] shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] rounded-[24px] p-[15px]"}>
            <h3 className={"text-black-color-one font-semibold text-[16px]"}>Attendance Overview</h3>
            <div className={"flex flex-row justify-center items-center gap-20px"}>
            <OurChart />
                <span className={"font-semibold text-base text-black-color-one"}>Total: 100</span>
            </div>
        </div>
    )
}

