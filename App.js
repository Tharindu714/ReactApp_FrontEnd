import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ImageBackground,
} from "react-native";
import { Pressable } from "react-native";
import { Alert } from "react-native";
import { Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const MainImagePath = require("./assets/images/logo2.png");
const backgroundImage = require("./assets/images/background.jpg");

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <View style={Stylesheet.view1}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={Stylesheet.backgroundimage}
      >
        <Image source={MainImagePath} style={Stylesheet.mainimage} />
        <Text style={Stylesheet.text1}>Sign In</Text>
        <Text style={Stylesheet.text2}>Welcome to Chanaka Electronics Chat Hub</Text>
        <Text style={Stylesheet.text3}>
          Please Fill your Details to Continue
        </Text>

        <Text style={Stylesheet.text2}>Mobile Number</Text>
        <TextInput style={Stylesheet.input1} inputMode={"tel"} />

        <Text style={Stylesheet.text2}>Password</Text>
        <TextInput style={Stylesheet.input1} secureTextEntry={true} />

        <Pressable
          style={Stylesheet.pressable1}
          onPress={() => {
            Alert.alert("Testing", "Success");
          }}
        >
          <FontAwesome name={"paper-plane"} size={18} color={"white"} />
          <Text style={Stylesheet.text4}>Sign In Here</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const Stylesheet = StyleSheet.create({
  view1: {
    flex: 1,
    rowGap: 13,
    justifyContent: "center",
  },

  text1: {
    fontSize: 35,
    fontWeight: "bold",
    color: "green",
    fontFamily: "Montserrat-Bold",
  },

  text2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Montserrat-Medium",
  },

  text3: {
    fontSize: 18,
    color: "yellow",
    fontFamily: "Montserrat-SemiBold",
  },

  text4: {
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    color: "white",
  },

  input1: {
    width: "100%",
    height: 36,
    borderStyle: "solid",
    borderWidth: 2,
    fontSize: 18,
    paddingStart: 10,
    borderRadius: 10,
    borderColor: "white",
    color: "white",
  },

  backgroundimage: {
    flex: 1,
    rowGap: 13,
    paddingHorizontal: 25,
    justifyContent: "center",
  },

  pressable1: {
    backgroundColor: "green",
    height: 50,
    borderRadius: 12,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 10,
  },

  mainimage: {
    alignSelf: "center",
    marginBottom: 10,
    height: 175,
    width: 300,
  },
});
