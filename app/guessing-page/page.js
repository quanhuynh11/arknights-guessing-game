"use client";

import AnswerBlock from "@/_components/answer-block";
import { useState, useMemo } from "react";
import songs from "../../public/song-metadata/songs.json";

export default function GuessingPage() {
    const [answerSelected, setAnswerSelected] = useState(false);

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

    console.log(correctAnswer);

    return (
        <div className="bg-blue-950 w-screen h-screen text-white p-5 flex flex-col items-center justify-center">
            <h1 className="text-2xl mb-6">Guessing Page</h1>
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
        </div>
    );
}
