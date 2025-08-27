// ResetPassword.jsx
import styles from "./resetPassword.module.css";
import ControlText from "../Profile/ControlText";
import { useEffect, useState } from "react";
import ChangeInput from "../Profile/ChangeInput";
import { useMutation } from "@tanstack/react-query";
import { postResetPasRequest } from "../../fetchData/postData";

export default function ResetPasswordModal({ open, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // 🔥 Always declare hooks at the top, regardless of `open`
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
    onSuccess: () => {
      setIsSucces(true);
    },
    onError: (error) => {
      console.log("error this is an error: ", error);
    },
    onSettled: () => {
      console.log("mutation settled with idk");
    },
  });

  // 🔥 Instead of returning early, conditionally render `null`
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div
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
                changingValue="email"
                disabledSubmit={isEmailCorrect}
                setDisabledSubmit={setIsEmailCorrect}
              />

              {isEmailCorrect && (
                <ControlText
                  setDisabledSubmit={setIsEmailCorrect}
                  changingValue={stages.stageOne ? "email" : "password"}
                />
              )}

              <button
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
              </button>
            </>
          ) : requestMutation.isPending ? (
            <span>...Pending</span>
          ) : !stages.stageTwo && isSucces ? (
            <p>Reset Link sent on your email account</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
