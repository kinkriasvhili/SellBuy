import styles from "./signUpIn.module.css";
import { React, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SignForm, Password } from "../../Components/Ui/inputs/Inputs";
import { FormButton } from "../../Components/Ui/buttons/Buttons";
import { SignFormRightSideSvg } from "../../Components/Ui/animations/SvgAnimations";
import { useNavigate } from "react-router-dom";
import { useControlForm } from "./ControlForm";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../../fetchData/postData";
import { AuthContext } from "../../Context/AuthContext";

export default function SignIn() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { signupData, inputsValidation, handleChange } = useControlForm();
  const [invalid, setInvalid] = useState("");
  const isLoginValid =
    inputsValidation.isPasswordValid && inputsValidation.isEmailValid;
  const makeClass = (isValid) => {
    return !isValid ? styles.inputRed : "";
  };

  const createLoginMutation = useMutation({
    mutationFn: (data) => postLogin(data),
    onSuccess: () => {
      setIsAuthenticated(true);
      setInvalid("");
      navigate("/profile");
    },
    onError: (error) => {
      setInvalid("Invalid password or email. Please try again.");
      console.log(error.message);
    },
  });

  const navigate = useNavigate();
  const handleClick = (e) => {
    setInvalid("");
    e.preventDefault();
    createLoginMutation.mutate({
      email: signupData.email,
      password: signupData.password,
    });
  };
  return (
    <div className={`bottomNav ${styles.container}`}>
      <div className={styles.leftSide}>
        <h2>Sign In</h2>
        <span>
          Please login to <b>accsess all features</b>
        </span>
        <form action="">
          <SignForm
            label={"Email"}
            type={"email"}
            placeholder={"Mail"}
            name="email"
            handleChange={handleChange}
            value={signupData}
            className={makeClass(inputsValidation.isEmailValid)}
          />
          <Password
            label={"Password"}
            placeholder={"Password"}
            name="password"
            handleChange={handleChange}
            value={signupData}
            className={makeClass(inputsValidation.isPasswordValid)}
          />
          <span style={{ color: "red" }}>{invalid}</span>
          <FormButton
            handleClick={handleClick}
            type="submit"
            className={`${styles.signButton} wht-btn `}
            text={"Log In"}
            disabled={!isLoginValid || createLoginMutation.isPending}
          />
          <span>{createLoginMutation.isPending ? "Logging in..." : ""}</span>
        </form>
        <span className={styles.linkSpam}>
          Need a account <Link to={"/signup"}>Create One</Link>
        </span>
      </div>
      <div>
        <SignFormRightSideSvg
          containerClass={`${styles.rightSide} 
          mainContainer`}
          title="Welcome Back"
          svgClass={styles.svgContainer}
        />
      </div>
    </div>
  );
}
