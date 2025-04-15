import styles from "./emailConfrimation.module.css";
import { FormButton } from "../../Components/Ui/buttons/Buttons";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  postEmailOrCodeConfirmation,
  postRegisterData,
} from "../../fetchData/postData";
import { AuthContext } from "../../Context/AuthContext";

export default function EmailConfirmation() {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const codeRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const { setUser, userState } = useContext(UserContext);
  const { repeat_password, ...filteredUserData } = location.state.data;
  const { from } = location.state;

  const createCodeMutation = useMutation({
    mutationFn: (data) => postEmailOrCodeConfirmation(data),
    onSuccess: (data) => {
      createRegUserMutation.mutate({
        ...filteredUserData,
        full_username: filteredUserData.username,
      });
    },
    onError: (error) => {
      setError("Invalid confirmation code. Please try again.");
    },
  });
  const createRegUserMutation = useMutation({
    mutationFn: postRegisterData,
    onSuccess: () => {
      setIsAuthenticated(true);
      navigate("/landingpage");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from == "reg") {
      createCodeMutation.mutate({
        email: location.state.data.email,
        code: code,
      });
    }
  };

  const createResendMutation = useMutation({
    mutationFn: (data) => postEmailOrCodeConfirmation(data),
    onSuccess: (data) => {
      alert("Confrimation code sucessfully sent to email");
    },
  });
  const resendCode = () => {
    codeRef.current.focus();
    createResendMutation.mutate({
      email: filteredUserData.email,
    });
  };
  useEffect(() => {
    codeRef.current.focus();
  }, [userState, setUser]);
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Email Confirmation</h2>
        <p>{setUser.user_name}</p>
        <p>
          We've sent a confirmation code to your email. Please enter it below.
        </p>

        <form>
          <input
            disabled={createCodeMutation.isPending}
            ref={codeRef}
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={styles.input}
          />
          {error && <span className={styles.error}>{error}</span>}
          <FormButton
            handleClick={handleSubmit}
            type="submit"
            text="Verify"
            className={styles.button}
          />
        </form>

        <button
          disabled={createResendMutation.isPending}
          className={`${styles.resend} wht-btn`}
          onClick={resendCode}
        >
          Resend Code
        </button>
        <span>{createResendMutation.isPending ? "Sending" : ""}</span>
      </div>
    </div>
  );
}

// const formData = new FormData();
// formData.append("full_username", filteredUserData.username);
// formData.append("username", filteredUserData.username);
// formData.append("email", filteredUserData.email);
// formData.append("age", parseInt(filteredUserData.age));
// formData.append("password", filteredUserData.password);
// formData.append("city", filteredUserData.city);
// formData.append("phone_number", filteredUserData.phone_number);
