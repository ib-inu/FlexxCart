import { BiCart } from "react-icons/bi";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, CartItem } from "../../features/cart/cartSlice";
import toast from "react-hot-toast";
import { Rootstate } from "../../store";
import { MdDone } from "react-icons/md";

export default function AddToCartBtn({ item }: { item: CartItem }): JSX.Element {
    const dispatch = useDispatch();
    const items = useSelector((state: Rootstate) => state.cart.items)

    const productExists = items.some(i => i.productId === item.productId);



    function handleOnClick() {
        dispatch(addToCart(item));
        toast.success('Successfully added!')
    }

    return (
        <>
            {productExists ? <Button style={{ cursor: "none", backgroundColor: "green" }}><MdDone /></Button>
                :
                <Button onClick={handleOnClick}>
                    <BiCart size={18} style={{ translate: "0 2px" }} />
                </Button>
            }
        </>
    );
}
