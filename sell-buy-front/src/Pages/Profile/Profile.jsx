import styles from "./profile.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { UserContext } from "../../Context/UserContext";
import { postLogout, postRefreshToken } from "../../fetchData/postData";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { userState, clearUser, userQuery } = useContext(UserContext);
  const navigate = useNavigate();
  if (!isAuthenticated) return <h1>You aren't logged in</h1>;

  const logOutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      clearUser();
      setIsAuthenticated(false);
      navigate("/");
    },
    onError: (err) => {
      console.log(`logut failed ${err}`);
    },
  });

  const handleClick = () => {
    logOutMutation.mutate();
  };

  if (userQuery.isLoading) return <h1>Loading...</h1>;
  if (userQuery.isError) {
    return (
      <>
        <h1>Error</h1>
        <button onClick={handleClick}>logOut</button>
      </>
    );
  }

  if (userQuery.status == "success") {
    console.log(userQuery.data);
  }
  console.log("query", userQuery.data);
  console.log("userstate", userState);

  return (
    <div className={`mainContainer`}>
      {" "}
      <button onClick={handleClick}>logOut</button>
      <p>user: {userQuery.data.full_username}</p>
      <p>this is landing page</p>
    </div>
  );
}

/**
age
avatar
city
Tbilisi
created_at
email
full_username
id
phone_number
 */
