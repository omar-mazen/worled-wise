/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const initialState = {
  user: null,
  isAuthenticaed: false,
};
function userReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticaed: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticaed: false,
      };
    default:
      return new Error("unknown action");
  }
}
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [{ user, isAuthenticaed }, dispatch] = useReducer(
    userReducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password && FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticaed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context == undefined)
    throw new Error("AuthContext used ouside AuthContext provider");
  return context;
}
export { AuthProvider, useAuth };
