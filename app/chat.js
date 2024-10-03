import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
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
            style={Stylesheet.view1}
        >
            <StatusBar style="dark" hidden />
            <View style={Stylesheet.view2}>
                <View style={Stylesheet.view3}>
                    {true ? (
                        <Image
                            source={
                                "https://af6f-112-134-136-206.ngrok-free.app/SupeChat/Avater/Blue_image.png"
                            }
                            contentFit="cover"
                            style={Stylesheet.image1}
                        />
                    ) : (
                        <Text style={Stylesheet.text1}>SP</Text>
                    )}
                </View>
                <View style={Stylesheet.view4}>
                    <Text style={Stylesheet.text2}>Blue Beetle</Text>
                    <Text style={Stylesheet.text3}>Online</Text>
                </View>
            </View>
            <View style={Stylesheet.center_view}>
                <View style={Stylesheet.view5_1}>
                    <Text style={Stylesheet.text3}>I am having some peaceful time</Text>

                    <View style={Stylesheet.view6}>
                        <Text style={Stylesheet.text4}>03:38 p.m</Text>
                    </View>
                </View>

                <View style={Stylesheet.view5_2}>
                    <Text style={Stylesheet.text3}>Oh nice!!</Text>

                    <View style={Stylesheet.view6}>
                        <Text style={Stylesheet.text4}>03:45 p.m</Text>
                        <FontAwesome6
                            name={true ? "check-double" : "check"}
                            size={18}
                            color={true ? "white" : "#8B0000"}
                        />
                    </View>
                </View>
            </View>
            <View style={Stylesheet.view7}>
                <TextInput style={Stylesheet.input1} />
                <Pressable style={Stylesheet.pressable1}>
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
