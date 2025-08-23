"use client";

import AnswerBlock from "@/_components/answer-block";
import { useState, useMemo, useEffect } from "react";
import songs from "../../public/song-metadata/songs.json";
import AudioPlayer from 'react-h5-audio-player'

export default function GuessingPage({ setIsGameStarted, setRestartGame }) {
    const [answerSelected, setAnswerSelected] = useState(false);
    const [correctAnswerData, setCorrectAnswerData] = useState(null);

    // Pick a random correct answer
    const correctAnswer = useMemo(() => {
        return songs[Math.floor(Math.random() * songs.length)];
    }, []);

    // Pick 3 wrong answers and shuffle all 4
    const shuffledAnswers = useMemo(() => {
        const wrongs = songs
            .filter((s) => s.cid !== correctAnswer.cid)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
        return [correctAnswer, ...wrongs].sort(() => 0.5 - Math.random());
    }, [correctAnswer]);

    const handleAnswerSelected = () => setAnswerSelected(true);

    useEffect(() => {
        async function fetchAudio() {
            const response = await fetch("/api/fetch-audio?songCID=" + correctAnswer.cid);

            if (response.ok) {
                setCorrectAnswerData(await response.json());
            }
        }

        fetchAudio();
    }, [correctAnswer]);

    return (
        <div className="bg-blue-950 w-full h-full text-white p-5 flex flex-col items-center justify-center">
            <section className="bg-black w-full h-full flex flex-row items-center gap-4">
                {correctAnswerData && (
                        <AudioPlayer
                            src={null}
                        />
                )}
                <p className="text-lg">Now Playing...</p>
            </section>
            {correctAnswerData && (
                <section className="grid grid-cols-2 gap-4">
                    {shuffledAnswers.map((song) => (
                        <AnswerBlock
                            key={song.cid}
                            answer={song}
                            correctAnswer={correctAnswer}
                            answerSelected={answerSelected}
                            onAnswerSelected={handleAnswerSelected}
                        />
                    ))}
                </section>
            )}

            {/* Game over buttons, 1. retry, 2. bring back the pre-guessing page */}
            {answerSelected && (
                <section className="flex flex-col items-center">
                    <button className="bg-amber-600 hover:bg-amber-800 text-white font-bold py-2 px-12 rounded text-2xl mt-10 cursor-pointer"
                        onClick={setRestartGame}
                    >
                        Play Again
                    </button>

                    <button className="bg-sky-600 hover:bg-sky-800 text-white font-bold py-2 px-12 rounded text-2xl mt-10 cursor-pointer"
                        onClick={() => setIsGameStarted(false)}
                    >
                        Settings
                    </button>
                </section>
            )}
        </div>
    );
}
