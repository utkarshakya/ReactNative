import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  console.log("user context");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const register = async (fullName, email, password) => {
    try {
      let getUser = await AsyncStorage.getItem("user");
      getUser = JSON.parse(getUser);

      if (getUser && getUser["email"] === email) {
        console.warn("Try Login, this email already exist");
        setError("Account with this Email already exist");
        return;
      }
      const user = { fullName, email, password };
      await AsyncStorage.setItem("user", JSON.stringify(user));
      login(email, password);
    } catch (e) {
      throw new Error(e.message);
    }
  };
  const login = async (email, password) => {
    try {
      let getUser = await AsyncStorage.getItem("user");
      getUser = JSON.parse(getUser);
      if (email != getUser["email"] || password != getUser["password"]) {
        console.log("Invalid Credentials");
        setError("Invalid Credentials");
        return false;
      }
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      if (isLoggedIn) {
        setIsLoggedIn(false);
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  useEffect(() => {
    console.log("User Effect Function");
    const loadUserData = async () => {
      const savedUserData = await AsyncStorage.getItem("user");
      const data = JSON.parse(savedUserData);
    };
    loadUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        fullName,
        setFullName,
        email,
        setEmail,
        password,
        setPassword,
        isPasswordVisible,
        setIsPasswordVisible,
        isLoggedIn,
        setIsLoggedIn,
        error,
        setError,
        register,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
