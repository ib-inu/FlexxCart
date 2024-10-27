import { useParams } from "react-router-dom"
import { useProductDetails } from "../../api/useProductDetails"
import BackNav from "../../components/BackNav";
import styled from "styled-components";
import StarRating from "../../components/StarRating";
import SimilarCategory from "./SimilarCategory";
import { useCategory } from "../../api/useCategory";
import DetailsSkelton from "../../components/ui/DetailsSkelton";
import AddToCartBtn from "../../components/ui/AddToCartBtn";



export default function Details(): JSX.Element {

    const { id } = useParams()
    const safeId = id || '';
    const { data, isLoading, isError, error } = useProductDetails(safeId);


    const category: string = data?.category ?? '';

    const { data: similarProduct, isLoading: similarProductIsLoading } = useCategory(category);

    const productData = {
        productId: data?.id ?? 0,
        price: data?.price ?? 0,
        quantity: 1,
    };

    return (
        <>
            <BackNav name="Details" />
            {(isLoading && !isError && <DetailsSkelton />)}

            {!isLoading && !isError &&
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
                                <AddToCartBtn item={productData} />

                            </Purchase>

                        </Info>
                    </ProductDetails>
                    <OtherContainer>
                        <h2>similar products</h2>
                        {similarProductIsLoading ? <p>loading</p> :
                            <SimilarCategory item={similarProduct} />
                        }
                    </OtherContainer>
                </Container>}


            {!isLoading && isError && <p>
                {error instanceof Error ? error.message : "Unknown error"}
            </p>}
        </>
    )
}


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
const OtherContainer = styled.div`
display: flex;
flex-direction: column;
/* align-items: center; */
padding: 2em;
gap: 1.5em;
`

