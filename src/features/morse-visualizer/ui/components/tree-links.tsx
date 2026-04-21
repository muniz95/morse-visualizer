import styled from "styled-components";
import type { MorseTreeNode } from "../../lib/morse-tree";
import { ROW_HEIGHT } from "./tree-level";

const NODE_RADIUS = ROW_HEIGHT / 2; // node is centered in its row

const Svg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  pointer-events: none;
  overflow: visible;
`;

interface LinkLine {
  x1: number; x2: number;
  y1: number; y2: number;
  active: boolean;
}

function subtreeLinks(
  levels: (MorseTreeNode | null)[][],
  yCenter: (d: number) => number,
  activeMap: Map<number, boolean>
): LinkLine[] {
  const lines: LinkLine[] = [];
  for (let d = 0; d < levels.length - 1; d++) {
    const nodes = levels[d];
    for (let p = 0; p < nodes.length; p++) {
      if (!nodes[p]) continue;
      const x1 = (p + 0.5) / nodes.length;
      const y1 = yCenter(d);
      const leftPos = p * 2;
      const rightPos = p * 2 + 1;
      const leftNode = levels[d + 1][leftPos];
      const rightNode = levels[d + 1][rightPos];
      if (leftNode) {
        lines.push({
          x1, y1,
          x2: (leftPos + 0.5) / (nodes.length * 2),
          y2: yCenter(d + 1),
          active: activeMap.get((d + 1) * 1000 + leftPos) ?? false,
        });
      }
      if (rightNode) {
        lines.push({
          x1, y1,
          x2: (rightPos + 0.5) / (nodes.length * 2),
          y2: yCenter(d + 1),
          active: activeMap.get((d + 1) * 1000 + rightPos) ?? false,
        });
      }
    }
  }
  return lines;
}

interface TreeLinksProps {
  eLevels: (MorseTreeNode | null)[][];
  tLevels: (MorseTreeNode | null)[][];
  eActiveMap: Map<number, boolean>;
  tActiveMap: Map<number, boolean>;
  rootActive: boolean;
}

const TreeLinks = ({
  eLevels,
  tLevels,
  eActiveMap,
  tActiveMap,
  rootActive,
}: TreeLinksProps) => {
  const eLen = eLevels.length;
  const totalHeight = (eLen + 1 + tLevels.length) * ROW_HEIGHT;

  // Absolute y for E subtree level d (inverted: level 0 is near root, level maxD is at top)
  const yE = (d: number) => (eLen - 1 - d) * ROW_HEIGHT + NODE_RADIUS;
  // Absolute y for root
  const yRoot = eLen * ROW_HEIGHT + NODE_RADIUS;
  // Absolute y for T subtree level d
  const yT = (d: number) => (eLen + 1 + d) * ROW_HEIGHT + NODE_RADIUS;

  const eLinks = subtreeLinks(eLevels, yE, eActiveMap);
  const tLinks = subtreeLinks(tLevels, yT, tActiveMap);

  return (
    <Svg style={{ height: totalHeight }} viewBox={`0 0 1 ${totalHeight}`} preserveAspectRatio="none">
      {/* Root → E connection */}
      <line
        x1={0.5} y1={yRoot}
        x2={0.5} y2={yE(0)}
        stroke={rootActive && (eActiveMap.get(0) ?? false) ? "var(--accent)" : "var(--border)"}
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
      {/* Root → T connection */}
      <line
        x1={0.5} y1={yRoot}
        x2={0.5} y2={yT(0)}
        stroke={rootActive && (tActiveMap.get(0) ?? false) ? "var(--accent)" : "var(--border)"}
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
      {[...eLinks, ...tLinks].map((l, i) => (
        <line
          key={i}
          x1={l.x1} y1={l.y1}
          x2={l.x2} y2={l.y2}
          stroke={l.active ? "var(--accent)" : "var(--border)"}
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </Svg>
  );
};

export default TreeLinks;
