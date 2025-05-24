import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import styles from "./profile.module.css";
import ControlText from "./ControlText";
import ChangeInput from "./ChangeInput";
import { profilePatch } from "../../fetchData/patchData";
import { useMutation } from "@tanstack/react-query";

export default function ChangingForm({
  setOpenEditorStageSecond,
  setOpenEditorStageFirst,
  openEditorStageFirst,
  setDisabled,
}) {
  const [inputValue, setInputValue] = useState({
    email: "",
    avatar: "",
    phone_number: "+9955",
    city: "",
    full_username: "",
    password: "",
  });
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const changingValue = openEditorStageFirst.change;
  const { setUser } = useContext(UserContext);
  const patchMutation = useMutation({
    mutationFn: profilePatch,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      console.log("mutattions is finished");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenEditorStageSecond(false);
    setOpenEditorStageFirst({ isOpen: true, change: "" });
    setDisabled(false);
    console.log({ [changingValue]: inputValue[changingValue] });
    patchMutation.mutate({ [changingValue]: inputValue[changingValue] });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label className={styles.formLabel}>
        New {changingValue.replace("_", " ")}:
      </label>

      <ChangeInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        changingValue={changingValue}
        setDisabledSubmit={setDisabledSubmit}
        disabledSubmit={disabledSubmit}
      />

      {disabledSubmit ? (
        <ControlText
          setDisabledSubmit={setDisabledSubmit}
          changingValue={changingValue}
        />
      ) : (
        ""
      )}

      <button
        type="submit"
        className={`${styles.changeButton} ${
          disabledSubmit ? "disabledBtn" : ""
        }`}
        disabled={disabledSubmit}
      >
        Save
      </button>
    </form>
  );
}
