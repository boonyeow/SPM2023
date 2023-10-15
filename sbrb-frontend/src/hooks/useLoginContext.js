import { LoginContext } from "../context/LoginContext";
import { useContext } from "react";

export const useLoginContext = () => useContext(LoginContext);
