import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { SplashScreen, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
SplashScreen.preventAutoHideAsync();
const backgroundImage = require("../assets/images/BlurBackground.jpg");

export default function chat() {
  const item = useLocalSearchParams();

  //Store Chat Array
  const [getChatArray, setChatArray] = useState([]);
  const [getChatText, setChatText] = useState([]);

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

  //Fetch chatarray from server
  useEffect(() => {
    async function fetchChatArray() {
      let userJson = await AsyncStorage.getItem("user");
      let user = JSON.parse(userJson);

      let response = await fetch(
        "https://9ac3-112-134-136-206.ngrok-free.app/SupeChat/LoadChat?logged_user_id=" +
          user.id +
          "&other_user_id=" +
          item.other_user_id
      );
      if (response.ok) {
        let chatarray = await response.json();
        setChatArray(chatarray);
      }
    }
    fetchChatArray();

    setInterval(() => {
      fetchChatArray();
    }, 2000);
  }, []);

  if (!loaded && !error) {
    return null;
  }
  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={Stylesheet.view1}
    >
      <StatusBar style="dark" hidden />
      <View style={Stylesheet.view2}>
        <View style={Stylesheet.view3}>
          {item.avater_image_found == "true" ? (
            <Image
              source={
                "https://9ac3-112-134-136-206.ngrok-free.app/SupeChat/Avater/" +
                item.Imgname +
                "_image.png"
              }
              contentFit="cover"
              style={Stylesheet.image1}
            />
          ) : (
            <Text style={Stylesheet.text1}>
              {item.other_user_avatar_letter}
            </Text>
          )}
        </View>
        <View style={Stylesheet.view4}>
          <Text style={Stylesheet.text2}>{item.other_user_name}</Text>
          <Text style={Stylesheet.text3}>
            {item.other_user_status == 1 ? "online" : "offline"}
          </Text>
        </View>
      </View>

      <FlashList
        data={getChatArray}
        renderItem={({ item }) => (
          <View
            style={
              item.side == "right" ? Stylesheet.view5_1 : Stylesheet.view5_2
            }
          >
            <Text style={Stylesheet.text3}>{item.message}</Text>

            <View style={Stylesheet.view6}>
              <Text style={Stylesheet.text4}>{item.datetime}</Text>
              {item.side == "right" ? (
                <FontAwesome6
                  name={item.status == 1 ? "check-double" : "check"}
                  size={18}
                  color={"white"}
                />
              ) : null}
            </View>
          </View>
        )}
        estimatedItemSize={200}
      />

      <View style={Stylesheet.view7}>
        <TextInput
          style={Stylesheet.input1} value={getChatText} placeholder="Type your text to send......."
          onChangeText={(text) => {
            setChatText(text);
          }}
        />
        <Pressable
          style={Stylesheet.pressable1}
          onPress={async () => {
            if (getChatText.length == 0) {
              Alert.alert ()
            } else {
              let userJson = await AsyncStorage.getItem("user");
              let user = JSON.parse(userJson);
              let response = await fetch(
                "https://9ac3-112-134-136-206.ngrok-free.app/SupeChat/sendChat?logged_user_id=" +
                  user.id +
                  "&other_user_id=" +
                  item.other_user_id +
                  "&message=" +
                  getChatText
              );
              if (response.ok) {
                let json = await response.json();

                if (json.success) {
                  console.log("Message Sent");
                  setChatText("");
                }
              }
            }
          }}
        >
          <FontAwesome6 name={"paper-plane"} size={18} color={"white"} />
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const Stylesheet = StyleSheet.create({
  view1: {
    flex: 1,
    paddingVertical: 20,
  },

  view2: {
    flexDirection: "row",
    columnGap: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  view3: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#007FFF",
    borderStyle: "solid",
    borderWidth: 2,
  },

  view4: {},

  image1: {
    width: 74,
    height: 74,
    borderRadius: 37,
    justifyContent: "center",
    alignSelf: "center",
  },

  text1: {
    fontFamily: "Montserrat-Bold",
    color: "white",
    fontSize: 40,
    alignItems: "center",
    alignSelf: "center",
  },

  text2: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    color: "#007FFF",
  },

  text3: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "white",
  },

  text4: {
    fontFamily: "Montserrat-Light",
    fontSize: 13,
    color: "white",
  },

  view5_1: {
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 12,
    justifyContent: "center",
    alignItems: "flex-end",
    rowGap: 6,
    backgroundColor: "#8B0000",
    alignSelf: "flex-end",
  },

  view5_2: {
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 12,
    justifyContent: "center",
    alignItems: "flex-start",
    rowGap: 6,
    backgroundColor: "#007FFF",
    alignSelf: "flex-start",
  },

  view6: {
    flexDirection: "row",
    columnGap: 10,
  },

  view7: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 12,
    paddingHorizontal: 20,
    marginVertical: 20,
  },

  input1: {
    height: 50,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 2,
    fontFamily: "Montserrat-Regular",
    fontSize: 17,
    flex: 1,
    paddingStart: 10,
    color: "white",
  },

  pressable1: {
    backgroundColor: "#8B0000",
    padding: 15,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  center_view: {
    flex: 1,
    marginVertical: 20,
  },
});
