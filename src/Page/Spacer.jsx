import styles from "./Spacer.module.css";

export const Spacer = ({ onClick, showHint }) => {
  return (
    <div className={styles.spacer} onClick={onClick}>
      {showHint && "Click to add an initial page node"}
    </div>
  );
};
