"use client";

const PrimaryButton = ({text, ourStyle}: any) => {
    return(
        <button className={ourStyle}>{text}</button>
    )
}

export default PrimaryButton;