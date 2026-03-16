import styles from "./signUpIn.module.css";
import { Link } from "react-router-dom";
import { Password, SignForm } from "../../Components/Ui/inputs/Inputs";
import { FormButton } from "../../Components/Ui/buttons/Buttons";
import { SignFormRightSideSvg } from "../../Components/Ui/animations/SvgAnimations";
import { useNavigate } from "react-router-dom";
import { useControlForm } from "./ControlForm";
import { useMutation } from "@tanstack/react-query";
import { postEmailOrCodeConfirmation } from "../../fetchData/postData";
import { AuthContext } from "../../Context/AuthContext";
import Pass from "../../Components/Errors/Pass";
export default function SignIn() {
  const { signupData, inputsValidation, handleChange } = useControlForm();
  const navigate = useNavigate();
  const createEmailMutation = useMutation({
    mutationFn: (data) => {
      postEmailOrCodeConfirmation(data);
    },
    onSuccess: () => {
      navigate("/email-confrimation", {
        state: { from: "reg", data: signupData },
      });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const makeClass = (isValid) => {
    return !isValid ? styles.inputRed : "";
  };
  const allValid = Object.values(inputsValidation).every(
    (value) => value === true,
  );
  const handleClick = (e) => {
    e.preventDefault();

    createEmailMutation.mutate({
      email: signupData.email,
    });
  };
  return (
    <div className={`bottomNav ${styles.container}`}>
      <Pass />
      <div className={`${styles.leftSide} ${styles.registerForm}`}>
        <h2>Sign In</h2>
        <span>Please login to continue yo your account</span>
        <form action="">
          <SignForm
            label={"UserName"}
            type={"text"}
            placeholder={"UserName"}
            name="username"
            handleChange={handleChange}
            value={signupData}
            className={makeClass(inputsValidation.isUserNameValid)}
          />
          <SignForm
            label={"Email"}
            type={"email"}
            placeholder={"Mail"}
            name="email"
            handleChange={handleChange}
            value={signupData}
            className={makeClass(inputsValidation.isEmailValid)}
          />
          <div className={styles.tripleInp}>
            <SignForm
              label={"Age"}
              type={"number"}
              placeholder={"Age"}
              name="age"
              handleChange={handleChange}
              value={signupData}
              className={makeClass(inputsValidation.isAgeValid)}
            />
            <SignForm
              label={"City"}
              type={"text"}
              placeholder={"City"}
              name="city"
              handleChange={handleChange}
              value={signupData}
              className={makeClass(inputsValidation.isCityValid)}
            />
            <SignForm
              label={"Phone Number"}
              type={"text"}
              placeholder={"Phone Number"}
              name="phone_number"
              handleChange={handleChange}
              value={signupData}
              className={makeClass(inputsValidation.isNumberValid)}
            />
          </div>
          <Password
            label={"Password"}
            placeholder={"Password"}
            name="password"
            handleChange={handleChange}
            value={signupData}
            className={makeClass(inputsValidation.isPasswordValid)}
          />
          <Password
            label="Repeat Password"
            placeholder="Repeat Password"
            name="repeat_password"
            handleChange={handleChange}
            value={signupData}
            className={makeClass(inputsValidation.passwordMatch)}
          />
          <span>
            Please login with already exsisted account to check website
          </span>
          <FormButton
            handleClick={handleClick}
            type="submit"
            className={`${styles.signButton} wht-btn `}
            text={"Create Account"}
            disabled={!allValid}
          />
          <span className={styles.linkSpam}>
            Already have an account? <Link to={"/login"}>Sign In</Link>
          </span>
        </form>
      </div>
      <div>
        <SignFormRightSideSvg
          containerClass={`${styles.rightSide} 
          mainContainer`}
          title="Welcome!"
          svgClass={styles.svgContainer}
        />
        {createEmailMutation.isPending ? <span>...Loading</span> : ""}
      </div>
    </div>
  );
}
