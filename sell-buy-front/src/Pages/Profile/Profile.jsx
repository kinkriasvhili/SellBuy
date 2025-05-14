import styles from "./profile.module.css";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { UserContext } from "../../Context/UserContext";
import { postLogout } from "../../fetchData/postData";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "../../Images/profile.jpg";
import MyProducts from "../../Components/products/MyProducts";

export default function Profile() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { userState, clearUser, userQuery } = useContext(UserContext);
  const navigate = useNavigate();

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
  if (true) {
    return (
      <>
        <h1 className={`bottomNav ${styles.landingPageContainer}`}>Error</h1>
        <button onClick={handleClick}>logOut</button>
      </>
    );
  }

  if (!isAuthenticated) return <h1>You aren't logged in</h1>;
  if (userQuery.isLoading) return <h1>Loading...</h1>;
  if (userQuery.isError) {
    return (
      <>
        <h1 className={`bottomNav ${styles.landingPageContainer}`}>Error</h1>
        <button onClick={handleClick}>logOut</button>
      </>
    );
  }

  const avatarURL = userState.avatar ? userState.avatar : profileImg;

  return (
    <div className={`mainContainer bottomNav ${styles.profileContainer}`}>
      <header className={styles.header}>
        <Link to={`/add-products`}>
          <button className={styles.addButtin}>Add Products</button>
        </Link>

        <p className={styles.username}>{userState.full_username}</p>
      </header>

      <section className={styles.profileSection}>
        <div className={styles.avatarWrapper}>
          <img src={avatarURL} alt="Profile Avatar" className={styles.avatar} />
        </div>
        <ul className={styles.userDetails}>
          <li>Email: {userState.email}</li>
          <li>City: {userState.city}</li>
          <li>Phone: {userState.phone_number}</li>
          <li>
            <div style={{ display: "flex", gap: "10px" }}>
              <span className={`${styles.edit}`} onClick={handleClick}>
                Log Out
              </span>{" "}
              <span className={styles.edit}> Edit</span>
            </div>
          </li>
        </ul>
      </section>
      <section className={styles.productsContainer}>
        <h2 className={styles.sectionTitle}>My Products</h2>
        <MyProducts />
      </section>
      <>
        <button onClick={handleClick}>logOut</button>
      </>
    </div>
  );
}
