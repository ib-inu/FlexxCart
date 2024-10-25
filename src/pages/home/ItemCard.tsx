import styled from "styled-components";
import { Product } from "../../api/useRandomProducts";
import { BiCart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";


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

img{
    object-fit: contain;
width:100%;
height: 100%;
user-select: none;

}
&:hover{
    transform: scale(1.1) rotate(-2deg);
    
}
`



interface ItemProps {
    item: Product;
}
export default function ItemCard({ item }: ItemProps): JSX.Element {
    const { id, image, title, price } = item;

    const titleTrimmed = title.length > 15 ? title.slice(0, 15) + "..." : title;

    const navigate = useNavigate()

    //TODO:- REDUX DETAILS SLICE
    function getDetails(id: number) {
        navigate(`/details/${id}`)
    }

    return (
        <Card>
            <ImgDiv>
                <img draggable="false" src={image} alt={title} />
            </ImgDiv>
            <h2>{titleTrimmed}</h2>
            <p>${price}</p>
            <div>
                <Button $variant="secondary" onClick={() => getDetails(id)
                }>Details</Button>
                <Button><BiCart /></Button>
            </div>
        </Card>
    );
}
