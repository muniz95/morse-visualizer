import { dictionary } from "@/constants";

export interface MorseTreeNode {
  char: string | null;
  left: MorseTreeNode | null;  // long_signal branch
  right: MorseTreeNode | null; // short_signal branch
}

const createNode = (): MorseTreeNode => ({ char: null, left: null, right: null });

function buildMorseTree(dict: typeof dictionary): MorseTreeNode {
  const root = createNode();
  for (const [char, path] of Object.entries(dict)) {
    let node = root;
    for (const signal of path) {
      if (signal === "long_signal") {
        if (!node.left) node.left = createNode();
        node = node.left;
      } else if (signal === "short_signal") {
        if (!node.right) node.right = createNode();
        node = node.right;
      }
    }
    node.char = char;
  }
  return root;
}

export const MORSE_TREE = buildMorseTree(dictionary);
