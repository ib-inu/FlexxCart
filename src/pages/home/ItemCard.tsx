import styled, { css } from "styled-components";
import { Product } from "../../api/useRandomProducts";
import { BiCart } from "react-icons/bi";

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



const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
    padding: 0.5em;
    width: 5em;
    height: 2em;
    border-radius: 4px;
    border: none;
    color: white;
    cursor: pointer;
    transition: all .6s ease;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.4); 
    
    margin: 1em;
    
    ${(props) =>
        props.$variant === "secondary" &&
        css`
            background-color: #6c757d;
            &:hover{
                background-color: #9ca8b2;
            }
        `}

    ${(props) =>
        props.$variant === "primary" &&
        css`
            background-color: #007bff;
            &:hover{
                background-color: #5caff4;
            }
        `}
`;

Button.defaultProps = {
    $variant: "primary",
};



export default function ItemCard({ item }: ItemProps): JSX.Element {
    const { image, title, price } = item;

    const titleTrimmed = title.length > 15 ? title.slice(0, 15) + "..." : title;


    return (
        <Card>
            <ImgDiv>
                <img draggable="false" src={image} alt={title} />
            </ImgDiv>
            <h2>{titleTrimmed}</h2>
            <p>${price}</p>
            <div>

                <Button><BiCart /></Button>
                <Button $variant="secondary">Details</Button>
            </div>
        </Card>
    );
}
