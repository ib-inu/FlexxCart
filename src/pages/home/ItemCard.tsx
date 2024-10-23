import styled from "styled-components";
import { Product } from "../../api/useRandomProducts";

interface ItemProps {
    item: Product;
}

const Card = styled.div`
     display: flex;
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    gap: 1em;
    width: 100%;
    min-width: 20em;
    height:20em ;
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
img{
    object-fit: contain;
width:100%;
height: 100%;
}

&:hover{
        transform: scale(1.1) rotate(-2deg);

    }
`

export default function ItemCard({ item }: ItemProps): JSX.Element {
    const { image, title, price } = item;

    const titleTrimmed = title.length > 15 ? title.slice(0, 15) + "..." : title;
    console.log(titleTrimmed);


    return (
        <Card>
            <ImgDiv>
                <img src={image} alt={title} />
            </ImgDiv>
            <h2>{titleTrimmed}</h2>
            <p>${price}</p>
            <div>

                <button>ADD TO CART</button>
                <button>VIEW DETAILS</button>
            </div>
        </Card>
    );
}
