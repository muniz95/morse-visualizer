import type { MorseTreeNode } from "./morse-tree";

export function flattenSubtree(root: MorseTreeNode): (MorseTreeNode | null)[][] {
  const levels: (MorseTreeNode | null)[][] = [];
  let current: (MorseTreeNode | null)[] = [root];

  while (current.some((n) => n !== null)) {
    levels.push(current);
    current = current.flatMap((n) => [n?.left ?? null, n?.right ?? null]);
  }

  return levels;
}
