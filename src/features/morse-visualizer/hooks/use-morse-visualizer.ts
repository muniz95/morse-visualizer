import { dictionary } from "../../../constants";
import type { MorseCodeElement } from "../../../constants";
import { useAppStore } from "../../../store";
import { formatSentence } from "../../../utils";

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

  return { sentence, morseSequence, currentIndex, currentChar, activePath };
};
