import { createContext, useContext, useMemo, useState } from "react";

const loginInfoDefault = {
  username: "",
  role: "",
  isLoggedIn: false,
};

export const LoginContext = createContext(loginInfoDefault);

export const LoginProvider = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState(loginInfoDefault);
  const loginValue = useMemo(
    () => ({ loginInfo, setLoginInfo }),
    [loginInfo, setLoginInfo]
  );
  return (
    <LoginContext.Provider value={loginValue}>{children}</LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);
