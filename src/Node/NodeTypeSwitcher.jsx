import { BasicNode } from "./BasicNode";
import { ImageNode } from "./ImageNode";
import { PageNode } from "./PageNode";

export const NodeTypeSwitcher = ({ node, index, isFocused }) => {
  switch (node.type) {
    case "text":
    case "list":
    case "heading1":
    case "heading2":
    case "heading3":
      return <BasicNode node={node} index={index} isFocused={isFocused} />;
    case "image":
      return <ImageNode node={node} index={index} isFocused={isFocused} />;
    case "page":
      return <PageNode node={node} index={index} isFocused={isFocused} />;
    default:
      return null;
  }
};
