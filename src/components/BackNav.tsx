import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";

const StyledNavLink = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all .3s ease;

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

    return (
        <Nav>
            <StyledNavLink to="/">
                <BiArrowBack />
            </StyledNavLink>
            <h2>{name}</h2>
            <div></div>
        </Nav>
    );
}

