import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { registerRootComponent } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

SplashScreen.preventAutoHideAsync();

function Home() {
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
    <linearGradient color={["#09080e", "#181336"]} style={Stylesheet.view1}>
      <View style={Stylesheet.view2}>
        <View style={Stylesheet.view3}></View>
        <View style={Stylesheet.view4}>
          <Text style={Stylesheet.text1}>Sonic The Hedghog</Text>
          <Text style={Stylesheet.text2}>0786543218</Text>
          <Text style={Stylesheet.text3}>Since, September 2033</Text>
        </View>
      </View>
      <ScrollView style={Stylesheet.scroll1}>
        <View style={Stylesheet.view5}>
          <View style={Stylesheet.view6}></View>

          <View style={Stylesheet.view4}>
            <Text style={Stylesheet.text1}>Robotronicx</Text>
            <Text style={Stylesheet.text4} numberOfLines={1}>I will Kill You </Text>
            <View style={Stylesheet.view7}>
              <Text style={Stylesheet.text5}>2033, Sep 29 00:15:33 </Text>
              <FontAwesome6 name={"check"} size={18} color={"white"} />
            </View>
          </View>
        </View>
      </ScrollView>
    </linearGradient>
  );
}
registerRootComponent(Home);

const Stylesheet = StyleSheet.create({
  view1: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 25,
  },

  view2: {
    flexDirection: "row",
    columnGap: 25,
    alignItems: "center",
  },

  view3: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 40,
    borderStyle: "solid",
    borderWidth: 5,
    borderColor: "green",
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
    backgroundColor: "white",
    borderStyle: "dashed",
    borderWidth: 5,
    borderColor: "red",
  },

  view7: {
    flexDirection: "row",
    alignSelf: "flex-end",
    columnGap : 10,
    alignItems: "center",
  },

  text1: {
    fontFamily: "Montserrat-Bold",
    fontSize: 22,
  },

  text2: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
  },

  text3: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    alignSelf: "flex-end",
  },

  text4: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    overflow : "hidden",
    height: 19,
  },

  text5: {
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
  },

  scroll1: {
    marginTop: 30,
  },
});
