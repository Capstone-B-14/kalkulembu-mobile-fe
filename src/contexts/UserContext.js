import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState("");
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
          setIsAuthenticated(true);
          console.log("User data loaded from AsyncStorage:", storedUserData);
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadDataFromStorage();
  }, []);

  const setUserTokenAuth = async (user, token) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);

      setUserData(JSON.stringify(user));
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error storing data in AsyncStorage: ", error);
    }
  };

  const clearUserTokenAuth = async () => {
    try {
      // Remove user data and token from AsyncStorage
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("token");

      // Update state
      setUserData(null);
      setToken(null);
      setIsAuthenticated(false);
      // console.log("User data and token cleared.");
    } catch (error) {
      console.error("Error clearing data from AsyncStorage: ", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        isAuthenticated,
        setUserTokenAuth,
        clearUserTokenAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
