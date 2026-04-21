import styled from "styled-components";
import type { MorseTreeNode } from "../../lib/morse-tree";
import LongSignal from "./long-signal";
import ShortSignal from "./short-signal";

export const ROW_HEIGHT = 40;

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

const RootSignal = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid var(--border);
  flex-shrink: 0;
`;

interface TreeLevelProps {
  nodes: (MorseTreeNode | null)[];
  depth: number;
  rootSignal: "long_signal" | "short_signal";
  activeMap: Map<number, boolean>;
}

const TreeLevel = ({ nodes, depth, rootSignal, activeMap }: TreeLevelProps) => (
  <Row>
    {nodes.map((node, pos) => {
      const isActive = activeMap.get(depth * 1000 + pos) ?? false;
      const content = node?.char?.toUpperCase() ?? "";
      const signal = depth === 0 ? rootSignal : pos % 2 === 0 ? "long_signal" : "short_signal";

      return (
        <Cell key={pos}>
          {node &&
            (depth === 0 && pos === 0 && nodes.length === 1 ? (
              <RootSignal />
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
