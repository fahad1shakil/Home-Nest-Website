import axios from "axios";
import { useAuth } from "./useAuth";

// This custom hook creates a secure version of Axios
const useAxiosSecure = () => {
  const { user } = useAuth(); // Get the current logged-in user

  // Create a base Axios instance with our server URL
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  });

  // Add a 'Request Interceptor' to automatically add the user's security token
  instance.interceptors.request.use(async (config) => {
    // If a user is logged in, get their Firebase ID Token
    if (user) {
      const token = await user.getIdToken();
      // Add the token to the 'Authorization' header of the request
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export default useAxiosSecure;
