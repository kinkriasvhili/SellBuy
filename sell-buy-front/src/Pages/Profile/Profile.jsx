import styles from "./profile.module.css";
import { getUser } from "../../fetchData/getData";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { UserContext } from "../../Context/UserContext";
import { postLogout } from "../../fetchData/postData";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!isAuthenticated) return <h1>You aren't logged in</h1>;
  const userQuery = useQuery({
    retry: 1,
    queryKey: ["user", { user_id: "990e0ca3-cdc2-4476-8c3f-f5d224d8d410" }],
    queryFn: () => getUser("990e0ca3-cdc2-4476-8c3f-f5d224d8d410"),
  });

  const logOutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      console.log("logged out");
      navigate("/");
      setIsAuthenticated(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const handleClick = () => {
    console.log("loge out");
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
