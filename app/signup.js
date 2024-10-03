import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as ImagePicker from "expo-image-picker";
// import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const MainImagePath = require("../assets/images/logo2.png");
const backgroundImage = require("../assets/images/background.jpg");
const addImage = require("../assets/images/camera.png");
const blurhash = "L02FMz00=eyGLNmi%5Fy4,^TB=zm";

SplashScreen.preventAutoHideAsync();

export default function signup() {
  const [getImage, setImage] = useState(null);
  const [getMobile, setMobile] = useState("");
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getPassword, setPassword] = useState("");

  const [loaded, error] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
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
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={Stylesheet.backgroundimage}
    >
      <ScrollView>
        <View style={Stylesheet.view1}>
          <Image source={MainImagePath} style={Stylesheet.mainimage} />
          <Text style={Stylesheet.text1}>Get Started Now </Text>
          <Text style={Stylesheet.text2}>
            Join with Us & Let's have a SupeChat !!
          </Text>

          <Pressable
            onPress={async () => {
              let result = await ImagePicker.launchImageLibraryAsync({});
              if (!result.canceled) {
                setImage(result.assets[0].uri);
              }
            }}
          >
            <Image
              source={getImage}
              style={Stylesheet.avatar}
              placeholder={{ blurhash }}
              contentFit={"cover"}
            />
          </Pressable>

          <Text style={Stylesheet.text2}>Mobile Number</Text>
          <TextInput
            style={Stylesheet.input1}
            inputMode={"tel"}
            maxLength={10}
            onChangeText={(text) => {
              setMobile(text);
            }}
          />

          <Text style={Stylesheet.text2}>First Name</Text>
          <TextInput
            style={Stylesheet.input1}
            inputMode={"text"}
            onChangeText={(text) => {
              setFirstName(text);
            }}
          />

          <Text style={Stylesheet.text2}>Last Name</Text>
          <TextInput
            style={Stylesheet.input1}
            inputMode={"text"}
            onChangeText={(text) => {
              setLastName(text);
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
              let formData = new FormData();

              formData.append("mobile", getMobile);
              formData.append("firstName", getFirstName);
              formData.append("lastName", getLastName);
              formData.append("password", getPassword);
              if (getImage != null) {
                formData.append("avatarImage", {
                  name: "avatar.png",
                  type: "image/png",
                  uri: getImage,
                });
              }

              let response = await fetch(
                "https://af6f-112-134-136-206.ngrok-free.app/SupeChat/SignUp",
                {
                  method: "POST",
                  body: formData,
                }
              );
              if (response.ok) {
                let json = await response.json();
                if (json.success) {
                  //user Registration Complete
                  // Alert.alert("Success", json.message);
                  router.replace("/");
                } else {
                  Alert.alert("Error", json.message);
                }
              }
            }}
          >
            <FontAwesome6 name={"right-to-bracket"} size={18} color={"white"} />
            <Text style={Stylesheet.text4}>Create Account</Text>
          </Pressable>

          <Pressable
            style={Stylesheet.pressable2}
            onPress={() => {
              // Alert.alert("Testing", "SignIn");
              router.replace("/");
            }}
          >
            <Text style={Stylesheet.text3}>Already a Member? Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
      <StatusBar style="dark" hidden />
    </ImageBackground>
  );
}
// registerRootComponent(SignUp);

const Stylesheet = StyleSheet.create({
  view1: {
    justifyContent: "center",
    rowGap: 10,
    paddingHorizontal: 10,
  },

  text1: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#007FFF",
    fontFamily: "Montserrat-Bold",
  },

  text2: {
    fontSize: 15,
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

  input1: {
    width: "100%",
    height: 30,
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
    justifyContent: "center",
    rowGap: 10,
    paddingHorizontal: 10,
  },

  pressable1: {
    backgroundColor: "#007FFF",
    height: 35,
    borderRadius: 12,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 8,
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
    marginBottom: 5,
    marginTop: 20,
    height: 120,
    width: 200,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    borderStyle : "solid",
    borderColor : "#007FFF",
    borderWidth : 3,
    alignSelf: "center",
    marginTop: 5,
  },
});
