"use client";

const PrimaryButton = ({text, ourStyle, onClick}: {text: string, ourStyle: string, onClick?: () => void}) => {
    return(
        <button className={ ourStyle} onClick={onClick}>{text}</button>
    )
}

export default PrimaryButton;