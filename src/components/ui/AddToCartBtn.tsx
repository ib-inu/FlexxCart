import { BiCart } from "react-icons/bi";
import { Button } from "../Button";
import { useDispatch } from "react-redux";
import { addToCart, CartItem } from "../../features/cart/cartSlice";

export default function AddToCartBtn({ item }: { item: CartItem }): JSX.Element {
    const dispatch = useDispatch();

    function handleOnClick() {
        dispatch(addToCart(item));
    }

    return (
        <Button onClick={handleOnClick}>
            <BiCart size={18} style={{ translate: "0 2px" }} />
        </Button>
    );
}
