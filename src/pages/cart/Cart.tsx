import styled from "styled-components";
import CartItem from "./CartItem";
import BackNav from "../../components/BackNav";
import { useSelector } from "react-redux";
import { Rootstate } from "../../store";


export interface ProductItems {
    productId: number | string;
    quantity: number;
    price: number;
}

export default function Cart(): JSX.Element {

    const state = useSelector((state: Rootstate) => state.cart.items);
    const totalPrice = useSelector((state: Rootstate) => state.cart.totalPrice);
    const totalItems = state.length;




    return (
        <div>
            <BackNav name="Cart" />

            <CartItems>
                {!state.length && <p>Nothing here</p>}
                {state.map(item => <CartItem
                    key={item.productId} item={item} />
                )}
            </CartItems>

            <Buy>
                <div>
                    <p>Total Items: <span>{totalItems}</span></p>
                    <p>Total Amount: <span>${totalPrice}</span></p>
                </div>
                <button>Continue</button>
            </Buy>

        </div>
    )
}



const CartItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 10px;
    margin: 5em 0 10em 0;
    align-items: center;
    justify-content: center;
`



const Buy = styled.div`
position: fixed;
display: flex;
border-top: 1px solid #32203231;
bottom: 0;
width: 100%;
z-index: 1001;
height: 5em;
gap: 1em;
background-color: #fff;
padding: 1em;
padding-bottom: 5em;
justify-content: space-between;

div{
    display: flex;
    flex-direction: column;
    margin-left: 2em;
    gap: 1em;
    
}
button{
 border-radius:18px ;
 height: 3em;
 width: 6em;
 cursor: pointer;
 transition: all .5s ease;
 background-color: #5454c4;
 border: none;
 color: #fff;
 &:hover{
    background-color: #7a7ad9;
 }
}
`