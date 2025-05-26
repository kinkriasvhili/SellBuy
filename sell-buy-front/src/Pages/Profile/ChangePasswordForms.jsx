import ControlText from "./ControlText";
import { useState } from "react";
import styles from "./profile.module.css";
import ChangeInput from "./ChangeInput";
import { useMutation } from "@tanstack/react-query";
import { postResetPasRequest } from "../../fetchData/postData";

export default function ChangePasswordForms({ openEditorStageFirst }) {
  const [isSubmited, setIsSubmited] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [stages, setStages] = useState({
    stageOne: true,
    stageTwo: false,
  });
  const [changePassword, setPassword] = useState({
    old_password: "",
    new_password: "",
  });
  const [email, setEmail] = useState({
    email: "",
  });
  const changingValue = openEditorStageFirst.change;
  const onChange = (e) => {
    console.log("hello world");
  };
  const requestMutation = useMutation({
    mutationKey: ["resetRequest"],
    mutationFn: postResetPasRequest,
    onSuccess: (data) => {
      console.log(data);
      console.log("succes this is data: ", data);
    },
    onError: (error) => {
      console.log("error this is an error: ", error);
    },
    onSettled: () => {
      console.log("mutation settled with idk");
    },
  });
  return (
    <form action="">
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
                stageTwo: true,
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
      ) : stages.stageTwo ? (
        <>
          <div>
            <label>Password: </label>
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
          </div>
          <button
            type="submit"
            className={`${styles.changeButton} ${
              isSubmited ? "disabledBtn" : ""
            }`}
            disabled={isSubmited}
          >
            Save
          </button>
        </>
      ) : (
        ""
      )}
    </form>
  );
}
