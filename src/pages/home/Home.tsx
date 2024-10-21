import styled from "styled-components"

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: .3em 2em;
  /* background-color: #846446 ; */
  max-height: 3em;
  border: 1px solid #e2e2e2;
`;

const Ul = styled.ul`
display: flex;
gap: 1em;
list-style: none;
height: 100%;
li{
    cursor: pointer;
    border-radius: 6px;
    padding: .5em 1em;
    &:hover{
        background-color: #e2e2e2;
    }
}
`;




export default function Home(): JSX.Element {
    return <div>
        <Nav>
            <Ul>
                <li>
                    Women
                </li>
                <li>
                    Men
                </li>
            </Ul>
            <h2>FlexxCart</h2>
            <Ul>
                <li>search</li>
                <li>user</li>
                <li>cart</li>
            </Ul>
        </Nav>
    </div>
}