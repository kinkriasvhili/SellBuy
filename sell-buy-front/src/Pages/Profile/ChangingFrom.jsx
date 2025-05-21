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
    // mutation can be minimum one length object maximum ----
    // full_username: "giorgi",
    //   age: 30,
    //   city: "Gori",
    //   phone_number: "+995598524946",
    // i am only sending one length object which is backendSendvalue({changingValue: "my vale"})
    console.log({ [changingValue]: inputValue[changingValue] });
    // console.log is {full_username: 'Ratiko'}

    patchMutation.mutate({ [changingValue]: inputValue[changingValue] });
    // this is working fine ->
    // patchMutation.mutate({
    //   email: "rati2101@gmail.com",
    // });
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
