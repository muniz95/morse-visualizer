import { useMorseVisualizer } from "../hooks/use-morse-visualizer";
import LongSignal from "./components/long-signal";
import ShortSignal from "./components/short-signal";
import S, {CELL, COLS, ROWS} from "./styles"

type LabelPos = "above" | "below" | "left" | "right";

type NodeDef = {
  char: string | null;
  col: number;
  row: number;
  key: number;
  type: "root" | "long" | "short";
  labelPos: LabelPos;
};

const NODES: NodeDef[] = [
  { char: null, col: 3, row: 0,  key: 0,    type: "root",  labelPos: "above" },
  { char: "T",  col: 2, row: 0,  key: 1000, type: "long",  labelPos: "above" },
  { char: "E",  col: 4, row: 0,  key: 1001, type: "short", labelPos: "above" },
  { char: "M",  col: 1, row: 0,  key: 2000, type: "long",  labelPos: "above" },
  { char: "N",  col: 2, row: 5,  key: 2001, type: "short", labelPos: "right" },
  { char: "A",  col: 4, row: 5,  key: 2002, type: "long",  labelPos: "left"  },
  { char: "I",  col: 5, row: 0,  key: 2003, type: "short", labelPos: "above" },
  { char: "O",  col: 0, row: 0,  key: 3000, type: "long",  labelPos: "above" },
  { char: "G",  col: 1, row: 2,  key: 3001, type: "short", labelPos: "right" },
  { char: "K",  col: 1, row: 5,  key: 3002, type: "long",  labelPos: "above" },
  { char: "D",  col: 2, row: 8,  key: 3003, type: "short", labelPos: "right" },
  { char: "W",  col: 4, row: 8,  key: 3004, type: "long",  labelPos: "left"  },
  { char: "R",  col: 5, row: 5,  key: 3005, type: "short", labelPos: "below" },
  { char: "U",  col: 5, row: 2,  key: 3006, type: "long",  labelPos: "left"  },
  { char: "S",  col: 6, row: 0,  key: 3007, type: "short", labelPos: "above" },
  { char: "Q",  col: 0, row: 2,  key: 4002, type: "long",  labelPos: "below" },
  { char: "Z",  col: 1, row: 4,  key: 4003, type: "short", labelPos: "right" },
  { char: "Y",  col: 0, row: 5,  key: 4004, type: "long",  labelPos: "above" },
  { char: "C",  col: 1, row: 7,  key: 4005, type: "short", labelPos: "right" },
  { char: "X",  col: 1, row: 8,  key: 4006, type: "long",  labelPos: "left"  },
  { char: "B",  col: 2, row: 10, key: 4007, type: "short", labelPos: "below" },
  { char: "J",  col: 4, row: 10, key: 4008, type: "long",  labelPos: "right" },
  { char: "P",  col: 5, row: 8,  key: 4009, type: "short", labelPos: "right" },
  { char: "L",  col: 6, row: 5,  key: 4011, type: "short", labelPos: "right" },
  { char: "F",  col: 6, row: 4,  key: 4013, type: "short", labelPos: "right" },
  { char: "V",  col: 6, row: 2,  key: 4014, type: "long",  labelPos: "right" },
  { char: "H",  col: 7, row: 0,  key: 4015, type: "short", labelPos: "above" },
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
    <S.Grid>
      <S.Svg
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
      </S.Svg>
      {NODES.map((node) => {
        const active = activeMap.get(node.key) ?? false;
        const label = node.char ?? "";
        return (
          <S.Cell key={node.key} $col={node.col} $row={node.row}>
            {node.type === "root" ? (
              <S.RootIndicator $active={active} />
            ) : (
              <S.SignalWrapper>
                {node.type === "long" ? (
                  <LongSignal $active={active} />
                ) : (
                  <ShortSignal $active={active} />
                )}
                <S.Label $active={active} $dir={node.labelPos}>{label}</S.Label>
              </S.SignalWrapper>
            )}
          </S.Cell>
        );
      })}
    </S.Grid>
  );
};

export default MorseVisualizer;
