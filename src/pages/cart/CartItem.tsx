import styled from "styled-components"
import { useProductDetails } from "../../api/useProductDetails"
import { ProductItems } from "./Cart"
import ProductSkelton from "../../components/ui/ProductSkelton"
import { AppDispatch } from "../../store"
import { useDispatch } from "react-redux"
import { addItemPrice, calculateTotalPrice, decQuantity, incQuantity, removeFromCart } from "../../features/cart/cartSlice"
import { useEffect } from "react"
import { MdDelete } from "react-icons/md"


export default function CartItem({ item }: { item: ProductItems }): JSX.Element {



    const dispatch = useDispatch<AppDispatch>();


    const { data: product, isLoading, isError, error } = useProductDetails(item.productId);


    const price = product ? (item?.quantity * product?.price) : 0;
    useEffect(function () {
        const productPrice = {
            id: item.productId,
            price: product?.price || 0,
        }
        dispatch(addItemPrice(productPrice))
        dispatch(calculateTotalPrice());

    }, [dispatch, item.productId, product?.price])



    const handleIncrement = () => {
        dispatch(incQuantity(item.productId))
        dispatch(calculateTotalPrice());

    }
    const handleDecrement = () => {
        dispatch(decQuantity(item.productId))
        dispatch(calculateTotalPrice());
    }
    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id))
    }




    return (
        <>
            {
                isLoading && !isError &&
                <ProductSkelton />}
            {!isError && !isLoading &&
                <CartItemDiv >
                    <ImageDiv>
                        <img src={product?.image} />
                    </ImageDiv>
                    <Details>
                        <RemoveBtn onClick={() => product?.id && handleRemove(product.id)}>
                            <MdDelete />
                        </RemoveBtn>
                        <h2>{product?.title}</h2>
                        <Price>
                            <p>${Math.round(price)}</p>
                            <Quantity>
                                <button onClick={handleDecrement
                                }
                                >-</button>

                                <span>{item.quantity}</span>
                                <button onClick={
                                    handleIncrement
                                }
                                >+</button>
                            </Quantity>
                        </Price>
                    </Details>
                </CartItemDiv>}
            {!isLoading && isError && <p>
                {error instanceof Error ? error.message : "Unknown error"}
            </p>}
        </>
    )
}


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
    position: relative;
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

const RemoveBtn = styled.button`
    padding: 1em;
    border-radius: 50%;
    position: absolute;
    right: 0;
    padding: 2px;
    cursor: pointer;
    top: 0;
    display: inline-block;
    background-color: #d0747451;
    width: 20px;
    height: 20px;
    border: 1px solid #999999;
    
    


`