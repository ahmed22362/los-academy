import ComboBox from "@/app/[locale]/admin/components/comboBox";
import OurTable from "@/app/[locale]/admin/components/OurTable";

export default function StudentSection() {
    return(
        <main className={"ps-[260px] pt-[7rem]"}>
            <ComboBox />
            <OurTable />
        </main>
    )
}