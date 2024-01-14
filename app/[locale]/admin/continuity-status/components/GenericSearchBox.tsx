"use client";

export default function GenericComboBox({
  AdditionalComponent,
}: {
  AdditionalComponent?: JSX.Element;
}) {
  return (
    <section className={"mb-3"}>
      <div
        className={
          "flex flex-row w-full justify-between items-center bg-white-color p-5 rounded-[16px] flex-wrap"
        }
      >
        <form>
          <input
            className={
              "border-0 rounded-[16px] w-[420px] max-md:w-full focus:border-[2px] border-secondary-color transition-all"
            }
            type={"search"}
            placeholder={"search"}
          />
        </form>
        {AdditionalComponent}
      </div>
    </section>
  );
}
