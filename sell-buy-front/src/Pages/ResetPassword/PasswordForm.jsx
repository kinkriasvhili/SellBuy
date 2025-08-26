import { Password } from "../../Components/Ui/inputs/Inputs";
import { useEffect, useState } from "react";
import styles from "./resetPassword.module.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postResetPasConfrim } from "../../fetchData/postData";
export default function PasswordForm({ setPasswordReset, tokenEmailParams }) {
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
      console.log(data);
      alert("Password Reseted");
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
    setPasswordReset(false);
    navigate("/profile");
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
          <span className={styles.passwordText}>
            {!controlInput("password", password.password)
              ? "Minimum 9 symbol "
              : ""}
          </span>
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
          className={`${styles.changeButton} ${
            !isSubmited ? "disabledBtn" : ""
          }`}
          disabled={!isSubmited}
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
