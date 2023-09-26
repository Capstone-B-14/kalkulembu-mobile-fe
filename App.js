import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Login from './src/screens/Login';
import SapiPageDetail from "./src/screens/SapiPageDetail";
 

export default function App() {
  return (
    <View style={styles.container}>
      
      <SapiPageDetail />
      <StatusBar style='auto' />
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});