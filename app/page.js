"use client";
export default function HomePage() {
  return (
    <div className="bg-blue-950 w-screen h-screen text-white p-5 flex flex-col items-center justify-center">
      <section className="flex flex-col items-center justify-center">
        <img className="w-1/2" src="/images/u-official.webp" alt="A picture of the arknights operator u-official" />
        <h1 className="text-4xl">Welcome to Arknights Music Guesser!</h1>
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-12 rounded text-2xl mt-10 cursor-pointer"
          onClick={() => window.location.href = "/pre-guessing-page"}
        >
          Play
        </button>
      </section>
    </div>
  );
}