
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import AdminNavBar from "./components/AdminNavBar";
import OurSideBar from "./components/ourSideBar";



export default function TeacherLayout(
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