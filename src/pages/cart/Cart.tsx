import styled from "styled-components";
import { useRandomProducts } from "../../api/useRandomProducts";
import CartItem from "./CartItem";
import BackNav from "../../components/BackNav";


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
height: 5em;
gap: 1em;
background-color: #fff;
justify-content: space-between;
padding: 1em;

div{
    display: flex;
    flex-direction: column;
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

export default function Cart(): JSX.Element {
    const { data, isLoading } = useRandomProducts();


    console.log(data);

    return (
        <div>
            <BackNav name="Cart" />

            <CartItems>

                {/* <p>Nothing here</p> */}
                {data?.map(item => <CartItem key={item.id} item={item} />)}
            </CartItems>

            <Buy>
                <div>
                    <p>Total Items: <span>2</span></p>
                    <p>Total Amount: <span>$6666</span></p>
                </div>
                <button>Continue</button>
            </Buy>

        </div>
    )
}
