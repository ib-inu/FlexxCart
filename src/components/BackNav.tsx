import { useNavigate } from "react-router-dom"; // Import useNavigate
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";

const StyledBackButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  background: none; /* Removes default button background */
  border: none; /* Removes default button border */
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(0.2em);
  }

  &:active {
    transform: translateY(0.5em);
  }
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5em 2em;
  border-bottom: 1px solid #32203231;
`;

interface BackNavProps {
  name: string;
}

export default function BackNav({ name }: BackNavProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <Nav>
      <StyledBackButton onClick={() => navigate(-1)} aria-label="Go back">
        <BiArrowBack />
      </StyledBackButton>
      <h2>{name}</h2>
      <div></div>
    </Nav>
  );
}

