 import StatisticBox from "@/app/[locale]/admin/components/statisticBox";

export default function Statistics() {
    return (
        <section className={"flex gap-5 pb-[20px] w-full max-md:w-full max-md:px-5 max-md:flex-col max-md:flex-wrap px-2"}>
            <StatisticBox title={"Total Students"} number={"150"}/>
            <StatisticBox title={"Total Teachers"} number={"20"}/>
            <StatisticBox title={"Total Balance"} number={"$1504.4"}/>
        </section>
    );
}
