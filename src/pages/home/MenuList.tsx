import React from "react"
import { BiLogOut } from "react-icons/bi"
import { BsArrowRight } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { setCategory } from "../../features/products/productSlice";
import { Rootstate } from "../../store";



interface Props {
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuList({ setIsMenuOpen, setLogoutModal }: Props): JSX.Element {
    const dispatch = useDispatch();
    const category = useSelector((state: Rootstate) => state.product.category);
    const categories = [
        "Electronics", "Jewelery", "Men's Clothing",
        "Women's Clothing"
    ]

    return (
        <MenuContainer>
            <Overlay onClick={() => {
                console.log("clicked");

                setIsMenuOpen(false)
            }}></Overlay>
            <Menu>
                <ul >
                    <li
                        style={{ backgroundColor: `${category === "random" ? '#ededed' : ''}` }}
                        onClick={() => {
                            dispatch(setCategory('random'))
                            setIsMenuOpen(false);
                        }}>
                        All <p ><BsArrowRight /></p>
                    </li>



                    {categories.map((item, i) => {
                        const product = item.split('').map(char => char.toLowerCase()).join('');
                        return (
                            <li style={{ backgroundColor: `${category === product ? '#ededed' : ''}` }}
                                onClick={() => {
                                    dispatch(setCategory(product))
                                    setIsMenuOpen(false);
                                }
                                }
                                key={i} >
                                {item}
                                <p ><BsArrowRight /></p>
                            </li>)
                    }

                    )}
                </ul>
                <p style={{ transform: "translateX(12px)" }}
                    onClick={() => setLogoutModal(true)}
                >
                    <BiLogOut />
                </p>
            </Menu>

        </MenuContainer >
    )
}

export default MenuList




const Menu = styled.div`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 100%;
    padding: 1em 0;
    gap: 2em;
    z-index: 1001;
    animation: menuAnimation ease .6s;
    ul{
        border-bottom: 1px solid gray;
        padding: 1em;
        li{
            display: flex;
            justify-content: space-between;
            padding: 10px;
            width: 100%;
            align-items: center;
            cursor: pointer;
            transition: all .5s ease;

            &:hover{
                background-color: #f3f3f3;
            }
        }
        
    }
    p{
        cursor: pointer;
            padding: 10px;
            font-size: 1.2em;
        }
    `


const Overlay = styled.div`
    width: 100%;
    position: fixed;
    -webkit-backdrop-filter:blur(2px);
    backdrop-filter: blur(2px);
    height: 100%;
    z-index: -1;
   background-color: #6d6d6d3c;
   
`

const MenuContainer = styled.div`
    position: fixed;
    z-index: 10;
    width: 100%;
    top: 5%;
height: 100%;
`

