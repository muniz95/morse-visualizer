import styled from "styled-components";
import type { MorseTreeNode } from "../../lib/morse-tree";
import { ROW_HEIGHT } from "./tree-level";

const NODE_CENTER_Y = ROW_HEIGHT / 2;

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

interface TreeLinksProps {
  levels: (MorseTreeNode | null)[][];
  activeMap: Map<number, boolean>;
}

const TreeLinks = ({ levels, activeMap }: TreeLinksProps) => {
  const totalHeight = levels.length * ROW_HEIGHT;
  const lines: LinkLine[] = [];

  for (let d = 0; d < levels.length - 1; d++) {
    const nodes = levels[d];
    for (let p = 0; p < nodes.length; p++) {
      if (!nodes[p]) continue;
      const x1 = (p + 0.5) / nodes.length;
      const y1 = d * ROW_HEIGHT + NODE_CENTER_Y;
      const leftPos = p * 2;
      const rightPos = p * 2 + 1;
      if (levels[d + 1][leftPos]) {
        lines.push({
          x1, y1,
          x2: (leftPos + 0.5) / (nodes.length * 2),
          y2: (d + 1) * ROW_HEIGHT + NODE_CENTER_Y,
          active: activeMap.get((d + 1) * 1000 + leftPos) ?? false,
        });
      }
      if (levels[d + 1][rightPos]) {
        lines.push({
          x1, y1,
          x2: (rightPos + 0.5) / (nodes.length * 2),
          y2: (d + 1) * ROW_HEIGHT + NODE_CENTER_Y,
          active: activeMap.get((d + 1) * 1000 + rightPos) ?? false,
        });
      }
    }
  }

  return (
    <Svg style={{ height: totalHeight }} viewBox={`0 0 1 ${totalHeight}`} preserveAspectRatio="none">
      {lines.map((l, i) => (
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
