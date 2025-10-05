import StatisticBox from '@/app/[locale]/admin/components/StatisticBox.component';
import { getStaticData } from '@/utilities/fetchDataFunctionAsync';
export default async function Statistics() {
  const totalBalance = await getStaticData('teacher/adminBalance');
  const totalStudentsAndTeachers = await getStaticData(
    'teacher/totalRecordsOf?records=user,teacher'
  );
  return (
    <section
      className={
        'flex gap-3 lg:gap-4 xl:gap-5 2xl:gap-6 pb-[20px] w-full max-md:w-full max-md:px-5 max-md:flex-col max-md:flex-wrap px-2'
      }
    >
      <StatisticBox
        title={'Total Students'}
        number={totalStudentsAndTeachers?.data?.user ?? 0}
      />
      <StatisticBox
        title={'Total Teachers'}
        number={totalStudentsAndTeachers?.data?.teacher ?? 0}
      />
      <StatisticBox
        title={'Total Balance'}
        number={`${totalBalance.balance[0].amount}$`}
      />
    </section>
  );
}
