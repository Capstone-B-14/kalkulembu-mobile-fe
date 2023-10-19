import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import CameraScreen from "./src/screens/CameraScreen";
import SapiScreen from "./src/screens/SapiScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import Login from './src/screens/LoginScreen';
import NavBar from "./src/components/NavBar";
import SignupUser from "./src/screens/SignupUser";
import SignupPeternakan from "./src/screens/SignUpPeternakan";

const Stack = createStackNavigator();

export default function App() {
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
            options={{ title: "Camera" }}
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
            name='Login'
            component={Login}
            options={{ title: "Login" }}
          />
          <Stack.Screen 
            name='Sign Up User'
            component={SignupUser}
            option={{title: "Sign Up User"}}
          />
          <Stack.Screen 
            name='Sign Up Peternakan'
            component={SignupPeternakan}
            option={{title: "Sign Up Peternakan"}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
