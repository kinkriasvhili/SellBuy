import { useSearchParams } from "react-router-dom";
import { Password } from "../../Components/Ui/inputs/Inputs";
import { useEffect, useState } from "react";
import styles from "./resetPassword.module.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postLogout, postResetPasConfrim } from "../../fetchData/postData";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { UserContext } from "../../Context/UserContext";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { clearUser } = useContext(UserContext);

  const logOutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      clearUser();
    },
    onError: (err) => {
      console.log(`logout failed ${err}`);
    },
  });

  const handleLogOut = () => {
    logOutMutation.mutate();
  };

  const tokenEmailParams = {
    email: searchParams.get("email"),
    token: searchParams.get("token"),
  };

  const [password, setPassword] = useState({
    password: "",
    repeatPassword: "",
  });
  const [isSubmited, setIsSubmited] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsSubmited(false);
  }, []);
  const handleChange = (e, name) => {
    setPassword((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const controlInput = (name, value) => {
    switch (name) {
      case "password":
        if (value.length >= 9) {
          return true;
        } else {
          return false;
        }
        break;
      case "repeatPassword":
        const isValid = value === password.password;
        if (isValid !== isSubmited) {
          setIsSubmited(isValid);
        }
        return isValid;
        break;
    }
  };
  const confrimMutation = useMutation({
    mutationKey: ["reset confrim"],
    mutationFn: postResetPasConfrim,
    onSuccess: (data) => {
      alert("You were logged out after resetting your password.");
      isAuthenticated && handleLogOut();
    },
    onError: (er) => {
      console.log(er);
    },
    onSettled: () => {
      console.log("mutation ended");
    },
  });
  const handleSubmit = () => {
    confrimMutation.mutate({
      ...tokenEmailParams,
      new_password: password.password,
    });

    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    navigate("/profile");
    setIsAuthenticated(false);
  };
  return (
    <div className={`bottomNav ${styles.container}`}>
      <div className={styles.box}>
        <h2>Password Reset</h2>
        <p>Please change your password</p>

        <form>
          <Password
            label={"Password"}
            placeholder={"New Password"}
            name={"password"}
            handleChange={handleChange}
            value={password.password}
            className={
              controlInput("password", password.password) ? "" : "inputRed"
            }
          />
          <div className={styles.spanContainer}>
            <span className={styles.passwordText}>
              {!controlInput("password", password.password)
                ? "Minimum 9 symbol "
                : ""}
            </span>
          </div>

          <Password
            label={"Repeat"}
            placeholder={"Repeat Password"}
            name={"repeatPassword"}
            handleChange={handleChange}
            value={password.repeatPassword}
            className={
              controlInput("repeatPassword", password.repeatPassword)
                ? ""
                : "inputRed"
            }
          />
        </form>

        <button
          type="submit"
          className={`${styles.changeButton} ${false ? "disabledBtn" : ""}`}
          // disabled={!isSubmited}
          onClick={() => {
            handleSubmit();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
