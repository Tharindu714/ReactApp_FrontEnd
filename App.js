import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ImageBackground,
} from "react-native";
import { Pressable, ScrollView } from "react-native";
import { Alert } from "react-native";
import { Image } from "expo-image";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as ImagePicker from "expo-image-picker";

const MainImagePath = require("./assets/images/logo2.png");
const backgroundImage = require("./assets/images/background.jpg");
const addImage = require("./assets/images/camera.png");
const blurhash ='LGF5?xYk^6#M@-5c,1J5@[or[Q6.';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [getImage, setImage] = useState(null);

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
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={Stylesheet.backgroundimage}
    >
      <ScrollView>
        <View style={Stylesheet.view1}>
          <Image source={MainImagePath} style={Stylesheet.mainimage} />
          <Text style={Stylesheet.text1}>Create a new account</Text>
          <Text style={Stylesheet.text2}>
            Join with Us & Let's Start the Conversation !!
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
          <TextInput style={Stylesheet.input1} inputMode={"tel"} />

          <Text style={Stylesheet.text2}>First Name</Text>
          <TextInput style={Stylesheet.input1} inputMode={"text"} />

          <Text style={Stylesheet.text2}>Last Name</Text>
          <TextInput style={Stylesheet.input1} inputMode={"text"} />

          <Text style={Stylesheet.text2}>Password</Text>
          <TextInput
            style={Stylesheet.input1}
            secureTextEntry={true}
            inputMode={"text"}
          />

          <Pressable
            style={Stylesheet.pressable1}
            onPress={() => {
              Alert.alert("Testing", "SignUp");
            }}
          >
            <FontAwesome6 name={"right-to-bracket"} size={18} color={"white"} />
            <Text style={Stylesheet.text4}>Create Account</Text>
          </Pressable>

          <Pressable
            style={Stylesheet.pressable2}
            onPress={() => {
              Alert.alert("Testing", "SignIn");
            }}
          >
            <Text style={Stylesheet.text3}>Already a Member? Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

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
    backgroundColor: "#007FFF",
    alignSelf: "center",
    marginTop: 5,
  },
});
