import styles from "./profile.module.css";
import { getUser } from "../../fetchData/getData";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { postLogout } from "../../fetchData/postData";
export default function Profile() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const userQuery = useQuery({
    retry: 1,
    queryKey: ["user", { user_id: "6a4b1d03-ba52-4b43-8228-a860c78bd45b" }],
    queryFn: () => getUser("6a4b1d03-ba52-4b43-8228-a860c78bd45b"),
  });

  const logOutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      console.log("logged out");
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
  console.log(userQuery.isLoading);
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
