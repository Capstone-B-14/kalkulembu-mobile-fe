import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import LoginButton from "../../components/LoginButton";
import BuatAkun from "../../components/BuatAkun";

const Login = ({ onPress }) => {
  const [text, onChangeText] = useState("Useless Text");
  const [number, onChangeNumber] = useState("");
  return (
    <View style={styles.root}>
      <View style={styles.atas}>
        <Image
          source={require("../../../assets/kalkulembu-logo.png")}
          style={styles.logo}
          resizeMode='contain'
        ></Image>
        <Text style={styles.kalku}>Kalkulembu</Text>
      </View>
      <Text style={styles.masuk}>MASUK</Text>
      <Text style={styles.selamat}>Selamat datang di Kalkulembu</Text>
      <View style={styles.inputan}>
        <View style={styles.inputanemail}>
          <Image
            source={require("../../../assets/email-logo.png")}
            style={styles.logoemail}
            resizeMode='contain'
          ></Image>
          <TextInput
            style={styles.email}
            onChangeText={onChangeNumber}
            value={number}
            placeholder='Email'
            keyboardType='alphabet'
          />
        </View>
        <View style={styles.inputpassword}>
          <Image
            source={require("../../../assets/password-logo.png")}
            style={styles.logopassword}
            resizeMode='contain'
          ></Image>
          <TextInput
            style={styles.password}
            onChangeText={onChangeNumber}
            value={number}
            placeholder='Password'
            keyboardType='alphabet'
          />
        </View>
      </View>
      <Pressable onPress={onPress} style={styles.lupa}>
        <Text>Lupa Password?</Text>
      </Pressable>
      <LoginButton />
      <Text style={styles.atau}>atau</Text>
      <BuatAkun />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#2E78A6",
  },
  atas: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "15%",
    alignSelf: "center",
    marginRight: 8,
  },
  kalku: {
    paddingTop: 40,
    alignSelf: "center",
    fontSize: 25,
    color: "#FBFBFB",
    paddingBottom: 30,
  },
  masuk: {
    color: "#FBFBFB",
    fontSize: 38,
    paddingTop: 40,
    paddingLeft: 40,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selamat: {
    color: "#FBFBFB",
    fontSize: 20,
    paddingLeft: 40,
  },
  email: {
    height: 30,
    padding: 20,
    margin: 10,
    marginLeft: -1,
    width: "80%",
    borderRadius: 10,
    fontSize: 16,
  },
  password: {
    height: 30,
    padding: 20,
    margin: 10,
    marginLeft: -1,
    width: "80%",
    borderRadius: 10,
    fontSize: 16,
  },
  lupa: {
    alignSelf: "flex-end",
    paddingRight: 40,
    color: "#FBFBFB",
    marginTop: -15,
    marginBottom: 15,
  },
  atau: {
    alignSelf: "center",
    marginTop: 15,
    color: "#FBFBFB",
    fontSize: 16,
  },
  inputan: {
    backgroundColor: "#80ACC8",
    borderRadius: 10,
    margin: 30,
  },
  inputpassword: {
    backgroundColor: "#FDFDFD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
    marginTop: -1,
  },
  inputanemail: {
    backgroundColor: "#FDFDFD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
  },
  logopassword: {
    opacity: 0.5,
    height: 23,
  },
  logoemail: {
    opacity: 0.5,
  },
});

export default Login;
