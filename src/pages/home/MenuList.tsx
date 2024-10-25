import { BsArrowRight } from "react-icons/bs"
import { FaRegUser } from "react-icons/fa"
import styled from "styled-components"
import { useAllCategory } from "../../api/useAllCategory"



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
        li{
            display: flex;
            justify-content: space-between;
            padding: 10px;
            width: 100%;
            cursor: pointer;
            transition: all 1s ease;

            &:hover{
                background-color: #dedede;
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
    z-index: 5;
    width: 100%;
    top: 5%;
height: 100%;
`



function MenuList(): JSX.Element {
    const { data, isLoading } = useAllCategory()

    return (
        <MenuContainer>
            <Overlay></Overlay>
            <Menu>
                <ul>
                    {isLoading ? <li>Loading</li>
                        :
                        data.map((i: string) => <li key={i}>
                            <span>{i}</span> <span><BsArrowRight /></span>
                        </li>)}
                </ul>
                <p>
                    <FaRegUser />
                </p>
            </Menu>

        </MenuContainer>
    )
}

export default MenuList


