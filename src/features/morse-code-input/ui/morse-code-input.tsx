import S from "@/features/morse-code-input/styles";
import { useAppStore } from "@/store";

const MorseCodeInput = () => {
  const input = useAppStore((state) => state.morseInput);
  const setInput = useAppStore((state) => state.setMorseInput);
  const play = useAppStore((state) => state.play);
  return (
    <S.MorseCodeInputContainer>
      <input
        type="text"
        id="morse-code-input"
        onChange={({ target }) => setInput(target.value)}
        value={input}
      ></input>
      <button onClick={play}>Play</button>
    </S.MorseCodeInputContainer>
  );
};

export default MorseCodeInput;
