import ComboBox from "@/app/[locale]/admin/components/comboBox";
import OurTable from "@/app/[locale]/admin/components/OurTable";

export default function Teacher() {
    return(
        <main className={"ps-[260px] pt-[7rem]"}>
            <ComboBox />
            <OurTable />
        </main>
    )
}