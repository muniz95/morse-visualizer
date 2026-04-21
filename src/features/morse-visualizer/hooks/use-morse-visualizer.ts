import { dictionary } from "../../../constants";
import type { MorseCodeElement } from "../../../constants";
import { useAppStore } from "../../../store";
import { formatSentence } from "../../../utils";

// key = depth * 1000 + position within the subtree
function buildActiveMap(subtreePath: MorseCodeElement[]): Map<number, boolean> {
  const map = new Map<number, boolean>();
  if (subtreePath.length === 0) return map;
  map.set(0, true); // depth 0, pos 0 = the subtree root (T or E)
  let pos = 0;
  for (let d = 0; d < subtreePath.length; d++) {
    pos = pos * 2 + (subtreePath[d] === "long_signal" ? 0 : 1);
    map.set((d + 1) * 1000 + pos, true);
  }
  return map;
}

export const useMorseVisualizer = () => {
  const morseInput = useAppStore((state) => formatSentence(state.morseInput));
  const currentIndex = useAppStore((state) => state.currentIndex);
  const currentChar = useAppStore((state) => state.currentChar);
  const currentSignalIndex = useAppStore((state) => state.currentSignalIndex);
  const sentence = formatSentence(morseInput).split("");
  const morseSequence = sentence.map((char) => dictionary[char]);

  const activePath: MorseCodeElement[] =
    currentChar && dictionary[currentChar]
      ? dictionary[currentChar].slice(0, currentSignalIndex + 1)
      : [];

  const rootActive = activePath.length > 0;
  const tActivePath = rootActive && activePath[0] === "long_signal" ? activePath.slice(1) : [];
  const eActivePath = rootActive && activePath[0] === "short_signal" ? activePath.slice(1) : [];

  const tActiveMap = buildActiveMap(tActivePath);
  const eActiveMap = buildActiveMap(eActivePath);

  return {
    sentence,
    morseSequence,
    currentIndex,
    currentChar,
    activePath,
    rootActive,
    tActiveMap,
    eActiveMap,
  };
};
