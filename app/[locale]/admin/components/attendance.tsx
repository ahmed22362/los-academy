import OurChart from "@/app/[locale]/admin/components/chart";
export default function Attendance() {
    return(
        <div className={"flex flex-row justify-center items-center flex-wrap gap-[10px] h-[240px] max-md:h-auto text-center w-[340px] max-md:w-full shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] rounded-[24px] p-[15px]"}>
            <div className={"flex flex-col justify-center items-center gap-1"}>
                <h3 className={"text-black-color-one font-semibold text-[16px]"}>Attendance Overview</h3>
                <OurChart />
            </div>
                <span className={"font-semibold text-base text-black-color-one"}>Total: 100</span>
        </div>
    )
}

