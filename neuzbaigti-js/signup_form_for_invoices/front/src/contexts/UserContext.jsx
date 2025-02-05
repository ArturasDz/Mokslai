import { createContext, useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {data:response}  = await axios.get(`${API_URL}/users/me`, {

          withCredentials: true,
        }); // Check if this is correct
        // console.log(response.data);

        setUser(response.data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []); 


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>

  );
};
