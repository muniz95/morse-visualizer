import S from '@/features/morse-code-input/styles';
import { useAppStore } from '@/store';

const MorseCodeInput = () => {
  const input = useAppStore((state) => state.morseInput);
  const setInput = useAppStore((state) => state.setMorseInput);
  const setSpeed = useAppStore((state) => state.setSpeed);
  const play = useAppStore((state) => state.play);
  const speed = useAppStore((state) => state.speed);
  return (
    <S.MorseCodeInputContainer>
      <S.DivBlock>
        <input
          type="text"
          id="morse-code-input"
          onChange={({ target }) => setInput(target.value)}
          value={input}
        ></input>
        <S.MorseCodePlayButton onClick={play}>&#11208;</S.MorseCodePlayButton>
      </S.DivBlock>
      <S.DivBlock>
        <input
          type="range"
          name="speed"
          min={10}
          max={300}
          step={10}
          defaultValue={100}
          id="speed"
          value={speed}
          title='Speed'
          onChange={({ target }) => setSpeed(target.valueAsNumber)}
        />
        <label htmlFor="speed">{speed}%</label>
      </S.DivBlock>
    </S.MorseCodeInputContainer>
  );
};

export default MorseCodeInput;
