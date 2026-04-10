import { createContext, useContext, useReducer, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../fetchData/getData";
export const UserContext = createContext();

const initialUserState = {
  age: null,
  avatar: "",
  city: "",
  created_at: "",
  email: "",
  full_username: "",
  id: null,
  phone_number: "",
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...action.payload };
    case "CLEAR_USER":
      return initialUserState;
    default:
      return state;
  }
};

export function UserContextProvider({ children }) {
  const [userState, dispatch] = useReducer(userReducer, initialUserState);
  var isAuthenticated;
  if (AuthContext) {
    var { isAuthenticated } = useContext(AuthContext);
  }
  // Automatically fetch user data when app loads
  const userQuery = useQuery({
    queryKey: ["user", "Me"],
    queryFn: () => getUser(),
    retry: 1,
    enabled: isAuthenticated,
  });

  // When the query gets the data, set it in context
  useEffect(() => {
    if (userQuery.data) {
      dispatch({ type: "SET_USER", payload: userQuery.data });
    }
  }, [userQuery.data]);

  const setUser = (userData) => {
    dispatch({ type: "SET_USER", payload: userData });
  };

  const clearUser = () => {
    dispatch({ type: "CLEAR_USER" });
  };
  useEffect(() => {
    if (!isAuthenticated) {
      clearUser();
    }
  }, []);
  return (
    <UserContext.Provider value={{ userState, setUser, clearUser, userQuery }}>
      {children}
    </UserContext.Provider>
  );
}
