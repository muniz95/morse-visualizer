import styled from "styled-components";

const LongSignal = styled.span<{ $content: string; $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid ${({ $active }) => ($active ? "var(--accent)" : "var(--border)")};
  flex-shrink: 0;
  font-size: 11px;
  box-shadow: ${({ $active }) => ($active ? "0 0 8px 2px var(--accent)" : "none")};
  color: ${({ $active }) => ($active ? "var(--accent)" : "var(--text)")};
  transition: box-shadow 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  &::before {
    content: "${({ $content }) => $content}";
  }
`;

export default LongSignal;
