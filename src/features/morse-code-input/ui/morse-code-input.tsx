import { useAppStore } from "../../../store";
import S from "../styles";

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
