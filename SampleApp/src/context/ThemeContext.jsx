import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  console.log("theme provider");
  const [themeMode, setThemeMode] = useState("dark");

  const toggleTheme = async () => {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    await AsyncStorage.setItem("themeMode", newThemeMode);
    setThemeMode(newThemeMode);
  };

  useEffect(() => {
    console.log("Theme Effect Function");
    const loadTheme = async () => {
      const savedThemeMode = await AsyncStorage.getItem("themeMode");
      if (savedThemeMode) {
        console.log(savedThemeMode);
        setThemeMode(savedThemeMode);
      }
    };
    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
