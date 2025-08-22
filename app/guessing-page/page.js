"use client";

import AnswerBlock from "@/_components/answer-block";
import { useState } from "react";
import songs from "../../public/song-metadata/songs.json";

export default function GuessingPage() {

    const [correctAnswer, setCorrectAnswer] = useState(songs[Math.floor(Math.random() * songs.length)]);

    const [answerSelected, setAnswerSelected] = useState(false);

    return (
        <div className="bg-blue-950 w-screen h-screen text-white p-5 flex flex-col items-center justify-center">
            <section className="flex flex-col items-center justify-center">
                {/* <section className="">
                    <img className="w-1/8" src="/images/u-official.webp" alt="A picture of the arknights operator u-official" />
                </section> */}
                <h1>Guessing Page</h1>

            </section>
            {console.log(correctAnswer)}

            <section className="grid grid-cols-2 gap-4">
                <AnswerBlock answer={correctAnswer}  />
                <AnswerBlock />
                <AnswerBlock />
                <AnswerBlock />
            </section>
        </div>
    );
}