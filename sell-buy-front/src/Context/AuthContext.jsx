import { createContext, useEffect, useRef } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { postLogout } from "../fetchData/postData";
import { useMutation } from "@tanstack/react-query";
export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const hasRun = useRef(false);
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );

  // const refreshMutation = useMutation({
  //   mutationFn: postRefreshToken,
  //   onError: (err) => {
  //     // console.log("error in use mutation REFRESH TOKEN");
  //     if (
  //       err?.response?.status === 401 ||
  //       err?.response?.data?.message ===
  //         "Invalid or expired token. Please log in again."
  //     ) {
  //       setIsAuthenticated(false);
  //       logOutMutation.mutate();
  //     }
  //     console.log(err);
  //   },
  //   onSettled: () => {
  //     // console.log("refresh attempt finished");
  //   },
  // });

  const logOutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      setIsAuthenticated(false);
      console.log("logged out");
    },
    onError: (err) => {
      console.log("logout error ", err);
    },
  });
  useEffect(() => {
    if (!isAuthenticated) return;
    console.log("from authioansdaksjdth");
    if (!hasRun.current) {
      hasRun.current = true;
      // refreshMutation.mutate(); // run only once on mount
    }
    // const interval = setInterval(() => {
    //   // refreshMutation.mutate();
    // }, 30 * 10 * 1000);

    // return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
