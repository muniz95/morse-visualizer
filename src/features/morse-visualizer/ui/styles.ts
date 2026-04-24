import styled from "styled-components";

export const COLS = 9;
export const ROWS = 11;
export const CELL = 44;

export const TreeContainer = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
  min-width: 512px;
`;

const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${COLS}, ${CELL}px);
  grid-template-rows: repeat(${ROWS}, ${CELL}px);
  width: ${COLS * CELL}px;
  margin: 0 auto;
`;

const Cell = styled.div<{ $col: number; $row: number }>`
  grid-column: ${({ $col }) => $col + 1};
  grid-row: ${({ $row }) => $row + 1};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RootIndicator = styled.div<{ $active?: boolean }>`
  width: 0;
  height: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-top: 19px solid ${({ $active }) => ($active ? "var(--accent)" : "var(--border)")};
  filter: ${({ $active }) => ($active ? "drop-shadow(0 0 6px var(--accent))" : "none")};
  transition: border-top-color 0.2s ease, filter 0.2s ease;
`;

const Svg = styled.svg`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: visible;
`;

const SignalWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.span<{ $active?: boolean; $dir: "above" | "below" | "left" | "right" }>`
  position: absolute;
  font-size: 9px;
  font-weight: 600;
  color: ${({ $active }) => ($active ? "var(--accent)" : "var(--text)")};
  transition: color 0.2s ease;
  line-height: 1;
  white-space: nowrap;
  ${({ $dir }) =>
    $dir === "above" ? "bottom: calc(100% + 3px); left: 50%; transform: translateX(-50%);" :
    $dir === "below" ? "top: calc(100% + 3px); left: 50%; transform: translateX(-50%);" :
    $dir === "left"  ? "right: calc(100% + 3px); top: 50%; transform: translateY(-50%);" :
                       "left: calc(100% + 3px); top: 50%; transform: translateY(-50%);"}
`;

const S = { Cell, Grid, Label, RootIndicator, SignalWrapper, Svg, TreeContainer };

export default S;
