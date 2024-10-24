import styled from "styled-components"
import { Product } from "../../api/useRandomProducts"
import { useState } from "react"

const CartItemDiv = styled.div`
    display: flex;
    gap: 5px;
    width: 80%;
    height: auto;
    max-width: 50em;
    box-shadow: 1px 1px 4px 0px #dbdbdb;
    padding: 1em;
    border-radius: 6px;
    background-color:#80808022;
    @media (max-width:500px) {
    display: block;
        
    }
    
    `
const ImageDiv = styled.div`
         overflow: hidden;
         padding: 2em;
         height: 80%;
         width: 50%;
         height: 80%;
         width: 50%;
         height: 80%;
         width: 50%;

         max-width: 20em;
         
         img{
             border-radius: 50%;
             width: 5rem;
             height: 5rem;
             object-fit: cover;
         }

         @media (max-width:500px) {
    margin: 0 auto;
        
    }

`
const Details = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2em;
    background-color: #ffffff7a;
    border-radius: 1em;
    text-align: left;
    padding: 2em;
`

const Price = styled.div`
    display: flex;
    justify-content: space-between;
`

const Quantity = styled.div`
        display: flex;
        gap: .5em;
    button{
        border-radius: 50%;
        height: 2em;
        width: 2em;
        border: 1px solid #b5b5b54e;
        cursor: pointer;
        background-color: #5454c4;
        color: #fff;
        transition: all .3s ease;

        &:hover{
    background-color: #7a7ad9;
 }

    }
`

interface CartItemProp {
    item: Product
}

export default function CartItem({ item }: CartItemProp): JSX.Element {
    const [quantity, setQuantity] = useState<number>(1);

    return (
        <CartItemDiv key={item.id}>
            <ImageDiv>
                <img src={item.image} />
            </ImageDiv>
            <Details>
                <h2>{item.title}</h2>
                <Price>
                    <p>${quantity * item.price}</p>
                    <Quantity>
                        <button onClick={() => setQuantity(q => q > 1 ? q - 1 : q)}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(q => q >= + 1 ? q + 1 : q)}>+</button>
                    </Quantity>
                </Price>
            </Details>
        </CartItemDiv>
    )
}
