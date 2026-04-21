import { create } from "zustand";
import { dictionary } from "./constants";
import { formatSentence } from "./utils";

interface State {
  morseInput: string;
  setMorseInput: (value: string) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  currentChar: string;
  setCurrentChar: (char: string) => void;
  currentSignalIndex: number;
  play: () => void;
}

const initialState = {
  morseInput: "",
  currentIndex: 0,
  currentChar: "",
  currentSignalIndex: -1,
};

export const useAppStore = create<State>((set, get) => ({
  ...initialState,
  setMorseInput: (value) => set({ morseInput: value }),
  setCurrentIndex: (value) => set({ currentIndex: value }),
  setCurrentChar: (value) => set({ currentChar: value }),
  play: async () => {
    const sentence = formatSentence(get().morseInput).split("");
    for (let charIdx = 0; charIdx < sentence.length; charIdx++) {
      const char = sentence[charIdx];
      set({ currentIndex: charIdx, currentChar: char, currentSignalIndex: -1 });
      const signals = dictionary[char] ?? [];
      for (let sigIdx = 0; sigIdx < signals.length; sigIdx++) {
        set({ currentSignalIndex: sigIdx });
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    set({ currentIndex: 0, currentChar: "", currentSignalIndex: -1 });
  },
}));
