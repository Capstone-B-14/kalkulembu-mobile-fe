import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import CameraScreen from "./src/screens/CameraScreen";
import SapiScreen from "./src/screens/SapiScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import NavBar from "./src/components/NavBar";

const Stack = createStackNavigator();

export default function App() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
