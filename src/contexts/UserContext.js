import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(false);

  const apiURL = process.env.REACT_APP_API_URL + "/auth/profile";
  const storedToken = AsyncStorage.getItem("token");

  console.log(apiURL);
  console.log(storedToken);

  const setUserDataAndToken = (userData, token) => {
    setUserData(userData);
    setToken(token);
  };

  const clearUserDataAndToken = () => {
    setUserData(null);
    setToken(null);
  };

  const fetchUserData = async () => {
    await axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        console.error("Error fetching user data: ", err);
      });
  };

  useEffect(() => {
    if (storedToken) {
      setToken(storedToken);
      fetchUserData();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ userData, token, setUserDataAndToken, clearUserDataAndToken }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  // const context = useContext(UserContext);
  // if (!context) {
  //   throw new Error("useUser must be used within a UserProvider");
  // }
  return useContext(UserContext);
}
