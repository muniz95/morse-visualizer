import styled from "styled-components";
import { useMorseVisualizer } from "../hooks/use-morse-visualizer";
import LongSignal from "./components/long-signal";
import ShortSignal from "./components/short-signal";

const COLS = 8;
const ROWS = 11;
const CELL = 50;

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

type NodeDef = {
  char: string | null;
  col: number;
  row: number;
  key: number;
  type: "root" | "long" | "short";
};

const NODES: NodeDef[] = [
  { char: null, col: 3, row: 0,  key: 0,    type: "root"  },
  { char: "T",  col: 2, row: 0,  key: 1000, type: "long"  },
  { char: "E",  col: 4, row: 0,  key: 1001, type: "short" },
  { char: "M",  col: 1, row: 0,  key: 2000, type: "long"  },
  { char: "N",  col: 2, row: 5,  key: 2001, type: "short" },
  { char: "A",  col: 4, row: 5,  key: 2002, type: "long"  },
  { char: "I",  col: 5, row: 0,  key: 2003, type: "short" },
  { char: "O",  col: 0, row: 0,  key: 3000, type: "long"  },
  { char: "G",  col: 1, row: 2,  key: 3001, type: "short" },
  { char: "K",  col: 1, row: 5,  key: 3002, type: "long"  },
  { char: "D",  col: 2, row: 8,  key: 3003, type: "short" },
  { char: "W",  col: 4, row: 8,  key: 3004, type: "long"  },
  { char: "R",  col: 5, row: 5,  key: 3005, type: "short" },
  { char: "U",  col: 5, row: 2,  key: 3006, type: "long"  },
  { char: "S",  col: 6, row: 0,  key: 3007, type: "short" },
  { char: "Q",  col: 0, row: 2,  key: 4002, type: "long"  },
  { char: "Z",  col: 1, row: 4,  key: 4003, type: "short" },
  { char: "Y",  col: 0, row: 5,  key: 4004, type: "long"  },
  { char: "C",  col: 1, row: 7,  key: 4005, type: "short" },
  { char: "X",  col: 1, row: 8,  key: 4006, type: "long"  },
  { char: "B",  col: 2, row: 10, key: 4007, type: "short" },
  { char: "J",  col: 4, row: 10, key: 4008, type: "long"  },
  { char: "P",  col: 5, row: 8,  key: 4009, type: "short" },
  { char: "L",  col: 6, row: 5,  key: 4011, type: "short" },
  { char: "F",  col: 6, row: 4,  key: 4013, type: "short" },
  { char: "V",  col: 6, row: 2,  key: 4014, type: "long"  },
  { char: "H",  col: 7, row: 0,  key: 4015, type: "short" },
];

// [col1, row1, col2, row2, keyA, keyB]
type ConnDef = [number, number, number, number, number, number];

const CONNECTIONS: ConnDef[] = [
  // row 0 horizontal spine
  [0, 0, 1, 0, 3000, 2000],
  [1, 0, 2, 0, 2000, 1000],
  [2, 0, 3, 0, 1000, 0],
  [3, 0, 4, 0, 0,    1001],
  [4, 0, 5, 0, 1001, 2003],
  [5, 0, 6, 0, 2003, 3007],
  [6, 0, 7, 0, 3007, 4015],
  // row 2 horizontal
  [0, 2, 1, 2, 4002, 3001],
  // row 5 horizontal
  [0, 5, 1, 5, 4004, 3002],
  [1, 5, 2, 5, 3002, 2001],
  [4, 5, 5, 5, 2002, 3005],
  [5, 5, 6, 5, 3005, 4011],
  // row 8 horizontal
  [1, 8, 2, 8, 4006, 3003],
  [4, 8, 5, 8, 3004, 4009],
  // col1 vertical
  [1, 0, 1, 2, 2000, 3001],
  [1, 2, 1, 4, 3001, 4003],
  [1, 4, 1, 5, 4003, 3002],
  [1, 5, 1, 7, 3002, 4005],
  [1, 7, 1, 8, 4005, 4006],
  // col2 vertical
  [2, 0, 2, 5, 1000, 2001],
  [2, 5, 2, 8, 2001, 3003],
  [2, 8, 2, 10, 3003, 4007],
  // col4 vertical
  [4, 0, 4, 5, 1001, 2002],
  [4, 5, 4, 8, 2002, 3004],
  [4, 8, 4, 10, 3004, 4008],
  // col5 vertical
  [5, 0, 5, 2, 2003, 3006],
  // col6 vertical
  [6, 0, 6, 2, 3007, 4014],
  [6, 2, 6, 4, 4014, 4013],
];

const MorseVisualizer = () => {
  const { activeMap } = useMorseVisualizer();

  return (
    <Grid>
      <Svg
        width={COLS * CELL}
        height={ROWS * CELL}
        viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
      >
        {CONNECTIONS.map(([c1, r1, c2, r2, ka, kb], i) => {
          const active = (activeMap.get(ka) ?? false) && (activeMap.get(kb) ?? false);
          return (
            <line
              key={i}
              x1={c1 * CELL + CELL / 2}
              y1={r1 * CELL + CELL / 2}
              x2={c2 * CELL + CELL / 2}
              y2={r2 * CELL + CELL / 2}
              stroke={active ? "var(--accent)" : "var(--border)"}
              strokeWidth={1.5}
            />
          );
        })}
      </Svg>
      {NODES.map((node) => {
        const active = activeMap.get(node.key) ?? false;
        const label = node.char ?? "";
        return (
          <Cell key={node.key} $col={node.col} $row={node.row}>
            {node.type === "root" ? (
              <RootIndicator $active={active} />
            ) : node.type === "long" ? (
              <LongSignal $content={label} $active={active} />
            ) : (
              <ShortSignal $content={label} $active={active} />
            )}
          </Cell>
        );
      })}
    </Grid>
  );
};

export default MorseVisualizer;
