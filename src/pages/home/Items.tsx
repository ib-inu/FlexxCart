import styled from "styled-components";
import { useProducts, Product } from "../../api/useProducts";
import ItemCard from "./ItemCard";
import { useSelector } from "react-redux";
import { Rootstate } from "../../store";
import { useEffect, useState, useMemo } from "react";
import HomeSkeleton from "../../components/ui/HomeSkelton";

const Container = styled.div`
    display: grid;
    margin-top: 4em;
    grid-template-columns: repeat(3, 1fr);
    gap: 2em;
    padding: 2em;
    @media (max-width: 1150px) {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }
`;

export default function Items(): JSX.Element {
    const stateCategory = useSelector((state: Rootstate) => state.product.category);
    const [category, setCategory] = useState<string>(stateCategory || "random");

    const { data, isLoading, isError, error } = useProducts(category);

    useEffect(() => {
        setCategory(stateCategory || "random");
    }, [stateCategory]);

    const skeletons = useMemo(
        () => Array.from({ length: 10 }, (_, index) => <HomeSkeleton key={index} />),
        []
    );

    return (
        <Container>
            {isLoading && !isError && skeletons}

            {!isLoading && !isError && data?.map((i: Product) => (
                <ItemCard key={i.id} item={i} />
            ))}

            {!isLoading && isError && (
                <p>{error instanceof Error ? error.message : "An unknown error occurred"}</p>
            )}
        </Container>
    );
}
