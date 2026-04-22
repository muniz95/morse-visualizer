import { useMemo } from "react";
import { useMorseVisualizer } from "../hooks/use-morse-visualizer";
import { MORSE_TREE } from "../lib/morse-tree";
import { flattenSubtree } from "../lib/flatten-subtree";
import TreeLevel, { ROW_HEIGHT } from "./components/tree-level";
import TreeLinks from "./components/tree-links";
import S from "./styles";

const MorseVisualizer = () => {
  const { activeMap } = useMorseVisualizer();
  const levels = useMemo(() => flattenSubtree(MORSE_TREE), []);
  const totalHeight = levels.length * ROW_HEIGHT;

  return (
    <S.TreeContainer style={{ height: totalHeight }}>
      <TreeLinks levels={levels} activeMap={activeMap} />
      {levels.map((nodes, depth) => (
        <TreeLevel key={depth} nodes={nodes} depth={depth} activeMap={activeMap} />
      ))}
    </S.TreeContainer>
  );
};

export default MorseVisualizer;
