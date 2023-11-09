import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import CameraScreen from "./src/screens/CameraScreen";
import CameraResult from "./src/screens/CameraResult";
import SapiScreen from "./src/screens/SapiScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import EditPhotoScreen from "./src/screens/ProfileScreen/EditPhotoScreen";
import ImageViewerScreen from "./src/screens/ImageViewerScreen";
import Login from "./src/screens/LoginScreen";
import NavBar from "./src/components/NavBar";
import SignupUser from "./src/screens/SignupUser";
import SignupPeternakan from "./src/screens/SignupPeternakan";
import { UserProvider } from "./src/contexts/UserContext";

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
          Raleway: require("./assets/fonts/Raleway/static/Raleway-Regular.ttf"),
          "Raleway-Bold": require("./assets/fonts/Raleway/static/Raleway-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='NavBar'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name='NavBar' component={NavBar} />
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{ title: "Home" }}
          />
          <Stack.Screen
            name='Camera'
            component={CameraScreen}
            options={{ title: "Camera", unmountOnBlur: true }}
          />
          <Stack.Screen
            name='CameraResult'
            component={CameraResult}
            options={{ title: "Camera Result" }}
          />
          <Stack.Screen
            name='Sapi'
            component={SapiScreen}
            options={{ title: "Sapi" }}
          />
          <Stack.Screen
            name='Profile'
            component={ProfileScreen}
            options={{ title: "Profile" }}
          />
          <Stack.Screen
            name='EditPhotoScreen'
            component={EditPhotoScreen}
            options={{ title: "Edit Photo Screen" }}
          />
          <Stack.Screen
            name='ImageViewerScreen'
            component={ImageViewerScreen}
            options={{ title: "Image Viewer Screen" }}
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name='Sign Up User'
            component={SignupUser}
            options={{ title: "Sign Up User" }}
          />
          <Stack.Screen
            name='Sign Up Peternakan'
            component={SignupPeternakan}
            options={{ title: "Sign Up Peternakan" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
