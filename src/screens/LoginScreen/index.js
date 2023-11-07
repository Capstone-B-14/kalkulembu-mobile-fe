import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/Button";
import { useUser } from "../../contexts/UserContext";
import axiosInstance from '../../utils/axios';

const Login = () => {
  const navigation = useNavigation();
  const { userData, setUserTokenAuth, setUserProfileData } = useUser();
  const [loading, setLoading] = useState(false);
  const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    return [
      values,
      (field, value) => {
        setValues({
          ...values,
          [field]: value,
        });
      }
    ];
  };

  const [form, setFormValue] = useForm({
    email: '',
    password: '',
  });

  const loginURL = "/auth/login";

  const handleSignUp = () => {
    navigation.navigate("Sign Up User");
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const loginData = {
        email: form.email,
        password: form.password,
      };

      const response = await axiosInstance.post(loginURL, loginData);

      if (response.status == 200) {
        setUserTokenAuth(response.data.user, response.data.accessToken);
        await fetchUserData();
        navigation.navigate("NavBar");
      } else {
        console.error("Login gagal: ", response.data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Terjadi error: ", error);
      setLoading(false);
    }
  };

  const handleDevLogin = async () => {
    setLoading(true);
    try {
      const devLoginData = {
        email: process.env.REACT_APP_DEV_LOGIN,
        password: process.env.REACT_APP_DEV_PASS
      };

      const response = await axiosInstance.post(loginURL, devLoginData);

      if (response.status == 200) {
        setUserTokenAuth(response.data.user, response.data.accessToken);
        await fetchUserData();
        navigation.navigate("NavBar");
      } else {
        console.error("Login gagal: ", response.data.error);
        setLoading(false);
      }

    } catch (error) {
      console.error("Dev login error: ", error);
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      console.log("Fetching user data...");
      const apiURL = "/auth/profile";
      const response = await axiosInstance.post(apiURL);

      if (response.status == 200) {
        setUserProfileData(response.data.data.user);
      } else {
        console.error("What is profile data? ", response.data.error);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };


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
            style={styles.textinput}
            onChangeText={(text) => setFormValue('email', text)}
            value={form.email}
            placeholder='Email'
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
            style={styles.textinput}
            onChangeText={(text) => setFormValue('password', text)}
            value={form.password}
            placeholder='Password'
            keyboardType='default'
            secureTextEntry
          />
        </View>
      </View>
      <Pressable onPress={""} style={styles.lupa}>
        <Text className='text-white'>Lupa Password?</Text>
      </Pressable>
      <View style={styles.buttonroot}>
        {loading ? (
          <ActivityIndicator size='large' color='#FFDF64' />
        ) : (
          <>
            <CustomButton
              style={styles.login}
              text='Masuk'
              backgroundColor='#FFDF64'
              textColor='#000'
              onPress={handleLogin}
            />
            <Text style={styles.atau}>atau</Text>
            <CustomButton
              style={styles.buatakun}
              text='Buat Akun Baru'
              backgroundColor='#FFDF64'
              textColor='#000'
              onPress={handleSignUp}
            />
            <CustomButton
              style={styles.devlogin}
              text='Dev Login'
              backgroundColor='#FFDF64'
              textColor='#000'
              onPress={handleDevLogin}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#2E78A6",
  },
  buttonroot: {
    flex: 1,
    alignItems: "center",
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
  textinput: {
    height: 60,
    marginHorizontal: 10,
    width: "80%",
    borderRadius: 10,
    fontSize: 16,
    color: "#000",
  },
  lupa: {
    Color: "#FBFBFB",
    alignSelf: "flex-end",
    paddingRight: 40,
    marginTop: -15,
    marginBottom: 15,
  },
  atau: {
    alignSelf: "center",
    marginVertical: 15,
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
  login: {
    width: "90%",
    flex: 0,
    borderRadius: 10,
  },
  devlogin: {
    width: "69%",
    flex: 0,
    borderRadius: 0,
    marginTop: 10,
  },
  buatakun: {
    width: "90%",
    flex: 0,
    borderRadius: 10,
  },
});

export default Login;
