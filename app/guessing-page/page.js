"use client";

import AnswerBlock from "@/_components/answer-block";
import { useState, useMemo, useEffect } from "react";
import songs from "../../public/song-metadata/songs.json";
import albums from "../../public/song-metadata/albums.json";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../../custom-audio-player.css";


export default function GuessingPage({ setIsGameStarted, setRestartGame, isEnglishOnly }) {
    const [answerSelected, setAnswerSelected] = useState(false);
    const [correctAnswerData, setCorrectAnswerData] = useState(null);
    const [isArtHintToggled, setIsArtHintToggled] = useState(true);

    const filteredSongs = useMemo(() => {
        if (isEnglishOnly) {
            return songs.filter((s) => !/[\u4E00-\u9FFF]/.test(s.name));
        }
        return songs;
    }, [isEnglishOnly]);

    // Pick a random correct answer
    const correctAnswer = useMemo(() => {
        return filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
    }, [filteredSongs]);

    // Pick 3 wrong answers and shuffle all 4
    const shuffledAnswers = useMemo(() => {
        const wrongs = filteredSongs
            .filter((s) => s.cid !== correctAnswer.cid)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
        return [correctAnswer, ...wrongs].sort(() => 0.5 - Math.random());
    }, [correctAnswer, filteredSongs]);

    const handleAnswerSelected = () => setAnswerSelected(true);

    const correctAlbumCover = albums.find((a) => a.cid === correctAnswer.albumCid).coverUrl;

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
            {correctAlbumCover && correctAnswerData?.data?.sourceUrl && (
                <section className="w-full pb-5 flex items-center justify-center">
                    <img className="w-2/5 rounded-md" src={isArtHintToggled ? `/api/fetch-album-art?albumLink=${correctAlbumCover}` : null} alt="a random album cover" ></img>
                </section>
            )}

            <section className="w-full">
                {correctAnswerData?.data?.sourceUrl && (
                    <AudioPlayer
                        src={correctAnswerData.data.sourceUrl}
                        // src={null}
                        autoPlay
                        volume={0.2}
                        showJumpControls={false}
                        hasDefaultKeyBindings={false}
                    />
                )}
            </section>
            {correctAnswerData && (
                <section className="grid grid-cols-2 gap-4 w-full">
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
