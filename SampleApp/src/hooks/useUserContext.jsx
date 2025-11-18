import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function useUserContext() {
  const {
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
  } = useContext(UserContext);
  return {
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
  };
}
