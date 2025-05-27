import { useState, useRef, useEffect } from "react";
import styles from "./profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ChangingForm from "./ChangingFrom";
import ChangePasswordForms from "./ChangePasswordForms";

export function EditProfile({
  setDisabled,
  openEditor,
  passwordReset,
  setPasswordReset,
  tokenEmailParams,
}) {
  const modalRef = useRef(null);
  const closeModal = () => {
    setDisabled(false);
    setPasswordReset(false);
  };
  const [openEditorStageFirst, setOpenEditorStageFirst] = useState({
    isOpen: true,
    change: "",
  });
  const [openEditorStagePass, setOpenEditorStagePass] = useState(false);
  const [openEditorStageSecond, setOpenEditorStageSecond] = useState(false);
  useEffect(() => {
    if (passwordReset) {
      setOpenEditorStageFirst(false);
    }
  }, [passwordReset]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    if (openEditor) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openEditor]);

  const handleClick = (change) => {
    setOpenEditorStageFirst({ isOpen: false, change });
    if (change == "password") {
      setOpenEditorStagePass(true);
      return;
    } else {
      setOpenEditorStageSecond(true);
    }
  };

  return (
    <>
      <div className={styles.profileOverlay}></div>
      <div ref={modalRef} className={styles.modal}>
        <div
          onClick={() => {
            setOpenEditorStageSecond(false);
            setOpenEditorStageFirst({ isOpen: false, change: "" });
            setDisabled(false);
            setPasswordReset(false);
          }}
          className={styles.closeModal}
        >
          X
        </div>
        {openEditorStageSecond || openEditorStagePass ? (
          <div
            onClick={() => {
              setOpenEditorStageSecond(false);
              setOpenEditorStageFirst({ isOpen: true, change: "" });
              setOpenEditorStagePass(false);
            }}
            className={styles.stageOne}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="1x" />
          </div>
        ) : (
          ""
        )}

        {openEditorStageFirst.isOpen && (
          <div className={styles.editContainer}>
            <h2>Edit Profile</h2>
            {/* ["email" +++] */}
            {[
              "avatar",
              "phone_number",
              "city",
              "full_username",
              "password",
            ].map((field) => (
              <button
                key={field}
                className={styles.editOption}
                onClick={() => handleClick(field)}
              >
                Change {field.replace("_", " ")}
              </button>
            ))}
          </div>
        )}

        {openEditorStageSecond && (
          <div className={styles.formWrapper}>
            <ChangingForm
              setOpenEditorStageSecond={setOpenEditorStageSecond}
              setOpenEditorStageFirst={setOpenEditorStageFirst}
              openEditorStageFirst={openEditorStageFirst}
              setDisabled={setDisabled}
            />
          </div>
        )}
        {(openEditorStagePass || passwordReset) && (
          <div className={styles.formWrapper}>
            <ChangePasswordForms
              openEditorStageFirst={openEditorStageFirst}
              setPasswordReset={setPasswordReset}
              passwordReset={passwordReset}
              tokenEmailParams={tokenEmailParams}
            />
          </div>
        )}
      </div>
    </>
  );
}
