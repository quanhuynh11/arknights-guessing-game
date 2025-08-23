"use client";

import ToggleBox from "@/_components/toggle-box";
import { useState } from "react";
import GuessingPage from "../guessing-page/page";

export default function PreGuessingPage() {

    const [isEnglishOnly, setIsEnglishOnly] = useState(false);

    const [isGameStarted, setIsGameStarted] = useState(false);

    const [gameKey, setGameKey] = useState(0);

    const startGame = () => {
        setIsGameStarted(true);
        setGameKey(prev => prev + 1);
    }

    return (
        <section className="bg-blue-950 w-screen h-screen text-white p-5 flex flex-col items-center justify-center">
            <img className="w-1/8 mb-5" src="/images/rhodes-island.webp" alt="A picture of the arknights rhodes island logo"></img>

            {!isGameStarted && (
                <section className="flex flex-col items-center justify-center">
                    <ToggleBox accompanyingText="Filter out non-english?" isButtonToggled={isEnglishOnly} setIsButtonToggled={setIsEnglishOnly} />
                    <button className="bg-amber-600 hover:bg-amber-800 text-white font-bold py-2 px-12 rounded text-2xl mt-20 cursor-pointer"
                        onClick={() => startGame()}
                    >
                        Start Game
                    </button>
                </section>
            )}

            {isGameStarted && (
                <section>
                    <GuessingPage key={gameKey} setIsGameStarted={setIsGameStarted} setRestartGame={() => setGameKey(prev => prev + 1)} />
                </section>
            )}
        </section>
    )
}