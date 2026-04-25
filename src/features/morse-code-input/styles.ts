import styled from "styled-components";

const MorseCodeInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
`;

const MorseCodePlayButton = styled.button`
  width: 48px;
  height: 36px;
  border-radius: 15%;
  border-style: none;
`;

const S = { MorseCodeInputContainer, MorseCodePlayButton };

export default S;
