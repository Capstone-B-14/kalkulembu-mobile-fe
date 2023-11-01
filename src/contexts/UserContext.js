import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

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
        const storedUser = await SecureStore.getItemAsync("userLogin");
        const storedToken = await SecureStore.getItemAsync("accessToken");

        if (storedToken) {
          setUserLogin(storedUser);
          setToken(storedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error loading data from SecureStore: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadDataFromStorage();
  }, []);

  const setUserTokenAuth = async (user, token) => {
    try {
      await SecureStore.setItemAsync("userLogin", JSON.stringify(user));
      await SecureStore.setItemAsync("accessToken", token);

      setUserLogin(JSON.stringify(user));
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error storing user login and token: ", error);
    }
  };

  useEffect(() => {
    // console.log(`UserData: ${userData} and isAuth: ${isAuthenticated}`);
  }, [userData, isAuthenticated]);

  const setUserProfileData = async (profile) => {
    try {
      await SecureStore.setItemAsync("userData", JSON.stringify(profile));
      setUserData(JSON.stringify(profile));
    } catch (error) {
      console.error("Error setting user profile: ", error);
    }
  };

  const clearUserTokenAuth = async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");

      setUserLogin("");
      setUserData("");
      setToken("");
      setIsAuthenticated(false);
      // console.log("GET CLEARED LOL");
    } catch (error) {
      console.error("Error clearing data from SecureStore: ", error);
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
