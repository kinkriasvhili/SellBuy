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
  const { isAuthenticated } = useContext(AuthContext);
  // Automatically fetch user data when app loads
  const userQuery = useQuery({
    queryKey: ["user", { user_id: "990e0ca3-cdc2-4476-8c3f-f5d224d8d410" }],
    queryFn: () => getUser("990e0ca3-cdc2-4476-8c3f-f5d224d8d410"),
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

  return (
    <UserContext.Provider value={{ userState, setUser, clearUser, userQuery }}>
      {children}
    </UserContext.Provider>
  );
}
