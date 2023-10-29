import {AiOutlineFileText} from "react-icons/ai";
import {BsFileEarmarkArrowDown} from "react-icons/bs";

export default function Reports() {
    return(
        <div className={"adminBox w-full flex-col gap-2 h-[200px] scrollAction my-5"}>
            <h3 className={"adminBoxTitle"}>Reports</h3>
            <div className={"bg-white-color px-10 py-5 rounded-[16px] flex justify-between items-center w-full my-4"}>
                <div className={"flex items-center justify-center gap-5"}>
                    <AiOutlineFileText className={"text-[26px]"}/>
                    <div className={"flex flex-col gap-2"}>
                        <p className={"font-semibold text-base"}>Report 1 (5-Sep-2023)</p>
                        <span>Title</span>
                    </div>
                </div>
                <div className={"flex gap-5 items-center"}>
                    <button className={"smallBtn"}>View</button>
                    <BsFileEarmarkArrowDown className={"text-[26px]"}/>
                </div>
            </div>
        {/*    Repeat */}
            <div className={"bg-white-color px-10 py-5 rounded-[16px] flex justify-between items-center w-full my-4"}>
                <div className={"flex items-center justify-center gap-5"}>
                    <AiOutlineFileText className={"text-[26px]"}/>
                    <div className={"flex flex-col gap-2"}>
                        <p className={"font-semibold text-base"}>Report 1 (5-Sep-2023)</p>
                        <span>Title</span>
                    </div>
                </div>
                <div className={"flex gap-5 items-center"}>
                    <button className={"smallBtn"}>View</button>
                    <BsFileEarmarkArrowDown className={"text-[26px]"}/>
                </div>
            </div>
            <div className={"bg-white-color px-10 py-5 rounded-[16px] flex justify-between items-center w-full my-4"}>
                <div className={"flex items-center justify-center gap-5"}>
                    <AiOutlineFileText className={"text-[26px]"}/>
                    <div className={"flex flex-col gap-2"}>
                        <p className={"font-semibold text-base"}>Report 1 (5-Sep-2023)</p>
                        <span>Title</span>
                    </div>
                </div>
                <div className={"flex gap-5 items-center"}>
                    <button className={"smallBtn"}>View</button>
                    <BsFileEarmarkArrowDown className={"text-[26px]"}/>
                </div>
            </div>
        </div>
    )
}