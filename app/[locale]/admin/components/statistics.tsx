 import StatisticBox from "@/app/[locale]/admin/components/statisticBox";

export default function Statistics() {
    return (
        <section className={"flex gap-5 pb-[20px]"}>
            <StatisticBox title={"Total Students"} number={"150"}/>
            <StatisticBox title={"Total Teachers"} number={"20"}/>
            <StatisticBox title={"Total Balance"} number={"$1504.4"}/>
        </section>
    );
}
