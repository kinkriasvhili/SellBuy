import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faAsterisk,
} from "@fortawesome/free-solid-svg-icons";
// asterisk
export function SignForm({
  label,
  type,
  placeholder,
  name,
  handleChange,
  value,
  className,
}) {
  const [inputFocus, setInputFocus] = useState(false);
  return (
    <div>
      <label className={inputFocus ? className : ""}>
        {label}{" "}
        <FontAwesomeIcon
          icon={faAsterisk}
          size="1x"
          className={inputFocus ? className : "asterisk-icon"}
        />
        :
      </label>
      <input
        min={type === "number" ? "0" : undefined}
        type={type}
        placeholder={placeholder}
        value={value[name]}
        onChange={(e) => {
          handleChange(e, name);
        }}
        onFocusCapture={() => {
          setInputFocus(true);
        }}
        name={name}
      />
    </div>
  );
}

export function Password({
  label,
  placeholder,
  name,
  handleChange,
  value,
  className,
}) {
  const [passwordSee, setPasswordSee] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <label className={inputFocus ? className : "asterisk-icon"}>
        {label}{" "}
        <FontAwesomeIcon
          icon={faAsterisk}
          size="0.5x"
          className={inputFocus ? className : "asterisk-icon"}
        />
        :
      </label>
      <input
        type={passwordSee ? "text" : "password"}
        placeholder={placeholder}
        style={{ paddingRight: "30px" }}
        onChange={(e) => {
          handleChange(e, name);
          setInputFocus(true);
        }}
        name={name}
        value={value[name]}
        onFocusCapture={() => {
          setInputFocus(true);
        }}
      />
      <button
        type="button"
        onClick={() => setPasswordSee(!passwordSee)}
        style={{
          position: "absolute",
          right: "2%",
          top: "50%",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon icon={passwordSee ? faEyeSlash : faEye} />
      </button>
    </div>
  );
}

export function AddProductsInput({
  label,
  placeholder,
  name,
  handleChange,
  value,
  type,
}) {
  return (
    <div>
      <label className="addProductsLabel">{label}</label>
      <input
        min={type === "number" ? "0" : undefined}
        type={type}
        placeholder={placeholder}
        value={value[name]}
        onChange={(e) => {
          handleChange(e, name);
        }}
        name={name}
      />
    </div>
  );
}
