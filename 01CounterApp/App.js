import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from "react-native";

export default function CounterApp() {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? darkTheme : lightTheme;

  return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.countText, { color: theme.text }]}>{count}</Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: theme.accent }]}
            onPress={() => setCount(count + 1)}
          >
            <Text style={styles.btnText}>Increase</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: theme.accent }]}
            onPress={() => setCount(count - 1)}
          >
            <Text style={styles.btnText}>Decrease</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#E74C3C" }]}
            onPress={() => {
              setCount(0);
              Vibration.vibrate(100);
            }}
          >
            <Text style={styles.btnText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.themeToggle, { backgroundColor: theme.accent }]}
          onPress={() => setIsDark(!isDark)}
        >
          <Text style={styles.btnText}>
            {isDark ? "Light Mode" : "Dark Mode"}
          </Text>
        </TouchableOpacity>
      </View>
  );
}

const lightTheme = {
  background: "#F5F5F5",
  text: "#333",
  accent: "#3498DB",
};

const darkTheme = {
  background: "#1E1E1E",
  text: "#FFF",
  accent: "#9B59B6",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  countText: {
    fontSize: 64,
    marginBottom: 40,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  themeToggle: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
});
