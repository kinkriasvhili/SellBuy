import ControlText from "./ControlText";
import { useEffect, useState } from "react";
import styles from "./profile.module.css";
import ChangeInput from "./ChangeInput";
import { useMutation } from "@tanstack/react-query";
import { postResetPasRequest } from "../../fetchData/postData";
import PasswordForm from "./PasswordForm";

export default function ChangePasswordForms({
  tokenEmailParams,
  passwordReset,
  setPasswordReset,
}) {
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [stages, setStages] = useState({
    stageOne: true,
    stageTwo: false,
  });
  const [email, setEmail] = useState({
    email: "",
  });
  const [isSucces, setIsSucces] = useState(false);

  const requestMutation = useMutation({
    mutationKey: ["resetRequest"],
    mutationFn: postResetPasRequest,
    onSuccess: (data) => {
      setIsSucces(true);
    },
    onError: (error) => {
      console.log("error this is an error: ", error);
    },
    onSettled: () => {
      console.log("mutation settled with idk");
    },
  });

  useEffect(() => {
    if (passwordReset) {
      setStages({
        stageOne: false,
        stageTwo: true,
      });
    }
  }, [passwordReset]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {stages.stageOne ? (
        <>
          <label>Email: </label>
          <ChangeInput
            inputValue={email}
            setInputValue={setEmail}
            changingValue={"email"}
            disabledSubmit={isEmailCorrect}
            setDisabledSubmit={setIsEmailCorrect}
          />
          {isEmailCorrect ? (
            <ControlText
              setDisabledSubmit={setIsEmailCorrect}
              changingValue={stages.stageOne ? "email" : "password"}
            />
          ) : (
            ""
          )}

          <div
            onClick={() => {
              setStages({
                stageOne: false,
                stageTwo: false,
              });
              requestMutation.mutate({ email });
            }}
            type="submit"
            className={`${styles.changeButton} ${
              isEmailCorrect ? "disabledBtn" : ""
            }`}
            disabled={isEmailCorrect}
          >
            Next
          </div>
        </>
      ) : requestMutation.isPending ? (
        <span>...Pending</span>
      ) : !stages.stageTwo && isSucces ? (
        <p>Reset Link sent on your email account</p>
      ) : stages.stageTwo ? (
        <>
          <div className={styles.passwordContainer}>
            <PasswordForm
              tokenEmailParams={tokenEmailParams}
              setPasswordReset={setPasswordReset}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </form>
  );
}
