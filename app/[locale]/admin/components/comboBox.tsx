"use client"
import {CustomFlowbiteTheme, Dropdown} from "flowbite-react";
import {VscGoToFile} from "react-icons/vsc";

export default function ComboBox() {

    const customTheme: CustomFlowbiteTheme['dropdown'] = {
        inlineWrapper: "bg-white text-black-color-one px-5 py-2 flex items-center rounded-[16px] font-normal"
    }

    return(
        <section className={"px-5"}>
            <div className={"flex flex-row w-full justify-between items-center bg-white-color p-5 rounded-[16px]"}>
                <form>
                    <input className={
                        "border-0 rounded-[16px] w-[450px] focus:border-[2px] border-secondary-color transition-all"
                    } type={"search"} placeholder={"search"} />
                </form>
                <div className={"flex flex-row justify-between items-center gap-5"}>
                    <Dropdown label={"All"} theme={customTheme} inline>
                        <Dropdown.Item>one</Dropdown.Item>
                        <Dropdown.Item>Two</Dropdown.Item>
                    </Dropdown>
                    <button className={
                        "bg-white text-black-color-one px-5 py-2 rounded-[16px] font-normal"
                    }>Add +</button>
                    <div className={"flex flex-row justify-center items-center gap-3 bg-white text-black-color-one px-5 py-2 rounded-[16px] font-normal"}>
                        <VscGoToFile className={"text-2xl font-normal"}/>
                        <span>Export Data</span>
                    </div>
                </div>
            </div>
        </section>
    )
}