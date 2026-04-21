import styled from "styled-components";

export const DecodedMorseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DecodedMorseCharacter = styled.span<{ $active?: boolean }>`
  color: ${(props) => (props.$active ? "#00cc00" : "initial")};
`;

export const TreeContainer = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
  min-width: 512px;
`;

const S = { DecodedMorseContainer, DecodedMorseCharacter, TreeContainer };

export default S;
