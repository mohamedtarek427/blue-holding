import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the expected structure of a User
interface User {
  name: string;
  points: number;
  avatar: string;
  position?: number;
  score?: number;
  acheivedTimePerSecond: number;
  attemptTimes: number;
  id: string;
}

// Cache key for localStorage
const USERS_CACHE_KEY = "usersCache";

// Function to fetch users from the server
const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>("http://localhost:5000/users");
  return response.data;
};
// Function to get cached users if they are less than 7 days old
const getCachedUsers = (): User[] | null => {
  const cachedData = localStorage.getItem(USERS_CACHE_KEY);
  if (!cachedData) return null;

  const { timestamp, data } = JSON.parse(cachedData);
  const now = new Date().getTime();
  const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  // Check if the cached data is less than 7 days old
  if (now - timestamp < sevenDaysInMillis) {
    return data;
  }

  // If the data is stale, clear the cache
  localStorage.removeItem(USERS_CACHE_KEY);
  return null;
};

// Function to cache users with a timestamp
const cacheUsers = (users: User[]) => {
  const cache = {
    timestamp: new Date().getTime(), // Current timestamp
    data: users,
  };
  localStorage.setItem(USERS_CACHE_KEY, JSON.stringify(cache));
};

// Main hook to fetch users with caching
const useGetUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      // Try to get cached users first
      const cachedUsers = getCachedUsers();
      if (cachedUsers) {
        return cachedUsers;
      }

      // If no valid cache, fetch fresh data from the server
      try {
        const users = await fetchUsers();
        cacheUsers(users); // Cache the fresh data
        return users;
      } catch (error) {
        throw new Error("Unable to fetch users and no valid cached data available.");
      }
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
};

export default useGetUsers;