import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import CustomButton from "../../components/CustomButton";

const Signup = ({ onPress }) => {
  const [namapeternakan, setNamapeternakan] = React.useState("");
  const [alamat, setAlamat] = React.useState("");
  const [nomortelepon, setNomortelepon] = React.useState("");

  return (
    <View style={styles.root}>
      <View style={styles.atas}>
        <Image
          source={require("../../../assets/kalkulembu-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.kalku}>Kalkulembu</Text>
      </View>
      <Text style={styles.daftar}>Daftar Akun</Text>
      <Text style={styles.selamat}>Masukkan data peternakan Anda</Text>
      <View style={styles.input}>
        <View style={styles.inputpeternakan}>
          <Image
            source={require("../../../assets/farm-logo.png")}
            style={styles.logopeternakan}
            resizeMode="contain"
          ></Image>
          <TextInput
            style={styles.textinput}
            onChangeText={setNamapeternakan}
            value={namapeternakan}
            placeholder="Masukkan Nama Peternakan"
            keyboardType="default"
          />
        </View>
        <View style={styles.inputlokasi}>
          <Image
            source={require("../../../assets/location-logo.png")}
            style={styles.logolokasi}
            resizeMode="contain"
          ></Image>
          <TextInput
            style={styles.textinput}
            onChangeText={setAlamat}
            value={alamat}
            placeholder="Alamat Peternakan"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputnopon}>
          <Image
            source={require("../../../assets/phone-logo.png")}
            style={styles.logonopon}
            resizeMode="contain"
          ></Image>
          <TextInput
            style={styles.textinput}
            onChangeText={setNomortelepon}
            value={nomortelepon}
            placeholder="Nomor Telepon"
            keyboardType="phone-pad"
          />
        </View>
      </View>
      <CustomButton
        style={styles.buttonlanjut}
        onPress={() => handleSignup()}
        text="Daftar"
        backgroundColor="#FFDF64"
        textColor="#000"
      />
      <Pressable onPress={onPress} style={styles.signup}>
        <Text className="text-white">Saya sudah memiliki akun</Text>
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
  input: {
    backgroundColor: "#80ACC8",
    borderRadius: 10,
    margin: 30,
  },
  inputlokasi: {
    backgroundColor: "#FDFDFD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
    marginTop: -1,
  },
  inputnopon: {
    backgroundColor: "#FDFDFD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
    marginTop: -1,
  },
  inputpeternakan: {
    backgroundColor: "#FDFDFD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
  },
  textinput: {
    height: 60,
    marginHorizontal: 10,
    width: "80%",
    borderRadius: 10,
    fontSize: 16,
    color: "#000",
  },
  logonopon: {
    opacity: 0.5,
    height: 23,
  },
  logolokasi: {
    opacity: 0.5,
  },
  logopeternakan: {
    opacity: 0.5,
  },
  buttonlanjut: {
    paddingTop: 5,
  },
  signup: {
    alignSelf: "flex-end",
    paddingRight: 40,
    color: "#FBFBFB",
    marginTop: 15,
    marginBottom: 15,
  },
});

export default Signup;