import styled from "styled-components";
import { Product } from "../../api/useProducts";
import DetailsBtn from "../../components/ui/DetailsBtn";
import AddToCartBtn from "../../components/ui/AddToCartBtn";


const Card = styled.div`
     display: flex;
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    gap: 1em;
    width: 100%;
    min-width: 20em;
    height:25em ;
    padding: 1em;
    border: 1px solid #ccc;  
    border-radius: 8px;  
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    h2{
        font-size: 1rem;
        z-index: 2;
    }
    @media (max-width:1150px) {
    max-width: 20em;

    }
`

const ImgDiv = styled.div`
overflow: hidden;
width: 80%;
height: 80%;
transition: all 1s ease;
mix-blend-mode: darken;

img{
    object-fit: contain;
width:100%;
height: 100%;
user-select: none;
mix-blend-mode: darken;

}
&:hover{
    transform: scale(1.1) rotate(-2deg);
mix-blend-mode: darken;

}
`

const Buttons = styled.div`
display: flex;
gap: 1.5em;
`



interface ItemProps {
    item: Product;
}
export default function ItemCard({ item }: ItemProps): JSX.Element {
    const { id, image, title, price } = item;

    const titleTrimmed = title.length > 15 ? title.slice(0, 15) + "..." : title;


    const itemData = {
        productId: id,
        price: price,
        quantity: 1,
    }


    return (
        <Card>
            <ImgDiv>
                <img draggable="false" src={image} alt={title} />
            </ImgDiv>
            <h2>{titleTrimmed}</h2>
            <p>${price}</p>
            <Buttons>
                <DetailsBtn id={id} />
                <AddToCartBtn item={itemData} />
            </Buttons>
        </Card>
    );
}
