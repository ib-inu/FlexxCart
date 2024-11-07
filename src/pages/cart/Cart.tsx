import styled from "styled-components";
import CartItem from "./CartItem";
import BackNav from "../../components/BackNav";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../store";
import RemoveModal from "../../components/ui/RemoveModal";
import { removeFromCart, setRemoveModal } from "../../features/cart/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import MockPaymentGateway from "./Paymentgateway";
import { useState } from "react";


export interface ProductItems {
    productId: number | string;
    quantity: number;
    price: number;
}

export default function Cart(): JSX.Element {

    const { items, isRemoveModalOpen, selectedItem } = useSelector((state: Rootstate) => state.cart);
    const dipatch = useDispatch();
    const totalPrice = useSelector((state: Rootstate) => state.cart.totalPrice);
    const [ispaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);



    function handleDelete() {
        dipatch(removeFromCart((selectedItem || 0)));
        toast.success('Successfully removed!')
        dipatch(setRemoveModal({ modal: false, selectedItemId: 0 }))

    }
    const totalItems = items.length;

    return (
        <div>
            {ispaymentModalOpen && <MockPaymentGateway setIsPaymentModalOpen={setIsPaymentModalOpen} />}

            {isRemoveModalOpen && <RemoveModal text={"confirm to remove"} onConfirm={handleDelete} />}
            <BackNav name="Cart" />
            <Toaster />


            <CartItems>
                {!items.length ? <p>Nothing here</p>
                    :
                    items.map(item => <CartItem
                        key={item.productId} item={item} />
                    )}
            </CartItems>


            {(totalItems > 0) &&
                <Buy>
                    <div>
                        <p>Total Items: <span>{totalItems}</span></p>
                        <p>Total Amount: <span>${totalPrice}</span></p>
                    </div>
                    <button onClick={() => setIsPaymentModalOpen(true)}>Continue</button>
                </Buy>
            }

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
z-index: 1000;
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
    
    p{
        font-size: clamp(12px , 2vw , 28px);
    }
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