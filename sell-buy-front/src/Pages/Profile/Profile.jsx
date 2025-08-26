import styles from "./profile.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { UserContext } from "../../Context/UserContext";
import { postLogout } from "../../fetchData/postData";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "../../Images/profile.jpg";
import MyProducts from "../../Components/products/MyProducts";
import { EditProfile } from "./EditProfile";
import { getNotifications } from "../../fetchData/getData";

export default function Profile() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { userState, clearUser, userQuery } = useContext(UserContext);
  const navigate = useNavigate();
  const [openEditor, setOpenEditor] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const notQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

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

  const openModal = () => setOpenEditor(true);

  if (false) {
    return (
      <>
        <h1 className={`bottomNav ${styles.landingPageContainer}`}>Error</h1>
        <button onClick={handleClick}>logOut</button>
      </>
    );
  }

  if (!isAuthenticated)
    return <h1 className={`bottomNav`}>You aren't logged in</h1>;
  if (userQuery.isLoading) return <h1 className={`bottomNav`}>Loading...</h1>;
  if (userQuery.isError) {
    return (
      <>
        <h1 className={`bottomNav ${styles.landingPageContainer}`}>Error</h1>
        <button onClick={handleClick}>logOut</button>
      </>
    );
  }

  if (notQuery.isLoading) {
    return <h1>Loading Notification</h1>;
  }
  if (notQuery.isError) {
    return <h1>Error Notifications</h1>;
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
          <img
            src={userState.avatar ? userState.avatar : avatarURL}
            alt="Profile Avatar"
            className={styles.avatar}
          />
        </div>
        <ul className={styles.userDetails}>
          <li>Email: {userState.email}</li>
          <li>City: {userState.city}</li>
          <li>
            Phone: {userState.phone_number.slice(0, 4)}{" "}
            {userState.phone_number.slice(4, 7)}{" "}
            {userState.phone_number.slice(7, 9)}{" "}
            {userState.phone_number.slice(9, 11)}{" "}
            {userState.phone_number.slice(11, 13)}{" "}
          </li>
          <li>
            <div style={{ display: "flex", gap: "10px" }}>
              <span className={`${styles.edit}`} onClick={handleClick}>
                Log Out
              </span>{" "}
              <span
                className={styles.edit}
                onClick={() => {
                  openModal();
                }}
              >
                {" "}
                Edit
              </span>
            </div>
          </li>
        </ul>
        {openEditor || passwordReset ? (
          <EditProfile
            passwordReset={passwordReset}
            setPasswordReset={setPasswordReset}
            openEditor={openEditor}
            setDisabled={setOpenEditor}
          />
        ) : (
          ""
        )}
      </section>
      <section className={styles.productsContainer}>
        <h2 className={styles.sectionTitle}>My Products</h2>
        <MyProducts />
      </section>
    </div>
  );
}
