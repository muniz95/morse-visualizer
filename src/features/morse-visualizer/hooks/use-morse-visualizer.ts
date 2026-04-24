import { dictionary } from "../../../constants";
import type { MorseCodeElement } from "../../../constants";
import { useAppStore } from "../../../store";
import { formatSentence } from "../../../utils";

// key = depth * 1000 + position within the full tree
function buildActiveMap(activePath: MorseCodeElement[]): Map<number, boolean> {
  const map = new Map<number, boolean>();
  if (activePath.length === 0) return map;
  map.set(0, true); // root (depth 0, pos 0)
  let pos = 0;
  for (let d = 0; d < activePath.length; d++) {
    pos = pos * 2 + (activePath[d] === "long_signal" ? 0 : 1);
    map.set((d + 1) * 1000 + pos, true);
  }
  return map;
}

export const useMorseVisualizer = () => {
  const morseInput = useAppStore((state) => formatSentence(state.morseInput));
  const currentIndex = useAppStore((state) => state.currentIndex);
  const currentChar = useAppStore((state) => state.currentChar);
  const currentSignalIndex = useAppStore((state) => state.currentSignalIndex);
  const isCharDone = useAppStore((state) => state.isCharDone);
  const sentence = formatSentence(morseInput).split("");
  const morseSequence = sentence.map((char) => dictionary[char]);

  const activePath: MorseCodeElement[] =
    !isCharDone && currentChar && dictionary[currentChar]
      ? dictionary[currentChar].slice(0, currentSignalIndex + 1)
      : [];

  const activeMap = buildActiveMap(activePath);

  return {
    sentence,
    morseSequence,
    currentIndex,
    currentChar,
    activePath,
    activeMap,
  };
};
