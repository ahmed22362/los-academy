// import SessionsTable from "../components/sessions/sessionsTable";

import SessionsTable from "./components/SessionTable";

export default function TeacherSessionsSection() {
  return (
    <main className={"ps-[255px] max-md:ps-[20px] pe-[20px] pt-[7rem]"}>
      <SessionsTable />
    </main>
  );
}
