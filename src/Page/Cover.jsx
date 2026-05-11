import { useRef } from "react";
import { uploadImage } from "../utils/uploadImage";
import { useAppState } from "../state/AppStateContext";
import { FileImage } from "../components/FileImage";
import styles from "./Cover.module.css";

export const Cover = ({ filePath }) => {
  const fileInputRef = useRef(null);
  const { setCoverImage } = useAppState();

  const onChangeCoverImage = () => {
    fileInputRef.current?.click();
  };

  const onCoverImageUpload = async (e) => {
    const target = e.target;
    if (target.files?.[0]) {
      const url = await uploadImage(target.files[0]);
      setCoverImage(url);
    }
  };

  return (
    <div className={styles.cover}>
      {filePath ? (
        <FileImage className={styles.image} filePath={filePath} />
      ) : (
        <div className={styles.emptyCover} />
      )}
      <button className={styles.button} onClick={onChangeCoverImage}>
        Change cover
      </button>
      <input
        onChange={onCoverImageUpload}
        style={{ display: "none" }}
        ref={fileInputRef}
        type="file"
        accept="image/*"
      />
    </div>
  );
};
