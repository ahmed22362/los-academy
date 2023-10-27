import AdminNavBar from "@/app/[locale]/admin/components/AdminNavBar";
import OurSideBar from "@/app/[locale]/admin/components/ourSideBar";

export default function AdminLayout(
    {children}: {
        children: React.ReactNode
    }) {
    return (
        <section>
                <AdminNavBar />
                <aside className={"fixed left-0 h-full"}>
                    <OurSideBar />
                </aside>
            {children}
        </section>
    )
}