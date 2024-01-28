import MaterialTable from "../../admin/material/components/materialTable";

function MaterialPage() {
  return (
    <main className="ps-[255px] max-md:ps-[20px] pe-[20px] pt-[7rem]">
      <MaterialTable isTeacher={true} />
    </main>
  );
}

export default MaterialPage;
