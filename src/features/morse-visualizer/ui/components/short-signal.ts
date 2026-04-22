import styled from "styled-components";

const ShortSignal = styled.span<{ $active?: boolean }>`
  display: inline-flex;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  border: 2px solid ${({ $active }) => ($active ? "var(--accent)" : "var(--border)")};
  flex-shrink: 0;
  box-shadow: ${({ $active }) => ($active ? "0 0 8px 2px var(--accent)" : "none")};
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  background-color: black;
`;

export default ShortSignal;
