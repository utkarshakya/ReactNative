import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Colors } from "../constants/Colors";

export default function useThemeContext() {
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  const themeColors = Colors[themeMode];
  return { themeMode, themeColors, toggleTheme };
}
