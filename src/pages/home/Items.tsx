import styled from "styled-components";
import { useRandomProducts, Product } from "../../api/useRandomProducts";
import ItemCard from "./ItemCard";
import HomeSkelton from "../../components/ui/HomeSkelton";

const Container = styled.div`
    display: grid;
    margin-top: 4em;
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
    const { data, isLoading, isError, error } = useRandomProducts();

    return (
        <Container>
            {
                (isLoading && !isError) &&
                Array.from({ length: 10 }, (_, index) => <HomeSkelton key={index} />)

            }
            {
                !isLoading && !isError &&
                data && data.map((i: Product) => (
                    <ItemCard key={i.id} item={i} />
                ))
            }

            {
                !isLoading && isError &&
                <p>{error instanceof Error ? error.message : "Unknown error"}</p>
            }
        </Container>
    );
}
