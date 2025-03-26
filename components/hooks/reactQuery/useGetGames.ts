// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// // Define the expected structure of a Game
// interface Game {
//   title: string;
//   image: string;
//   description: string;
//   isLocked?: boolean;
//   unlockDate?: string;
//   availableAt: Date; // availableAt is a Date object
//   id?: string;
// }

// // Cache key for localStorage
// const GAMES_CACHE_KEY = "gamesCache";

// // Function to fetch games from the server
// const fetchGames = async (): Promise<Game[]> => {
//   const response = await axios.get<Game[]>("http://localhost:5000/games");
//   return response.data.map((game) => ({
//     ...game,
//     availableAt: new Date(game.availableAt), // Convert availableAt to Date
//   }));
// };

// // Function to get cached games if they are less than 7 days old
// const getCachedGames = (): Game[] | null => {
//   const cachedData = localStorage.getItem(GAMES_CACHE_KEY);
//   if (!cachedData) return null;

//   const { timestamp, data } = JSON.parse(cachedData);
//   const now = new Date().getTime();
//   const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

//   // Check if the cached data is less than 7 days old
//   if (now - timestamp < sevenDaysInMillis) {
//     return data.map((game: Game) => ({
//       ...game,
//       availableAt: new Date(game.availableAt), // Ensure availableAt is a Date
//     }));
//   }

//   // If the data is stale, clear the cache
//   localStorage.removeItem(GAMES_CACHE_KEY);
//   return null;
// };

// // Function to cache games with a timestamp
// const cacheGames = (games: Game[]) => {
//   const cache = {
//     timestamp: new Date().getTime(), // Current timestamp
//     data: games,
//   };
//   localStorage.setItem(GAMES_CACHE_KEY, JSON.stringify(cache));
// };

// // Main hook to fetch games with caching
// const useGetGames = () => {
//   return useQuery<Game[]>({
//     queryKey: ["games"],
//     queryFn: async () => {
//       // Try to get cached games first
//       const cachedGames = getCachedGames();
//       if (cachedGames) {
//         return cachedGames;
//       }

//       // If no valid cache, fetch fresh data from the server
//       try {
//         const games = await fetchGames();
//         cacheGames(games); // Cache the fresh data
//         return games;
//       } catch (error) {
//         throw new Error("Unable to fetch games and no valid cached data available.");
//       }
//     },
//     staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
//   });
// };

// export default useGetGames;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the expected structure of a Game
interface Game {
  title: string;
  image: string;
  description: string;
  isLocked?: boolean;
  unlockDate?: string;
  availableAt: Date;
  id?: string;
}

// Function to fetch games from the server
const fetchGames = async (): Promise<Game[]> => {
  const response = await axios.get<Game[]>("http://localhost:5000/games");
  return response.data.map((game) => ({
    ...game,
    availableAt: new Date(game.availableAt),
  }));
};

// Main hook to fetch games without caching
const useGetGames = () => {
  return useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: fetchGames,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
};

export default useGetGames;
