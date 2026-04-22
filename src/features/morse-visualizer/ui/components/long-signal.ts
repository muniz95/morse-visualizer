import styled from "styled-components";

const LongSignal = styled.span<{ $active?: boolean }>`
  display: inline-flex;
  width: 28px;
  height: 12px;
  border-radius: 4px;
  border: 2px solid ${({ $active }) => ($active ? "var(--accent)" : "var(--border)")};
  flex-shrink: 0;
  box-shadow: ${({ $active }) => ($active ? "0 0 8px 2px var(--accent)" : "none")};
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
`;

export default LongSignal;
