import styled from "styled-components";
import type { MorseCodeElement } from "../../../../constants";
import type { MorseTreeNode } from "../../lib/morse-tree";
import LongSignal from "./long-signal";
import ShortSignal from "./short-signal";
import TreeLink from "./tree-link";

const NodeSlot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ChildrenRow = styled.div`
  display: flex;
  width: 100%;
`;

const ChildSlot = styled.div`
  flex: 1;
  position: relative;
  padding-top: 60px;
`;

const RootNode = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--border);
  flex-shrink: 0;
`;

interface TreeNodeProps {
  node: MorseTreeNode;
  activePathSegment: MorseCodeElement[] | null;
  signalToReachThis: "short_signal" | "long_signal" | null;
}

const TreeNode = ({
  node,
  activePathSegment,
  signalToReachThis,
}: TreeNodeProps) => {
  const isActive = activePathSegment !== null;
  const content = node.char?.toUpperCase() ?? "";

  const leftSegment =
    activePathSegment?.[0] === "long_signal"
      ? activePathSegment.slice(1)
      : null;
  const rightSegment =
    activePathSegment?.[0] === "short_signal"
      ? activePathSegment.slice(1)
      : null;

  const hasChildren = node.left !== null || node.right !== null;

  const nodeEl =
    signalToReachThis === null ? (
      <RootNode />
    ) : signalToReachThis === "long_signal" ? (
      <LongSignal $content={content} $active={isActive} />
    ) : (
      <ShortSignal $content={content} $active={isActive} />
    );

  return (
    <NodeSlot>
      {nodeEl}
      {hasChildren && (
        <ChildrenRow>
          <ChildSlot>
            {node.left && (
              <>
                <TreeLink $side="left" $active={leftSegment !== null} />
                <TreeNode
                  node={node.left}
                  activePathSegment={leftSegment}
                  signalToReachThis="long_signal"
                />
              </>
            )}
          </ChildSlot>
          <ChildSlot>
            {node.right && (
              <>
                <TreeLink $side="right" $active={rightSegment !== null} />
                <TreeNode
                  node={node.right}
                  activePathSegment={rightSegment}
                  signalToReachThis="short_signal"
                />
              </>
            )}
          </ChildSlot>
        </ChildrenRow>
      )}
    </NodeSlot>
  );
};

export default TreeNode;
