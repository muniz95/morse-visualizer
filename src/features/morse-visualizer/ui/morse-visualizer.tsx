import { useMemo } from "react";
import styled from "styled-components";
import { useMorseVisualizer } from "../hooks/use-morse-visualizer";
import { MORSE_TREE } from "../lib/morse-tree";
import { flattenSubtree } from "../lib/flatten-subtree";
import TreeLevel, { ROW_HEIGHT } from "./components/tree-level";
import TreeLinks from "./components/tree-links";
import S from "./styles";

const RootRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${ROW_HEIGHT}px;
`;

const RootNode = styled.div<{ $active?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid ${({ $active }) => ($active ? "var(--accent)" : "var(--border)")};
  box-shadow: ${({ $active }) => ($active ? "0 0 8px 2px var(--accent)" : "none")};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  flex-shrink: 0;
`;

const MorseVisualizer = () => {
  const { rootActive, tActiveMap, eActiveMap } = useMorseVisualizer();

  const tLevels = useMemo(() => flattenSubtree(MORSE_TREE.left!), []);
  const eLevels = useMemo(() => flattenSubtree(MORSE_TREE.right!), []);
  const totalHeight = (eLevels.length + 1 + tLevels.length) * ROW_HEIGHT;

  return (
    <S.TreeContainer style={{ height: totalHeight }}>
      <TreeLinks
        eLevels={eLevels}
        tLevels={tLevels}
        eActiveMap={eActiveMap}
        tActiveMap={tActiveMap}
        rootActive={rootActive}
      />

      {/* E subtree — rendered in reverse (deepest level at top) */}
      {[...eLevels].reverse().map((nodes, reversedIdx) => {
        const depth = eLevels.length - 1 - reversedIdx;
        return (
          <TreeLevel
            key={`e-${depth}`}
            nodes={nodes}
            depth={depth}
            rootSignal="short_signal"
            activeMap={eActiveMap}
          />
        );
      })}

      <RootRow>
        <RootNode $active={rootActive} />
      </RootRow>

      {/* T subtree — rendered normally (T at top, deepest at bottom) */}
      {tLevels.map((nodes, depth) => (
        <TreeLevel
          key={`t-${depth}`}
          nodes={nodes}
          depth={depth}
          rootSignal="long_signal"
          activeMap={tActiveMap}
        />
      ))}
    </S.TreeContainer>
  );
};

export default MorseVisualizer;
