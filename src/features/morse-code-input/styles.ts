import styled from 'styled-components';

const MorseCodeInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  flex-grow: 1;
  gap: 8px;
`;

const MorseCodePlayButton = styled.button`
  width: 48px;
  height: 36px;
  border-radius: 15%;
  border-style: none;
`;

const DivBlock = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 50%;
`;

const S = { MorseCodeInputContainer, MorseCodePlayButton, DivBlock };

export default S;
