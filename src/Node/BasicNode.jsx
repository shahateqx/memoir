import { useRef, useEffect } from "react";
import { useAppState } from "../state/AppStateContext";
import { CommandPanel } from "./CommandPanel";
import { nanoid } from "nanoid";
import cx from "classnames";
import styles from "./Node.module.css";

export const BasicNode = ({ node, index, isFocused }) => {
  const nodeRef = useRef(null);
  const showCommandPanel = isFocused && node?.value?.match(/^\//);

  const { addNode, removeNodeByIndex, changeNodeValue, changeNodeType } = useAppState();

  useEffect(() => {
    if (isFocused && nodeRef.current) {
      nodeRef.current.focus();
      // Move cursor to end
      if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
        const range = document.createRange();
        range.selectNodeContents(nodeRef.current);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }, [isFocused]);

  useEffect(() => {
    if (nodeRef.current && document.activeElement !== nodeRef.current) {
      nodeRef.current.textContent = node.value;
    }
  }, [node]);

  const parseCommand = (nodeType) => {
    if (nodeType === "page") {
      addNode({ type: nodeType, value: "", id: nanoid() }, index + 1);
      changeNodeValue(index, ""); // Clear the slash command
    } else {
      changeNodeType(index, nodeType);
      changeNodeValue(index, ""); // Clear the slash command
    }
  };

  const onInput = (e) => {
    changeNodeValue(index, e.currentTarget.textContent || "");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (node.value[0] === "/") return;
      addNode({ type: node.type, value: "", id: nanoid() }, index + 1);
    } else if (e.key === "Backspace" && !node.value) {
      e.preventDefault();
      removeNodeByIndex(index);
    }
  };

  return (
    <>
      {showCommandPanel && (
        <CommandPanel nodeText={node.value} selectItem={parseCommand} />
      )}
      <div
        ref={nodeRef}
        onInput={onInput}
        onKeyDown={onKeyDown}
        contentEditable
        suppressContentEditableWarning
        className={cx(styles.node, styles[node.type])}
        placeholder="Type '/' for commands"
      />
    </>
  );
};
