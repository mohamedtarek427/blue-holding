import { GameGrid } from "@/components/game-grid";
import React from "react";

const GamesSection = () => {
  return (
    <>
      <section className="mt-24">
        <h2 className="text-4xl font-bold text-center mb-8 text-darkGray">
          Unlock the Secrets of the Competition!
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-5xl mx-auto text-xl">
          Each level is a new room in the escape challenge, filled with
          mysteries and puzzles from the Competition Guide. Answer the
          questions, solve the clues, and progress to the next stage. Are you
          ready to escape?
        </p>
        <GameGrid />
      </section>
    </>
  );
};

export default GamesSection;
