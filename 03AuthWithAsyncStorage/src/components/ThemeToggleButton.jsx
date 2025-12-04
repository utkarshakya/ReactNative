import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useThemeContext from "../hooks/useThemeContext";

export default function ThemeToggleButton() {
  const { themeMode, toggleTheme } = useThemeContext();
  
  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
      <Ionicons
        name={themeMode === "light" ? "sunny" : "moon"}
        size={24}
        color={themeMode === "light" ? "#222" : "#fdd835"}
      />
    </TouchableOpacity>
  );
}
