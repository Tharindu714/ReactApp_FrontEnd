import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { registerRootComponent } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ImageBackground,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const backgroundImage = require("./assets/images/BlurBackground.jpg");

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
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={Stylesheet.view1}
    >
      <View style={Stylesheet.view2}>
        <View style={Stylesheet.view3}>
          <View style={Stylesheet.onlineView}></View>
        </View>
        <View style={Stylesheet.view4}>
          <Text style={Stylesheet.text1}>Milles Morals</Text>
          <Text style={Stylesheet.text2}>0786543218</Text>
          <Text style={Stylesheet.text3}>Since, September 2025</Text>
        </View>
      </View>
      <ScrollView style={Stylesheet.scroll1}>
        <View style={Stylesheet.view5}>
          <View style={Stylesheet.view6}>
          <View style={Stylesheet.offlineView}></View>
          </View>
          <View style={Stylesheet.view4}>
            <Text style={Stylesheet.text1}>Peter Parker</Text>
            <Text style={Stylesheet.text4} numberOfLines={1}>
              Hey You Ready for the Next Mission buddy
            </Text>
            <View style={Stylesheet.view7}>
              <Text style={Stylesheet.text5}>2033, Sep 30 00:15:33 </Text>
              <FontAwesome6 name={"check"} size={18} color={"#007FFF"} />
            </View>
          </View>
          </View>

          <View style={Stylesheet.view5}>
          <View style={Stylesheet.view3}>
          <View style={Stylesheet.onlineView}></View>
          </View>
          <View style={Stylesheet.view4}>
            <Text style={Stylesheet.text1}>Venom itself</Text>
            <Text style={Stylesheet.text4} numberOfLines={1}>
              Your Stupid plan is not gonna work on me douchebag
            </Text>
            <View style={Stylesheet.view7}>
              <Text style={Stylesheet.text5}>2033, Sep 28 00:15:33 </Text>
              <FontAwesome6 name={"check-double"} size={18} color={"white"} />
            </View>
          </View>
          </View>

          <View style={Stylesheet.view5}>
          <View style={Stylesheet.view3}>
          <View style={Stylesheet.onlineView}></View>
          </View>
          <View style={Stylesheet.view4}>
            <Text style={Stylesheet.text1}>Docter Strange</Text>
            <Text style={Stylesheet.text4} numberOfLines={1}>
              Hey I was thinking maybe we should hangout and have a beer
            </Text>
            <View style={Stylesheet.view7}>
              <Text style={Stylesheet.text5}>2033, Sep 29 00:15:33 </Text>
              <FontAwesome6 name={"check-double"} size={18} color={"white"} />
            </View>
          </View>
          </View>


        <View style={Stylesheet.view5}>
          <View style={Stylesheet.view6}>
          <View style={Stylesheet.offlineView}></View>
          </View>
          <View style={Stylesheet.view4}>
            <Text style={Stylesheet.text1}>Batman</Text>
            <Text style={Stylesheet.text4} numberOfLines={1}>
              Man if you come to DC, Parker will pissed ha haa :(
            </Text>
            <View style={Stylesheet.view7}>
              <Text style={Stylesheet.text5}>2033, Sep 29 00:15:33 </Text>
              <FontAwesome6 name={"check"} size={18} color={"#007FFF"} />
            </View>
          </View>
          </View>

          <View style={Stylesheet.view5}>
          <View style={Stylesheet.view6}>
          <View style={Stylesheet.offlineView}></View>
          </View>
          <View style={Stylesheet.view4}>
            <Text style={Stylesheet.text1}>Tony Stark</Text>
            <Text style={Stylesheet.text4} numberOfLines={1}>
              Why kids Stupid actually ?
            </Text>
            <View style={Stylesheet.view7}>
              <Text style={Stylesheet.text5}>2033, Sep 29 00:15:33 </Text>
              <FontAwesome6 name={"check"} size={18} color={"#007FFF"} />
            </View>
          </View>
          </View>

      </ScrollView>
    </ImageBackground>
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
    borderRadius: 40,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#007FFF",
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
    borderColor: "red",
  },

  view7: {
    flexDirection: "row",
    alignSelf: "flex-end",
    columnGap: 10,
    alignItems: "center",
  },

  onlineView: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    backgroundColor : "#007FFF",
    width : 18,
    height : 18,
    borderRadius : 9,
  },

  offlineView:{
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    backgroundColor : "red",
    width : 18,
    height : 18,
    borderRadius : 9,
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
    color: "white"
  },

  text5: {
    fontFamily: "Montserrat-Medium",
    fontSize: 13,
    color : "#007FFF"
  },

  scroll1: {
    marginTop: 30,
  },
});
