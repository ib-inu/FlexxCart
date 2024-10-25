import React from "react";
import { BiMenu } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  top: 0;
  position: fixed;
  z-index: 1005;
  width: 100%;
  background-color: #ffffff;
  justify-content: space-between;
  align-items: center;
  padding: 0.3em 2em;
  max-height: 3em;
  border: 1px solid #e2e2e2;
  @media (max-width:600px) {
      padding: 0.3em 0;
      
}
h2{
    transform: translateX(2em);
    
    @media (max-width:350px) {
        transform: translateX(1em);
        
    }
}
  `;

const Menu = styled.div`
    padding: .3em;
    font-size: 1.3em;
   cursor: pointer;
   transform: translatey(.3em);



    @media (max-width : 500px) {
        display: block;
    }
  `

const Ul = styled.ul`
  display: flex;
  gap: 1em;
  list-style: none;
  height: 100%;
  
  @media (max-width:600px) {
      gap: .1em;
  }

  @media (max-width:500px) {
  li{
display: none;
  }
     
      
    }

  li {
    cursor: pointer;
    border-radius: 6px;
    padding: 0.5em 1em;
    position: relative;
    transition: .5s all ease;
    
    &:hover {
      background-color: #e2e2e2;
    }

    &.active::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #000;
    }


  }
`;

const Cart = styled.div`
   cursor: pointer;
   font-size: 1.2em;
   margin-right: 1em;
    display: none;
   transform: translatey(.2em);

    @media (max-width:500px) {
        display: block;
    }
`

interface NavbarProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}




export default function Navbar({ setIsMenuOpen }: NavbarProps): JSX.Element {
  const navigate = useNavigate();



  return (
    <Nav>
      <Menu onClick={() => setIsMenuOpen(m => !m)}>
        <BiMenu />
      </Menu>
      <h2 style={{ userSelect: "none" }} >FlexxCart</h2>
      <Ul>
        <li>
          <FaRegUser />
        </li>
        <li onClick={() => navigate('/cart')}>
          <FaShoppingCart />
        </li>
      </Ul>
      <Cart onClick={() => navigate('/cart')}><FaShoppingCart /></Cart>
    </Nav>
  )
}