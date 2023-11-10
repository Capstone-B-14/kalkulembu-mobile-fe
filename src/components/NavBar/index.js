import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useUser } from "../../contexts/UserContext";
import { View, Text, TouchableOpacity } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../../screens/HomeScreen";
import CameraScreen from "../../screens/CameraScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import SapiScreen from "../../screens/SapiScreen";

const Tab = createBottomTabNavigator();

const TabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // add any style you want for your tab button here
      }}
      activeOpacity={0.5} // The opacity change on touch
    >
      {children}
    </TouchableOpacity>
  );
};

const NavBar = () => {
  const { userData, isAuthenticated } = useUser();
  // console.log(`UserData: ${userData} and isAuth: ${isAuthenticated}`);

  useEffect(() => {
    // console.log(`UserData: ${userData} and isAuth: ${isAuthenticated}`);
  }, [userData, isAuthenticated]);

  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        tabBarActiveTintColor: "#2E78A6",
        tabBarInactiveTintColor: "#0D0D0D",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 65, // Set the height you want
          padding: 0, // Adjust padding to align icons and text properly
          backgroundColor: '#ffffff', // Set background color or use your theme color
        },
      }}
    >
      {isAuthenticated && userData ? (
        <>
          <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Icon name='home' color={color} size={30} />
              ),
              tabBarButton: (props) => <TabBarButton {...props} />,
            }}
          />

          <Tab.Screen
            name='Daftar Sapi'
            component={SapiScreen}
            options={{
              tabBarLabel: "Daftar Sapi",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcon name='cow' color={color} size={30} />
              ),
              tabBarButton: (props) => <TabBarButton {...props} />,
            }}
          />

          <Tab.Screen
            name='Kamera'
            component={CameraScreen}
            options={{
              tabBarLabel: "Kamera",
              tabBarIcon: ({ color, size }) => (
                <IonIcon name='camera-outline' color={color} size={30} />
              ),
              tabBarButton: (props) => <TabBarButton {...props} />,
            }}
          />

          <Tab.Screen
            name='Profil'
            component={ProfileScreen}
            options={{
              tabBarLabel: "Profil",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcon name='account-outline' color={color} size={30} />
              ),
              tabBarButton: (props) => <TabBarButton {...props} />,
            }}
          />
        </>
      ) : ( // If user is not authenticated
        <>
          <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Icon name='home' color={color} size={30} />
              ),
              tabBarButton: (props) => <TabBarButton {...props} />,
            }}
          />

          <Tab.Screen
            name='Daftar Sapi'
            component={SapiScreen}
            options={{
              tabBarLabel: "Daftar Sapi",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcon name='cow' color={color} size={30} />
              ),
              tabBarButton: (props) => <TabBarButton {...props} />,
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};
export default NavBar;
