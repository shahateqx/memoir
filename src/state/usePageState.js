import { useSyncedState } from "./useSyncedState";
import { updatePage } from "../utils/updatePage";

export const usePageState = (initialState) => {
  const [page, setPage] = useSyncedState(initialState, updatePage);

  const addNode = (node, index) => {
    setPage((draft) => {
      draft.nodes.splice(index, 0, node);
    });
  };

  const removeNodeByIndex = (index) => {
    setPage((draft) => {
      draft.nodes.splice(index, 1);
    });
  };

  const changeNodeValue = (index, value) => {
    setPage((draft) => {
      draft.nodes[index].value = value;
    });
  };

  const changeNodeType = (index, type) => {
    setPage((draft) => {
      draft.nodes[index].type = type;
      draft.nodes[index].value = "";
    });
  };

  const setNodes = (nodes) => {
    setPage((draft) => {
      draft.nodes = nodes;
    });
  };

  const setTitle = (title) => {
    setPage((draft) => {
      draft.title = title;
    });
  };

  const setCoverImage = (cover) => {
    setPage((draft) => {
      draft.cover = cover;
    });
  };

  return {
    nodes: page.nodes,
    title: page.title,
    cover: page.cover,
    pageId: page.id,
    addNode,
    removeNodeByIndex,
    changeNodeValue,
    changeNodeType,
    setNodes,
    setTitle,
    setCoverImage,
  };
};
