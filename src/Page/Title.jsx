import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppState } from "../state/AppStateContext";
import { nanoid } from "nanoid";
import styles from "./Title.module.css";

export const Title = ({ title, addNode }) => {
  const { setTitle } = useAppState();
  const headerRef = useRef(null);
  const { id: slug } = useParams();

  useEffect(() => {
    const isFocused = document.activeElement === headerRef.current;
    if (!isFocused && headerRef.current) {
      headerRef.current.textContent = title;
    }
  }, [title]);

  const onInput = (e) => {
    const newTitle = e.currentTarget.textContent || "Untitled";
    setTitle(newTitle);
    window.dispatchEvent(new CustomEvent('page-title-updated', { detail: { slug, title: newTitle } }));
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNode({ type: "text", id: nanoid(), value: "" }, 0);
    }
  };

  return (
    <div className={styles.container}>
      <h1
        className={styles.title}
        contentEditable
        suppressContentEditableWarning
        onInput={onInput}
        onKeyDown={onKeyDown}
        ref={headerRef}
      />
    </div>
  );
};
