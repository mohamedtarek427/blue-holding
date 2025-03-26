import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the expected structure of a User

// Cache key for localStorage
const topPerformers_CACHE_KEY = "topPerformersCache";

// Function to fetch topPerformers from the server
const fetchtopPerformers = async (): Promise<any[]> => {
  const response = await axios.get<any[]>(
    "http://localhost:5000/top-performers"
  );
  return response.data;
};

// Function to get cached topPerformers if they are less than 7 days old
const getCachedtopPerformers = (): any[] | null => {
  const cachedData = localStorage.getItem(topPerformers_CACHE_KEY);
  if (!cachedData) return null;

  const { timestamp, data } = JSON.parse(cachedData);
  const now = new Date().getTime();
  const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  // Check if the cached data is less than 7 days old
  if (now - timestamp < sevenDaysInMillis) {
    return data;
  }

  // If the data is stale, clear the cache
  localStorage.removeItem(topPerformers_CACHE_KEY);
  return null;
};

// Function to cache topPerformers with a timestamp
const cachetopPerformers = (topPerformers: any[]) => {
  const cache = {
    timestamp: new Date().getTime(), // Current timestamp
    data: topPerformers,
  };
  localStorage.setItem(topPerformers_CACHE_KEY, JSON.stringify(cache));
};

// Main hook to fetch topPerformers with caching
const useGetTopPerformers = () => {
  return useQuery<any[]>({
    queryKey: ["top-performers"],
    queryFn: async () => {
      // Try to get cached topPerformers first
      const cachedtopPerformers = getCachedtopPerformers();
      if (cachedtopPerformers) {
        return cachedtopPerformers;
      }
      try {
        const topPerformers = await fetchtopPerformers();
        cachetopPerformers(topPerformers); 
        return topPerformers;
      } catch (error) {
        throw new Error(
          "Unable to fetch topPerformers and no valid cached data available."
        );
      }
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
};

export default useGetTopPerformers;
