import React from 'react'
import ComboBox from '../components/teacher/comboBox';
import OurTable from '../components/OurTable';

function TransactionPage() {
  return (
    <main className='ps-[260px] pt-[7rem]'>

        <ComboBox />
        
        <OurTable />
    
    </main>
  )
}

export default TransactionPage;