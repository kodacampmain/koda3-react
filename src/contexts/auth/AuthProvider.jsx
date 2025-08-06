import { useState } from "react";
import { authContext as AuthContext } from "./authContext.js";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const login = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        username,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
