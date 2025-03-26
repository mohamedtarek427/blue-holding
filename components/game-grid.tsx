import { GameCard } from "./game-card";
import useGetGames from "./hooks/reactQuery/useGetGames";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export function GameGrid() {
  const { data: games, isLoading, isError } = useGetGames();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching games.</p>;

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games?.map((game: any, index: number) => (
        <div className="flex items-center justify-center gap-3" key={index}>
          <GameCard
            {...game}
            availableAt={new Date(game.availableAt).toLocaleDateString("en-GB")}
          />
          {/* Hide "xxx" on every third column */}
          {(index + 1) % 3 !== 0 && (
            <MdKeyboardDoubleArrowRight className="text-gray-200" size={45} />
          )}
        </div>
      ))}
    </ul>
  );
}
