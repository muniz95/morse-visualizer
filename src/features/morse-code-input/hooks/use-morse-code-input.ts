import { useState } from "react";

export const useMorseCodeInput = () => {
  const [input, setInput] = useState<string>();

  return {
    input,
    setInput,
  };
};
