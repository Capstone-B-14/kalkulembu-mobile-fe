import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userLogin, setUserLogin] = useState("");
  const [userData, setUserData] = useState("");
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDataFromStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const storedToken = await AsyncStorage.getItem("accessToken");

        // console.log(storedUserData);
        // console.log(storedToken);

        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true);
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
      await AsyncStorage.setItem("userLogin", JSON.stringify(user));
      await AsyncStorage.setItem("accessToken", token);

      setUserLogin(JSON.stringify(user));
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error storing user login and token: ", error);
    }
  };

  const setUserProfileData = async (profile) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(profile));

      setUserData(JSON.stringify(profile));
    } catch (error) {
      console.error("Error setting user profile: ", error);
    }
  };

  const clearUserTokenAuth = async () => {
    try {
      // Remove user data and token from AsyncStorage
      await AsyncStorage.removeItem("accessToken");

      // Update state
      setUserLogin("");
      setUserData("");
      setToken("");
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
        userLogin,
        isAuthenticated,
        setUserProfileData,
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
