import styled from "styled-components";

interface TreeLinkProps {
  $active: boolean;
  $side: "left" | "right";
}

const StyledSvg = styled.svg<TreeLinkProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  pointer-events: none;
  overflow: visible;
  filter: ${({ $active }) =>
    $active ? "drop-shadow(0 0 4px var(--accent))" : "none"};
  transition: filter 0.2s ease;

  line {
    stroke: ${({ $active }) => ($active ? "var(--accent)" : "var(--border)")};
    stroke-width: 0.04;
    transition: stroke 0.2s ease;
  }
`;

const TreeLink = ({ $active, $side }: TreeLinkProps) => (
  <StyledSvg
    $active={$active}
    $side={$side}
    viewBox="0 0 2 1"
    preserveAspectRatio="none"
  >
    {$side === "left" ? (
      <line x1="2" y1="0" x2="1" y2="1" />
    ) : (
      <line x1="0" y1="0" x2="1" y2="1" />
    )}
  </StyledSvg>
);

export default TreeLink;
