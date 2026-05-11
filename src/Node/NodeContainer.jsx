import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { NodeTypeSwitcher } from "./NodeTypeSwitcher";
import styles from "./NodeContainer.module.css";

export const NodeContainer = ({ node, index, isFocused, updateFocusedIndex }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: node.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.container}
      onClick={() => updateFocusedIndex(index)}
    >
      <div {...attributes} {...listeners} className={styles.dragHandle}>
        ⋮⋮
      </div>
      <NodeTypeSwitcher node={node} index={index} isFocused={isFocused} />
    </div>
  );
};
