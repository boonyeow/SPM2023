import { createContext, useContext, useMemo, useState } from "react";

const loginInfoDefault = {
  id: null,
  username: null,
  role: null,
  isLoggedIn: false,
};

export const LoginContext = createContext(loginInfoDefault);

export const LoginProvider = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState(() => {
    return {
      userId: localStorage.getItem("userId"),
      email: localStorage.getItem("email"),
      role: localStorage.getItem("role"),
      isLoggedIn: localStorage.getItem("isLoggedIn") == "true",
    };
  });
  const loginValue = useMemo(
    () => ({ loginInfo, setLoginInfo }),
    [loginInfo, setLoginInfo]
  );

  return (
    <LoginContext.Provider value={loginValue}>{children}</LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);
