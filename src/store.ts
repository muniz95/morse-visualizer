import { create } from 'zustand';
import { dictionary } from '@/constants';
import { formatSentence } from '@/utils';
import { playTone } from '@/lib/sound';

interface State {
  morseInput: string;
  setMorseInput: (value: string) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  currentChar: string;
  setCurrentChar: (char: string) => void;
  speed: number;
  setSpeed: (value: number) => void;
  currentSignalIndex: number;
  isCharDone: boolean;
  play: () => void;
}

const initialState = {
  morseInput: '',
  currentIndex: 0,
  speed: 100,
  currentChar: '',
  currentSignalIndex: -1,
  isCharDone: false,
};

export const useAppStore = create<State>((set, get) => ({
  ...initialState,
  setMorseInput: (value) => set({ morseInput: value }),
  setCurrentIndex: (value) => set({ currentIndex: value }),
  setCurrentChar: (value) => set({ currentChar: value }),
  setSpeed: (value) => set({ speed: value }),
  play: async () => {
    const sentence = formatSentence(get().morseInput).split('');
    for (let charIdx = 0; charIdx < sentence.length; charIdx++) {
      const char = sentence[charIdx];
      set({
        currentIndex: charIdx,
        currentChar: char,
        currentSignalIndex: -1,
        isCharDone: false,
      });
      const signals = dictionary[char] ?? [];
      for (let sigIdx = 0; sigIdx < signals.length; sigIdx++) {
        const signal = signals[sigIdx];
        set({ currentSignalIndex: sigIdx });
        const duration = (signal === 'long_signal' ? 300 : 100) / (get().speed / 100);
        await playTone(duration);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      set({ isCharDone: true });
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    set({
      currentIndex: 0,
      currentChar: '',
      currentSignalIndex: -1,
      isCharDone: false,
    });
  },
}));
