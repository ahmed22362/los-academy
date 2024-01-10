import { Calendar, CalendarProps } from 'primereact/calendar'
import React from 'react'

function BookSessionsCalendar({datetime12h ,setDateTime12h} :any) {

  
  return (
    <div>
         <Calendar
        value={datetime12h}
        onChange={(e: CalendarProps | any) => setDateTime12h(e.value)}
        showTime
        className="responsive-calendar"
        hourFormat="12"
        style={{
          outline: "4px solid var(--secondary-color)",
          borderRadius: "16px",
         
        }}
        inline
        selectionMode="multiple"
      />
    </div>
  )
}

export default BookSessionsCalendar