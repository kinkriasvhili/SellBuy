import { useState } from "react";

export function useControlForm() {
  const [signupData, setSignUpData] = useState({
    username: "",
    email: "giguuag@gmail.com ",
    age: "",
    password: "giorgi123",
    city: "",
    phone_number: "+9955",
    repeat_password: "",
  });

  const [inputsValidation, setInputsValidation] = useState({
    isAgeValid: false,
    isPasswordValid: true,
    isEmailValid: true,
    isNumberValid: false,
    isUserNameValid: false,
    isCityValid: false,
    passwordMatch: false,
  });

  const validatePassword = (value) => value.length > 8;
  const validateUserName = (value) => value.length >= 4;
  const validateCity = (value) => value.length >= 1;
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validAge = (value) => Number(value) >= 18 && Number(value) <= 80;
  const validNumber = (value) => value.length == 13;

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "age") {
      value = isNaN(Number(value))
        ? ""
        : Math.max(0, Math.min(Number(value), 80));
    } else if (name == "phone_number") {
      const base = "+9955";

      //check base
      if (value.length < base.length) {
        value = base;
      }

      // If value doesn't start with +995, force it
      if (!value.startsWith(base)) {
        return; // ignore invalid attempts to delete/replace base
      }

      // Get the last character
      const lastChar = value[value.length - 1];
      // If it's not a number and not part of the prefix, block input
      if (
        (value.length > base.length && isNaN(lastChar)) ||
        value.length > 13
      ) {
        console.log("not a number");
        return;
      }
    }
    if (value === "0") value = "";

    setSignUpData((prev) => ({ ...prev, [name]: value }));

    setInputsValidation((prev) => ({
      ...prev,
      isUserNameValid:
        name === "username" ? validateUserName(value) : prev.isUserNameValid,
      isCityValid: name === "city" ? validateCity(value) : prev.isCityValid,
      isPasswordValid:
        name === "password" ? validatePassword(value) : prev.isPasswordValid,
      isEmailValid: name === "email" ? validateEmail(value) : prev.isEmailValid,
      isAgeValid: name === "age" ? validAge(value) : prev.isAgeValid,
      isNumberValid:
        name === "phone_number" ? validNumber(value) : prev.isNumberValid,
      passwordMatch:
        name === "repeat_password"
          ? value === signupData.password
          : prev.passwordMatch,
    }));
  };

  return {
    signupData,
    setSignUpData,
    inputsValidation,
    setInputsValidation,
    handleChange,
  };
}
