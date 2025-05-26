import styles from "./profile.module.css";
import { useEffect, useState } from "react";
// on main page:
// const [inputValue, setInputValue] = useState({
//   email: "",
//   avatar: "",
//   phone_number: "+9955",
//   city: "",
//   full_username: "",
// });
export default function ChangeInput({
  inputValue,
  setInputValue,
  changingValue,
  disabledSubmit,
  setDisabledSubmit,
}) {
  const [inputType, setInputType] = useState("text");
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (changingValue == "phone_number") {
      if (value.startsWith(`+9955`)) {
        const rest = value.slice(5).replace(/\D/g, "");
        const newValue = "+9955" + rest;

        if (newValue.length > 13) {
          alert(
            "Georgian numbers must be exactly 9 digits after +995. You can't enter more than that."
          );
          return;
        }
        if (newValue.length == 13) {
          setDisabledSubmit(false);
        } else {
          setDisabledSubmit(true);
        }
        setInputValue((prev) => ({
          ...prev,
          [changingValue]: "+9955" + rest,
        }));
      } else if (value === "") {
        setInputValue((prev) => ({
          ...prev,
          [changingValue]: "+9955",
        }));
      }
    } else if (changingValue == "avatar") {
      const file = e.target.files[0];
      if (file) {
        setInputValue((prev) => ({
          ...prev,
          [changingValue]: file,
        }));
      }
    } else {
      setInputValue((prev) => ({
        ...prev,
        [changingValue]: value,
      }));
    }
  };
  useEffect(() => {
    switch (changingValue) {
      case "email":
        if (inputValue[changingValue].endsWith("@gmail.com")) {
          setDisabledSubmit(false);
        } else {
          setDisabledSubmit(true);
        }
        break;
      case "avatar":
        const file = inputValue[changingValue];
        if (file instanceof File) {
          setDisabledSubmit(false);
        } else {
          setDisabledSubmit(true);
        }
        break;
      case "city":
        if (inputValue[changingValue].length >= 4) {
          setDisabledSubmit(false);
        } else {
          setDisabledSubmit(true);
        }
        break;
      case "full_username":
        if (inputValue[changingValue].length >= 4) {
          setDisabledSubmit(false);
        } else {
          setDisabledSubmit(true);
        }
        break;
    }
  }, [changingValue, inputValue]);
  useEffect(() => {
    switch (changingValue) {
      case "email":
        setInputType("email");
        setInputPlaceholder("example@gmail.com");
        break;
      case "avatar":
        setInputType("file");
        setInputPlaceholder("");
        break;
      case "phone_number":
        setInputType("text");
        setInputPlaceholder("+995 555 XXX XXX");
        break;
      case "city":
        setInputType("text");
        setInputPlaceholder("My City");
        break;
      case "full_username":
        setInputType("text");
        setInputPlaceholder("My Name");
    }
  }, [changingValue]);
  const commonProps = {
    onChange: handlePhoneChange,
    className: styles.changingEditor,
    style: disabledSubmit
      ? { borderColor: "red" }
      : { border: "1px solid #ccc" },
  };
  return (
    <>
      {inputType === "file" ? (
        <input
          key="file-input"
          {...commonProps}
          type={inputType}
          accept={"image/*"}
          multiple={false}
        />
      ) : (
        <input
          key="textual-input"
          {...commonProps}
          value={inputValue[changingValue] || ""}
          type={inputType}
          placeholder={inputPlaceholder}
        />
      )}
    </>
  );
}
