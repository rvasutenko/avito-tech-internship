import {
  Group,
  Text,
  Tree,
  useTree,
  type RenderTreeNodePayload,
} from "@mantine/core";
import { CaretDownIcon } from "@phosphor-icons/react";
import { CategoryNode } from "./CategoryNode";
import { categoriesTree } from "../config";

export const TreeView = () => {
  const tree = useTree({ initialExpandedState: { root: true } });

  const renderTreeNode = ({
    node,
    expanded,
    hasChildren,
    elementProps,
  }: RenderTreeNodePayload) => {
    return hasChildren ? (
      <Group {...elementProps} justify="space-between" align="center">
        <Text size="sm">{node.label}</Text>
        <CaretDownIcon
          size={18}
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </Group>
    ) : (
      <CategoryNode node={node} />
    );
  };

  return (
    <Tree
      tree={tree}
      data={categoriesTree}
      levelOffset={0}
      renderNode={renderTreeNode}
      keepMounted
    />
  );
};
