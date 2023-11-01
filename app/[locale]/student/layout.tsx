export default function StudentLayout(
    {children}: {
        children: React.ReactNode
    }) {
    return (
        <section>
                {/* <aside className={"fixed left-0 h-full"}>
                </aside> */}
            {children}
        </section>
    )
}