import { useState, useRef, useEffect } from "react";
import styles from "./profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ChangingForm from "./ChangingFrom";

export function EditProfile({ setDisabled, openEditor }) {
  const modalRef = useRef(null);
  const closeModal = () => setDisabled(false);
  const [openEditorStageFirst, setOpenEditorStageFirst] = useState({
    isOpen: true,
    change: "",
  });
  const [openEditorStageSecond, setOpenEditorStageSecond] = useState(false);

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
    setOpenEditorStageSecond(true);
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
          }}
          className={styles.closeModal}
        >
          X
        </div>
        {openEditorStageSecond ? (
          <div
            onClick={() => {
              setOpenEditorStageSecond(false);
              setOpenEditorStageFirst({ isOpen: true, change: "" });
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
      </div>
    </>
  );
}
