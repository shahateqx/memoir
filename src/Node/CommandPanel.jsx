import { useState, useEffect, useRef } from "react";
import { useOverflowsScreenBottom } from "./useOverflowsScreenBottom";
import styles from "./CommandPanel.module.css";
import cx from "classnames";

const supportedNodeTypes = [
  { value: "text", name: "Text" },
  { value: "list", name: "List" },
  { value: "heading1", name: "Heading 1" },
  { value: "heading2", name: "Heading 2" },
  { value: "heading3", name: "Heading 3" },
  { value: "image", name: "Image" },
  { value: "page", name: "Page" },
];

export const CommandPanel = ({ selectItem }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const ref = useRef(null);
  const overflows = useOverflowsScreenBottom(ref);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        selectItem(supportedNodeTypes[selectedItemIndex].value);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedItemIndex((prev) => Math.min(prev + 1, supportedNodeTypes.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedItemIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemIndex, selectItem]);

  return (
    <div ref={ref} className={cx(styles.panel, { [styles.reverse]: overflows })}>
      <div className={styles.title}>Blocks</div>
      <ul>
        {supportedNodeTypes.map((type, index) => (
          <li
            key={type.value}
            className={cx({ [styles.selected]: selectedItemIndex === index })}
            onClick={() => selectItem(type.value)}
          >
            {type.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
