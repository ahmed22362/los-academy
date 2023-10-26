import AdminNavBar from "@/app/[locale]/admin/components/AdminNavBar";

export default function AdminLayout(
    {children}: {
        children: React.ReactNode
    }) {
    return (
        <section>
                <AdminNavBar />
            {children}
        </section>
    )
}