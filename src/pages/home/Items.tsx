import styled from "styled-components";
import { useRandomProducts, Product } from "../../api/useRandomProducts";
import ItemCard from "./ItemCard";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;  
    gap: 2em;
    padding: 2em;
    @media (max-width:1150px) {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }
`;

export default function Items(): JSX.Element {
    const { data, isLoading } = useRandomProducts();

    return (
        <Container>
            {isLoading ? <p>LOADING</p> :
                data && data.map((i: Product) => (
                    <ItemCard key={i.id} item={i} />  // Make sure to add a unique key for each ItemCard
                ))
            }
        </Container>
    );
}
