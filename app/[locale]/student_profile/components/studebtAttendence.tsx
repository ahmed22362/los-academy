import React from 'react'
import styles from '../page.module.css'
import PrimaryButton from '../../components/PrimaryButton'

function StudentAttendence() {
  return (
    <div className={`flex flex-col justify-center items-center gap-5	`}>
    <h4 className={`${styles.secondary_head} `}>Are you here and ready for the session ?</h4>
      <p>This Session will Start within</p>
      <h1 className={`font-bold	 text-lg	`}>9 mins 23 sec</h1>
      <PrimaryButton 
      ourStyle="bg-secondary-color hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]   h-10 w-75 px-8 m-auto my-3 shadow rounded-full  mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
      text={'I’m here'}
       /> 
  </div>
  )
}

export default StudentAttendence