import styled from "styled-components";
import type { MorseTreeNode } from "../../lib/morse-tree";
import LongSignal from "./long-signal";
import ShortSignal from "./short-signal";

export const ROW_HEIGHT = 56;

const Row = styled.div`
  display: flex;
  width: 100%;
  height: ${ROW_HEIGHT}px;
`;

const Cell = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RootIndicator = styled.div<{ $active?: boolean }>`
  width: 0;
  height: 0;
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-top: 19px solid ${({ $active }) => ($active ? "var(--accent)" : "var(--border)")};
  filter: ${({ $active }) => ($active ? "drop-shadow(0 0 6px var(--accent))" : "none")};
  transition: border-top-color 0.2s ease, filter 0.2s ease;
`;

interface TreeLevelProps {
  nodes: (MorseTreeNode | null)[];
  depth: number;
  activeMap: Map<number, boolean>;
}

const TreeLevel = ({ nodes, depth, activeMap }: TreeLevelProps) => (
  <Row>
    {nodes.map((node, pos) => {
      const isActive = activeMap.get(depth === 0 ? 0 : depth * 1000 + pos) ?? false;
      const content = node?.char?.toUpperCase() ?? "";
      const isRoot = depth === 0 && pos === 0;
      const signal = pos % 2 === 0 ? "long_signal" : "short_signal";

      return (
        <Cell key={pos}>
          {node &&
            (isRoot ? (
              <RootIndicator $active={isActive} />
            ) : signal === "long_signal" ? (
              <LongSignal $content={content} $active={isActive} />
            ) : (
              <ShortSignal $content={content} $active={isActive} />
            ))}
        </Cell>
      );
    })}
  </Row>
);

export default TreeLevel;
