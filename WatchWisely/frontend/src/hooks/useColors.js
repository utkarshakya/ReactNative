import { useSelector } from "react-redux";
import { selectTheme } from "../store/slice/themeSlice";
import { Colors } from "../constants/Colors";

/**
 * @summary It is a custom hook that returns the colors based on the theme
 * @returns {Object}
 */
export const useColors = () => {
  const isDarkMode = useSelector(selectTheme);
  const theme = isDarkMode ? 'dark' : 'light';
  return { Colors: Colors[theme] };
}
