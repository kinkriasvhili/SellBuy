import AllProducts from "../../Components/products/AllProducts";
import styles from "./landingPage.module.css";
import banner from "../../Images/landingPageBanner6.jpg";
import LandingBanner from "./LandingBanner";
import MyProducts from "../../Components/products/AllProducts";
import NewProducts from "../../Components/products/NewProducts";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../fetchData/postData";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { UserContext } from "../../Context/UserContext";
export default function LandingPage() {
  // const { setIsAuthenticated } = useContext(AuthContext);
  // const { clearUser } = useContext(UserContext);
  // const logOutMutation = useMutation({
  //   mutationFn: postLogout,
  //   onSuccess: () => {
  //     setIsAuthenticated(false);
  //     clearUser();
  //   },
  //   onError: (err) => {
  //     console.log(`logut failed ${err}`);
  //   },
  // });

  // const handleClick = () => {
  //   logOutMutation.mutate();
  // };
  // return (
  //   <>
  //     <h1 className={`bottomNav ${styles.landingPageContainer}`}>Error</h1>
  //     <button onClick={handleClick}>logOut</button>
  //   </>
  // );
  return (
    <div className={`bottomNav ${styles.landingPageContainer}`}>
      <LandingBanner banner={banner} styles={styles} />
      <div className={`mainContainer ${styles.newProductsContainer}`}>
        <h1>Latest products update</h1>
        <NewProducts />
      </div>
      {/* <AllProducts /> */}
    </div>
  );
}
