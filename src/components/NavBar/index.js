import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useUser } from "../../contexts/UserContext";
import { View, Text, TouchableOpacity } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../../screens/HomeScreen";
import CameraScreen from "../../screens/CameraScreen";
import SapiScreen from "../../screens/SapiScreen";
import ProfileScreen from "../../screens/ProfileScreen";

import Icon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import DetailSapi from "../../screens/DetailSapi";
import EditSapi from "../../screens/EditSapi/EditSapi";
import CRUDSapi from "../../screens/CRUDSapi/CRUDSapi";

const Tab = createBottomTabNavigator();

function NavBar() {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        tabBarActiveTintColor: "#2E78A6",
        tabBarInactiveTintColor: "#0D0D0D",
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name='Daftar Sapi'
        component={CRUDSapi}
        options={{
          tabBarLabel: "Daftar Sapi",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name='cow' color={color} size={30} />
          ),
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
        }}
      />
    </Tab.Navigator>
  );
}
export default NavBar;
