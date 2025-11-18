import { useSelector } from "react-redux";
import { selectTheme } from "../store/slice/themeSlice";
// import { Colors } from '../utils/Colors';
import { Colors } from "../constants/Colors";

export const useColors = () => {
  const isDarkMode = useSelector(selectTheme);
  const theme = isDarkMode ? 'dark' : 'light';
  return { Colors: Colors[theme] };
}