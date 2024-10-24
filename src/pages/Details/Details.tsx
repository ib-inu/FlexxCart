import { useParams } from "react-router-dom"
import { useProductDetails } from "../../api/useProductDetails"
import BackNav from "../../components/BackNav";
import styled from "styled-components";
import StarRating from "../../components/StarRating";
import { useAllCategory } from "../../api/useAllCategory";
import SimilarCategory from "./SimilarCategory";
import { useCategory } from "../../api/useCategory";



const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`
const ProductDetails = styled.div`
    display: flex;
    flex-direction: column;
    margin: 3em ;
    gap: 1em;
    align-items: center;
`
const Image = styled.div`
width: 50%;
height: 50%;
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
`
const Info = styled.div`
margin-top: 2em;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
`
const Purchase = styled.div`
    display: flex;
    justify-content: space-between;
`






export default function Details(): JSX.Element {

    const { id } = useParams()
    const safeId = id || '';


    const { data, isLoading } = useProductDetails(safeId);
    const { data: similarProduct, isLoading: similarProductIsLoading } = useCategory(data?.category);



    return (
        <>
            {isLoading ? <p>Loading</p> :
                <>
                    <BackNav name="Details" />
                    <Container>

                        <ProductDetails>

                            <Image>
                                <img src={data?.image} alt={data?.title} />
                            </Image>
                            <Info>
                                <h2>{data?.title}</h2>
                                <StarRating count={data?.rating.count} rate={data?.rating.rate} />
                                <p>{data?.description}</p>
                                <p></p>
                                <Purchase>
                                    <p>
                                        ${data?.price}
                                    </p >
                                    <button>Buy</button>

                                </Purchase>

                            </Info>
                        </ProductDetails>
                        <SimilarCategory item={similarProduct}></SimilarCategory>
                    </Container>
                </>
            }
        </>
    )
}
