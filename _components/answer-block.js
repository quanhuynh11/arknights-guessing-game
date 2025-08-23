"use client";

import { useState } from "react";

export default function AnswerBlock({
    answer,
    correctAnswer,
    answerSelected,
    onAnswerSelected,
}) {
    const [currentAnswer, setAnswer] = useState(answer);

    const handleClick = () => {
        if (!answerSelected) {
            onAnswerSelected();
        }
    };

    // Compute button color
    let bgColor = "bg-indigo-500 hover:bg-indigo-700";
    if (answerSelected) {
        bgColor =
            currentAnswer.cid === correctAnswer.cid ? "bg-green-500" : "bg-red-500";
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {currentAnswer && (
                <button
                    className={`${bgColor} text-white font-bold w-64 h-24 rounded text-2xl mt-10 flex items-center justify-center`}
                    onClick={handleClick}
                    disabled={answerSelected}
                >
                    <p>{currentAnswer.name}</p>
                </button>
            )}
        </div>
    );
}
