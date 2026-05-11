import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useAppState } from "../state/AppStateContext";
import { useFocusedNodeIndex } from "./useFocusedNodeIndex";
import { Cover } from "./Cover";
import { Title } from "./Title";
import { Spacer } from "./Spacer";
import { NodeContainer } from "../Node/NodeContainer";
import styles from "./Page.module.css";

export const Page = () => {
  const { title, nodes, addNode, cover, setNodes } = useAppState();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({ nodes });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = nodes.findIndex((node) => node.id === active.id);
      const newIndex = nodes.findIndex((node) => node.id === over.id);

      const newNodes = [...nodes];
      const [removed] = newNodes.splice(oldIndex, 1);
      newNodes.splice(newIndex, 0, removed);
      setNodes(newNodes);
    }
  };

  return (
    <div className={styles.page}>
      <Cover filePath={cover} />
      <div className={styles.container}>
        <Title addNode={addNode} title={title} />
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={nodes} strategy={verticalListSortingStrategy}>
            {nodes.map((node, index) => (
              <NodeContainer
                key={node.id}
                node={node}
                index={index}
                isFocused={focusedNodeIndex === index}
                updateFocusedIndex={setFocusedNodeIndex}
              />
            ))}
          </SortableContext>
        </DndContext>
        <Spacer
          showHint={!nodes.length}
          onClick={() => {
            addNode({ type: "text", value: "", id: Date.now().toString() }, nodes.length);
          }}
        />
      </div>
    </div>
  );
};
