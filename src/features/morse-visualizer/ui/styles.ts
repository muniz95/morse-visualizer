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
  width: 100%;
  overflow-x: auto;
  min-width: 1024px;
  padding: 32px 0;
  box-sizing: border-box;
`;

const S = { DecodedMorseContainer, DecodedMorseCharacter, TreeContainer };

export default S;
