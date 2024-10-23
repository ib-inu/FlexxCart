import styled from "styled-components";
import { useRandomProducts } from "../../api/useRandomProducts";

const Nav = styled.div`
    display: flex;
justify-content: space-between;
padding: 1em;
`
const CartContainer = styled.div`
display: flex;
flex-direction: column;
gap: 5em;
`

const CartItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 10px;
    align-items: center;
    justify-content: center;

`

const CartItem = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    height: 20em;
    max-width: 80em;
    box-shadow: 1px 1px 4px 0px #dbdbdb;
    padding: 1em;
    border-radius: 6px;
    background-color:#80808022;
    
    `
const ImageDiv = styled.div`
         overflow: hidden;
         padding: 2em;
     border-radius: 50%;
     max-width: 20em;
 
         img{
             width: 100%;
             height: 100%;
             object-fit: cover;
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

export default function Cart(): JSX.Element {
    const { data, isLoading } = useRandomProducts();

    console.log(data);

    return (
        <CartContainer>
            <Nav>
                <p>Back</p>
                <h1>Cart </h1>
                <div></div>
            </Nav>

            <CartItems>

                {/* <p>Nothing here</p> */}
                {data?.map(item => <CartItem key={item.id}>
                    <ImageDiv>
                        <img src={item.image} />
                    </ImageDiv>
                    <Details>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p>${item.price}</p>
                    </Details>
                </CartItem>)}
            </CartItems>


        </CartContainer>
    )
}
