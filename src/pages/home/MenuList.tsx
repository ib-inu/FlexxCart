import { FaRegUser } from "react-icons/fa"
import styled from "styled-components"



const Menu = styled.div`
    position: absolute;
    width: 70%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 2em;
    ul{
        border-bottom: 1px solid gray;
        li{
            display: flex;
            justify-content: space-between;
            padding: 10px;
            width: 100%;
            cursor: pointer;
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
    height: 100%;
    position: absolute;
   background-color: #6d6d6d3c;
   
`



function MenuList(): JSX.Element {
    return (
        <div>
            <Overlay></Overlay>
            <Menu>
                <ul>
                    <li>
                        <span>New Arrivals</span> <span>--</span>
                    </li>
                    <li>
                        <span>New Arrivals</span> <span>--</span>
                    </li>
                    <li> <span>New Arrivals</span> <span>--</span> </li>
                    <li> <span>New Arrivals</span> <span>--</span> </li>
                    <li> <span>New Arrivals</span> <span>--</span> </li>
                    <li> <span>New Arrivals</span> <span>--</span> </li>
                    <li> <span>New Arrivals</span> <span>--</span> </li>
                    <li> <span>New Arrivals</span> <span>--</span> </li>
                </ul>
                <p>
                    <FaRegUser />
                </p>
            </Menu>
        </div>
    )
}

export default MenuList
