import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  StatusBar,
  Pressable,
  Alert,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";

const backgroundImage = require("../assets/images/BlurBackground.jpg");

SplashScreen.preventAutoHideAsync();

export default function home() {

  const [getChatArray, setChatArray] = useState([]);

  const [loaded, error] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  useEffect(() => {
    async function fetchData() {
      let userJson = await AsyncStorage.getItem("user");
      let user = JSON.parse(userJson);

      let response = await fetch(
        "https://9ac3-112-134-136-206.ngrok-free.app/SupeChat/LoadHomeData?id=" +
        user.id
      );
      if (response.ok) {
        let json = await response.json();
        if (json.success) {
          let ChatArray = json.jsonChatArray;
          setChatArray(ChatArray);
        }
      }
    }
    fetchData();
  }, []);

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
      style={Stylesheet.view1}
    >
      <StatusBar style="dark" hidden />
      <FlashList
        data={getChatArray}
        renderItem={({ item }) => (
          <Pressable style={Stylesheet.view5} onPress={
            () => {
              // Alert.alert("View Chat", "User:" + item.other_user_id);
              router.push(
                {
                  pathname : "/chat",
                  params: item
                }
              );
            }
          }>

            <View
              style={
                item.other_user_status == 1
                  ? Stylesheet.view3
                  : Stylesheet.view6
              }
            >
              {item.avater_image_found ? (
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
                <Text style={Stylesheet.text6}>
                  {item.other_user_avatar_letter}
                </Text>
              )}
            </View>
            <View style={Stylesheet.view4}>
              <View style={Stylesheet.view8}>
                <View
                  style={
                    item.other_user_status == 1
                      ? Stylesheet.onlineView
                      : Stylesheet.offlineView
                  }
                ></View>
              </View>
              <Text style={Stylesheet.text1}>{item.other_user_name}</Text>
              <Text style={Stylesheet.text4} numberOfLines={1}>
                {item.message}
              </Text>
              <View style={Stylesheet.view7}>
                <Text style={Stylesheet.text5}>{item.dateTime}</Text>
                <FontAwesome6
                  name={item.chat_status_id == 1 ? "check-double" : "check"}
                  size={18}
                  color={item.chat_status_id == 2 ? "#007FFF" : "white"}
                />
              </View>
            </View>
          </Pressable>
        )}
        estimatedItemSize={200}
      />
    </ImageBackground>
  );
}

const Stylesheet = StyleSheet.create({
  view1: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 25,
  },

  view3: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#007FFF",
    justifyContent: "center"
  },

  view4: {
    flex: 1,
  },

  view5: {
    flexDirection: "row",
    marginVertical: 12,
    columnGap: 20,
  },

  view6: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#8B0000",
    justifyContent: "center"
  },

  view7: {
    flexDirection: "row",
    alignSelf: "flex-end",
    columnGap: 10,
    alignItems: "center",
  },

  view8: {
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },

  onlineView: {
    backgroundColor: "#007FFF",
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  offlineView: {
    backgroundColor: "#8B0000",
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  text1: {
    fontFamily: "Montserrat-Bold",
    fontSize: 22,
    color: "white",
  },

  text2: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    color: "white",
  },

  text3: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    alignSelf: "flex-end",
    color: "#007FFF",
  },

  text4: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    overflow: "hidden",
    height: 19,
    color: "white",
  },

  text5: {
    fontFamily: "Montserrat-Medium",
    fontSize: 13,
    color: "#007FFF",
  },

  text6: {
    fontFamily: "Montserrat-Bold",
    color: "white",
    fontSize: 28,
    alignItems: "center",
    alignSelf: "center",
  },

  image1: {
    width: 74,
    height: 74,
    borderRadius: 37,
    justifyContent: "center",
    alignSelf: "center",
  },
});
