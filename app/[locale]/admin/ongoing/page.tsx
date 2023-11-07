import React from 'react'
import ComboBox from '../components/teacher/teacherComboBox';
import OurTable from '../components/OurTable';

function OnGoingPage() {
  return (
    <main className='ps-[260px] pt-[7rem]'>
        <ComboBox />
        <OurTable />
    </main>
  )
}

export default OnGoingPage;