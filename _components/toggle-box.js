"use client";

import { useState } from "react";

/**
 * A toggle box component that displays a button with specified text
 * and toggles its color between white and blue when clicked.
 * @param {{buttonText: string, isButtonToggled: boolean, setIsButtonToggled: (isButtonToggled: boolean) => void}} props
 * @returns {JSX.Element}
 */
export default function ToggleBox({ buttonText, accompanyingText, isButtonToggled, setIsButtonToggled }) {

    const [currentStyle, setCurrentStyle] = useState("bg-white hover:bg-gray-400 cursor-pointer rounded-sm w-8 h-8")

    const handleClick = () => {
        if(isButtonToggled) {
            setCurrentStyle("bg-white hover:bg-gray-400 cursor-pointer rounded-sm w-8 h-8");
            setIsButtonToggled(false);
            return;
        }
        else {
            setCurrentStyle("bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-sm w-8 h-8");
            setIsButtonToggled(true);
            return;
        }
    }

    return (
        <section className="flex items-center justify-center">
            <button className={currentStyle} onClick={handleClick}>
                {buttonText}
            </button>

            <p className="text-white text-xl ml-5">{accompanyingText}</p>
        </section>
    )
}