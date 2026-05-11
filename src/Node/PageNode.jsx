import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state/AppStateContext";
import { supabase } from "../supabaseClient";
import cx from "classnames";
import styles from "./Node.module.css";

export const PageNode = ({ node, index, isFocused }) => {
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState("Loading...");
  const { removeNodeByIndex } = useAppState();

  useEffect(() => {
    const fetchPageTitle = async () => {
      if (node.value) {
        const { data } = await supabase
          .from("pages")
          .select("title")
          .eq("slug", node.value)
          .single();
        if (data) {
          setPageTitle(data.title || "Untitled");
        }
      }
    };
    fetchPageTitle();
  }, [node.value]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace" && isFocused) {
        e.preventDefault();
        removeNodeByIndex(index);
      } else if (e.key === "Enter" && isFocused) {
        e.preventDefault();
        navigate(`/${node.value}`);
      }
    };

    if (isFocused) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, index, navigate, node.value, removeNodeByIndex]);

  const navigateToPage = () => {
    if (node.value) {
      navigate(`/${node.value}`);
    }
  };

  return (
    <div
      onClick={navigateToPage}
      className={cx(styles.node, styles.pageLink, { [styles.focused]: isFocused })}
    >
      <span className={styles.pageIcon}>📄</span>
      <span>{node.value ? pageTitle : "Empty Page"}</span>
    </div>
  );
};
