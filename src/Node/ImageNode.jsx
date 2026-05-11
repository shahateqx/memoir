import { useRef, useEffect } from "react";
import { useAppState } from "../state/AppStateContext";
import { uploadImage } from "../utils/uploadImage";
import { FileImage } from "../components/FileImage";
import styles from "./Node.module.css";
import cx from "classnames";

export const ImageNode = ({ node, index, isFocused }) => {
  const fileInputRef = useRef(null);
  const { changeNodeValue, removeNodeByIndex } = useAppState();

  useEffect(() => {
    if (!node.value && isFocused) {
      fileInputRef.current?.click();
    }
  }, [node.value, isFocused]);

  const onImageUpload = async (e) => {
    const target = e.target;
    if (target.files?.[0]) {
      try {
        const url = await uploadImage(target.files[0]);
        changeNodeValue(index, url);
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    } else {
      // If no file selected and node was just created, remove it
      if (!node.value) {
        removeNodeByIndex(index);
      }
    }
  };

  return (
    <div className={cx(styles.node, styles.imageContainer)}>
      {node.value ? (
        <FileImage className={styles.image} filePath={node.value} />
      ) : (
        <div>Uploading image...</div>
      )}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={onImageUpload}
      />
    </div>
  );
};
