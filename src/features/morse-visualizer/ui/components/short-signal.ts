import styled from "styled-components";

const ShortSignal = styled.span<{ $content: string; $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${({ $active }) => ($active ? "var(--accent)" : "var(--border)")};
  flex-shrink: 0;
  font-size: 9px;
  box-shadow: ${({ $active }) => ($active ? "0 0 8px 2px var(--accent)" : "none")};
  color: ${({ $active }) => ($active ? "var(--accent)" : "var(--text)")};
  transition: box-shadow 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  &::before {
    content: "${({ $content }) => $content}";
  }
`;

export default ShortSignal;
