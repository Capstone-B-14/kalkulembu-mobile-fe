import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDataFromStorage = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        const storedToken = await AsyncStorage.getItem("token");

        // console.log(storedUserData);
        // console.log(storedToken);

        if (storedUserData && storedToken) {
          setUserData(JSON.parse(storedUserData));
          setToken(storedToken);
          // console.log("User data loaded from AsyncStorage:", storedUserData);
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadDataFromStorage();
  }, []);

  const setUserAndToken = async (user, token) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);

      setUserData(user);
      setToken(token);
    } catch (error) {
      console.error("Error storing data in AsyncStorage: ", error);
    }
  };

  const clearUserAndToken = async () => {
    try {
      // Remove user data and token from AsyncStorage
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("token");

      // Update state
      setUserData(null);
      setToken(null);
      // console.log("User data and token cleared.");
    } catch (error) {
      console.error("Error clearing data from AsyncStorage: ", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ userData, setUserData, token, setUserAndToken, clearUserAndToken }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
