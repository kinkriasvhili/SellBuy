import { useEffect } from "react";
import styles from "./landingPage.module.css";
import { getUser } from "../../fetchData/getData";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postLogout } from "../../fetchData/postData";

export default function LandingPage() {
  const userQuery = useQuery({
    retry: 0,
    queryKey: ["user", { user_id: "250d5fd2-a1ca-4b1d-a9ba-8fc98477b049" }],
    queryFn: () => getUser("250d5fd2-a1ca-4b1d-a9ba-8fc98477b049"),
  });

  const logOutMutation = useMutation({
    queryFn: () => postLogout(),
    onSuccess: (data) => {
      console.log(data.error);
    },
  });

  if (userQuery.isLoading) return <h1>Loading</h1>;
  if (userQuery.isError) {
    // console.log(userQuery.error.message);
    // logOutMutation.mutate();
    return <h1>Error</h1>;
  }

  // useEffect(() => {
  //   console.log("me");
  //   if (userQuery.isError) {
  //     logOutMutation.mutate();
  //   }
  // }, [userQuery.isError]);
  if (userQuery.status == "success") {
    console.log(userQuery.data);
  }
  console.log(userQuery);
  return <div className={`mainContainer`}>this is a landing page</div>;
}
