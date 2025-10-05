export default function StatisticBox({
  title,
  number,
}: {
  title: string;
  number: string;
}) {
  return (
    <div
      className={
        'flex flex-col justify-center items-center gap-[16px] text-center w-[100%] shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] rounded-[24px] p-[20px] lg:p-[30px] xl:p-[40px] 2xl:p-[50px] min-h-[120px] lg:min-h-[140px] xl:min-h-[160px]'
      }
    >
      <h3
        className={
          'text-black-color-one font-semibold text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]'
        }
      >
        {title}
      </h3>
      <span
        className={
          'text-black-color-two font-semibold text-[20px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px]'
        }
      >
        {number}
      </span>
    </div>
  );
}
