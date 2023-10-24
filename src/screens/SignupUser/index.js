import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";

const SignupUser = ({ onPress }) => {
  const navigation = useNavigation();

  const [namalengkap, setNamalengkap] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasipassword, setKonfirmasipassword] = useState("");

  return (
    <View style={styles.root}>
      <View style={styles.atas}>
        <Image
          source={require("../../../assets/kalkulembu-logo.png")}
          style={styles.logo}
          resizeMode='contain'
        />
        <Text style={styles.kalku}>Kalkulembu</Text>
      </View>
      <Text style={styles.daftar}>Daftar Akun</Text>
      <Text style={styles.selamat}>Masukkan data diri Anda</Text>
      <View style={styles.input}>
        <View style={styles.inputuser}>
          <Image
            source={require("../../../assets/user-logo.png")}
            style={styles.logouser}
            resizeMode='contain'
          ></Image>
          <TextInput
            style={styles.user}
            onChangeText={setNamalengkap}
            value={namalengkap}
            placeholder='Masukkan Nama Lengkap'
            keyboardType='default'
          />
        </View>
        <View style={styles.inputemail}>
          <Image
            source={require("../../../assets/email-logo.png")}
            style={styles.logoemail}
            resizeMode='contain'
          ></Image>
          <TextInput
            style={styles.email}
            onChangeText={setEmail}
            value={email}
            placeholder='Masukkan Email'
            keyboardType='email-address'
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
            onChangeText={setPassword}
            value={password}
            placeholder='Password'
            secureTextEntry
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
            onChangeText={setKonfirmasipassword}
            value={konfirmasipassword}
            placeholder='Password'
            secureTextEntry
          />
        </View>
      </View>
      <CustomButton
        style={styles.buttonlanjut}
        text='Lanjutkan'
        backgroundColor='#FFDF64'
        textColor='#000'
        routeName='SignupPeternakan'
        navigation={navigation}
      />
      <Pressable onPress={onPress} style={styles.login}>
        <Text className='text-white'>Saya sudah memiliki akun</Text>
      </Pressable>
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
    paddingTop: 30,
    alignSelf: "center",
    fontSize: 25,
    color: "#FBFBFB",
    paddingBottom: 30,
  },
  selamat: {
    color: "#FBFBFB",
    fontSize: 20,
    paddingLeft: 40,
  },
  daftar: {
    color: "#FBFBFB",
    fontSize: 38,
    paddingLeft: 40,
    fontWeight: "bold",
    marginBottom: -2,
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
  user: {
    height: 30,
    padding: 20,
    margin: 10,
    marginLeft: -1,
    width: "80%",
    borderRadius: 10,
    fontSize: 16,
  },
  input: {
    backgroundColor: "#80ACC8",
    borderRadius: 10,
    margin: 30,
  },
  inputemail: {
    backgroundColor: "#FDFDFD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
    marginTop: -1,
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
  inputuser: {
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
  logouser: {
    opacity: 0.5,
  },
  buttonlanjut: {
    paddingTop: 5,
  },
  login: {
    alignSelf: "flex-end",
    paddingRight: 40,
    color: "#FBFBFB",
    marginTop: 15,
    marginBottom: 15,
  },
});

export default SignupUser;
