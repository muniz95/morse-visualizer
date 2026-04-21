import { useMorseVisualizer } from "../hooks/use-morse-visualizer";
import { MORSE_TREE } from "../lib/morse-tree";
import TreeNode from "./components/tree-node";
import S from "./styles";

const MorseVisualizer = () => {
  const { activePath } = useMorseVisualizer();
  return (
    <S.TreeContainer>
      <TreeNode
        node={MORSE_TREE}
        activePathSegment={activePath.length > 0 ? activePath : null}
        signalToReachThis={null}
      />
    </S.TreeContainer>
  );
};

export default MorseVisualizer;
