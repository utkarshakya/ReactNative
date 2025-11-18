import RootLayout from "./RootLayout";
import { ThemeProvider } from "../src/context/ThemeContext";
import { UserProvider } from "../src/context/UserContext";
import "../src/global.css";

const _layout = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <RootLayout />
      </UserProvider>
    </ThemeProvider>
  );
};

export default _layout;
