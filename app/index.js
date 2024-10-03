import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { registerRootComponent } from "expo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const MainImagePath = require("../assets/images/logo2.png");
const backgroundImage = require("../assets/images/background.jpg");

SplashScreen.preventAutoHideAsync();

export default function index() {
  const [getName, setName] = useState(null);
  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");
  const [loaded, error] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  useEffect(() => {
    async function CheckUser() {
      try {
        let userJson = await AsyncStorage.getItem("user");
        if (userJson != null) {
          router.replace("/home");
        }
      } catch (error) {
        console.log(error);
      }
    }
    CheckUser();
  }, []
  );

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={Stylesheet.backgroundimage}
    >
      <ScrollView>
        <View style={Stylesheet.view1}>
          <Image source={MainImagePath} style={Stylesheet.mainimage} />
          <Text style={Stylesheet.text1}>Sign In</Text>
          <Text style={Stylesheet.text2}>
            Let's Pretend like a real super Hero!!
          </Text>

          <View style={Stylesheet.avatar}>
            <Text style={Stylesheet.text5}>{getName}</Text>
          </View>
          <Text style={Stylesheet.text2}>Mobile Number</Text>
          <TextInput
            style={Stylesheet.input1}
            inputMode={"tel"}
            maxLength={10}
            onChangeText={(text) => {
              setMobile(text);
            }}
            onEndEditing={async () => {
              if (getMobile.length == 10) {
                let response = await fetch(
                  "https://af6f-112-134-136-206.ngrok-free.app/SupeChat/GetName?mobile=" +
                  getMobile
                );
                if (response.ok) {
                  let json = await response.json();
                  setName(json.letters);
                }
              }
            }}
          />

          <Text style={Stylesheet.text2}>Password</Text>
          <TextInput
            style={Stylesheet.input1}
            secureTextEntry={true}
            inputMode={"text"}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />

          <Pressable
            style={Stylesheet.pressable1}
            onPress={async () => {
              try {
                let formData = new FormData();

                formData.append("mobile", getMobile);
                formData.append("password", getPassword);

                let response = await fetch(
                  "https://af6f-112-134-136-206.ngrok-free.app/SupeChat/SignIn",
                  {
                    method: "POST",
                    body: JSON.stringify({
                      mobile: getMobile,
                      password: getPassword,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (response.ok) {
                  // Check if the response body has content before parsing
                  let responseText = await response.text();
                  if (responseText) {
                    let json = JSON.parse(responseText);
                    if (json.success) {
                      let user = json.user;

                      try {
                        await AsyncStorage.setItem(
                          "user",
                          JSON.stringify(user)
                        );
                        router.replace("/home");
                      } catch (error) {
                        console.log(error);
                      }
                    } else {
                      Alert.alert("Error", json.message);
                    }
                  } else {
                    Alert.alert("Error", "Empty response from server");
                  }
                } else {
                  Alert.alert("Error", `Response status: ${response.status}`);
                }
              } catch (error) {
                Alert.alert("Error", "Failed to fetch: " + error.message);
              }
            }}
          >
            <FontAwesome6 name={"right-to-bracket"} size={18} color={"white"} />
            <Text style={Stylesheet.text4}>Sign In Here</Text>
          </Pressable>

          <Pressable
            style={Stylesheet.pressable2}
            onPress={() => {
              // Alert.alert("Testing", "SignUp");
              router.replace("/signup");
            }}
          >
            <Text style={Stylesheet.text3}>New Member? Create an Account</Text>
          </Pressable>
        </View>
      </ScrollView>
      <StatusBar style="dark" hidden />
    </ImageBackground>
  );
}

// registerRootComponent(SignIn);

const Stylesheet = StyleSheet.create({
  view1: {
    rowGap: 13,
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  text1: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#007FFF",
    fontFamily: "Montserrat-Bold",
  },

  text2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Montserrat-Medium",
  },

  text3: {
    fontSize: 14,
    color: "#007FFF",
    fontFamily: "Montserrat-SemiBold",
  },

  text4: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "white",
  },

  text5: {
    fontSize: 25,
    fontFamily: "Montserrat-Bold",
    color: "white",
    alignSelf: "center",
    justifyContent: "center",
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
    paddingHorizontal: 10,
    justifyContent: "center",
  },

  pressable1: {
    backgroundColor: "#007FFF",
    height: 40,
    borderRadius: 12,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 10,
  },

  pressable2: {
    backgroundColor: "black",
    height: 32,
    borderRadius: 12,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 8,
  },

  mainimage: {
    alignSelf: "center",
    marginBottom: 7,
    marginTop: 40,
    height: 175,
    width: 300,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    borderStyle: "solid",
    borderColor: "#007FFF",
    borderWidth: 2,
    alignSelf: "center",
    marginTop: 5,
  },
});

// ngrok http http://localhost:8080
