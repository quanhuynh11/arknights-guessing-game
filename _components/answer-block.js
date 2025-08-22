"use client";

import { useEffect, useState } from "react";
import songs from "../public/song-metadata/songs.json";

export default function AnswerBlock({ answer }) {

    const isAnswer = answer ? true : false;

    const [currentAnswer, setAnswer] = useState(answer);
    const [selected, setSelected] = useState(false);

    const [buttonStyle, setButtonStyle] = useState("bg-indigo-500 hover:bg-indigo-700 text-white font-bold w-64 h-24 rounded text-2xl mt-10 cursor-pointer flex items-center justify-center");

    useEffect(() => {
        // If there isnt an answer passed in, then it's not the correct answer
        // so we will need to just choose a random answer from songs.json
        if (!answer) {
            setAnswer(songs[Math.floor(Math.random() * songs.length)]);
        }
    }, [answer]);

    const handleClick = () => {
        if(isAnswer) {
            setButtonStyle("bg-green-500 text-white font-bold w-64 h-24 rounded text-2xl mt-10 flex items-center justify-center");
            setSelected(true);
        }
        else {
            setButtonStyle("bg-red-500 text-white font-bold w-64 h-24 rounded text-2xl mt-10 flex items-center justify-center");
            setSelected(true);
        }
    }

    

    return (
        <div className="flex flex-col items-center justify-center">
            {/* <h1 className="text-4xl">{currentAnswer}</h1> */}

            {currentAnswer && (
                <button className={buttonStyle}
                    onClick={handleClick}
                    disabled={selected}
                >
                    <p>{currentAnswer.name}</p>
                </button>
            )}
        </div>
    );
}