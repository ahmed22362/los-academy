import {Calendar} from "primereact/calendar";

export default function CalendarSection() {
    return(
        <div>
            <Calendar style={{
                width: "100%",
                outline: "4px solid var(--secondary-color)",
                borderRadius: "16px"
            }} inline/>
        </div>
    )
}