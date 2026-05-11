import { useState, useEffect } from "react";

export const useFocusedNodeIndex = ({ nodes }) => {
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        setFocusedNodeIndex((index) => Math.max(index - 1, 0));
      } else if (e.key === "ArrowDown") {
        setFocusedNodeIndex((index) => Math.min(index + 1, nodes.length - 1));
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [nodes]);

  return [focusedNodeIndex, setFocusedNodeIndex];
};
