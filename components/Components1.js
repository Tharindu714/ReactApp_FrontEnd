import { useState } from "react";
import { Button, Text, View } from "react-native";
import { StyleSheet } from "react-native";

export function Component1({ fname, lname}) {
  const [getName, setName] = useState(fname + " " + lname);
  return (
    <View style={stylesheet.view1}>
      <Text style={stylesheet.text1}>{getName}</Text>
      <Button
        title={"Change"}
        onPress={() => {
          setName("Name");
        }}
      />
    </View>
  );
}

const stylesheet = StyleSheet.create({
  text1: {
    fontSize: 20,
  },

  view1: {
    height: 50,
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
});
