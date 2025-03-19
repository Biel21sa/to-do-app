import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";

export default function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: darkTheme ? "#333" : "#fff" },
      ]}
    >
      <TouchableOpacity
        style={styles.fixedBackButtonContainer}
        onPress={() => router.replace("/toDo")}
      >
        <FontAwesome
          name="arrow-left"
          size={25}
          style={{ color: darkTheme ? "#fff" : "#000" }}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={[styles.title, { color: darkTheme ? "#fff" : "#000" }]}>
          To-Do List
        </Text>
        <TouchableOpacity
          style={styles.themeButton}
          onPress={() => setDarkTheme(!darkTheme)}
        >
          <Text style={{ color: darkTheme ? "#fff" : "#000" }}>
            {darkTheme ? "Tema Claro" : "Tema Escuro"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
