import React, { useEffect, useState } from 'react'
import PrimaryButton from '../../components/PrimaryButton'
import styles from '../page.module.css'
import Cookies from 'universal-cookie';
function CommunityStatistics() {

    const cookie=new Cookies();
    const url ='https://los-academy.onrender.com/api/v1/';
    const token =cookie.get('token') ;
    const [historySeesions, setHistorySeesions] = useState<any[]>([]);
    useEffect(() => {
        fetch(`${url}user/myHistorySessions`, {
          method: 'GET', 
          headers: {
            Authorization: `Bearer ${token}` // Correct the header key to 'Authorization'
          }
        })
          .then((response) => response.json())
          .then((data) => {

            console.log(data);
          
            setHistorySeesions(data)
            // Set the retrieved Seeions in the state
            
          })
          .catch((error) => {
            console.error('Error fetching  History sessions:', error);
          });
    
      }, [])
      
  return (
    <div  className={`shadow-2xl	w-full p-5  rounded-3xl	hover:shadow-lg duration-300	`}>
    <h4 className={`${styles.secondary_head} mb-5 ml-3`}>Community statistics :</h4>
    <div className={`flex justify-between gap-5 items-center mt-10`}>
      <PrimaryButton 
    ourStyle="bg-secondary-color max-md:px-3 hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-3 px-3 shadow rounded-full w-50 mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
    text={`Done  (${historySeesions?.length || 0}) Sessions`}
  />
<PrimaryButton
ourStyle="bg-secondary-color max-md:px-3 hover:bg-secondary-hover text-sm font-semibold transition-colors text-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] py-3 px-3 shadow rounded-full w-50 mx-auto max-md:py-2.5 max-md:px-10 max-md:w-45"
text={'100% Attendence'}
/>
    </div>
  </div>  )
}

export default CommunityStatistics