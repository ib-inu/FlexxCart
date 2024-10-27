import { useRef, useState } from "react";
import styled from "styled-components";
import { Product } from "../../api/useRandomProducts";
import { useParams } from "react-router-dom";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import DetailsBtn from "../../components/ui/DetailsBtn";
import AddToCartBtn from "../../components/ui/AddToCartBtn";





interface Props {
  item: Product[];
}

export default function SimilarCategory({ item }: Props): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const { id } = useParams();


  const scrollRight = () => {
    setCurrentSlide((prevSlide) => (prevSlide === item.length - 2 ? 0 : prevSlide + 1))

  };

  const scrollLeft = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? item.length - 2 : prevSlide - 1))
  };

  return (

    <Container>
      <SimilarProductWrapper>
        <ScrollButton onClick={scrollLeft}><BsArrowLeft /></ScrollButton>

        <SimilarProducts ref={scrollRef} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {
            item?.map((i) => (
              i.id !== Number(id) ?
                <ProductCard key={i.id}>
                  <Image>
                    <img src={i.image} alt={i.title} />
                  </Image>
                  <h2>{i.title}</h2>
                  <h3>${i.price}</h3>
                  <DetailsBtn id={i.id} />
                  <AddToCartBtn item={{
                    productId: i.id,
                    quantity: 1,
                    price: i.price
                  }} />
                </ProductCard>
                : ""
            ))
          }

        </SimilarProducts>

        <ScrollButton onClick={scrollRight}><BsArrowRight /></ScrollButton>
      </SimilarProductWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`
const SimilarProductWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 20em;
  max-width: 20em;
  overflow: hidden;
  margin-bottom: 10em;
  position: relative;
`;


const ScrollButton = styled.button`
  background-color: #717171ec;
  border: none;
  border-radius: 50%;
  width: 2em;
  color: #fff;
  padding: .5em;
  height: 2em;
  font-size: 1.5em;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  &:first-of-type {
    left: 0;
  }
  &:last-of-type {
    right: 0;
  }
`;


const SimilarProducts = styled.div`
  display: flex;
  /* overflow: hidden; */
  scroll-behavior: smooth;
  width: 100%;
  padding: 0 2em;
  scroll-snap-type: x mandatory; 
  transition:  transform .5s ease;


  &::-webkit-scrollbar {
    display: none;
   } 
`;

const ProductCard = styled.div`
  flex: 1 0 auto;
  width: 300px;
  scroll-snap-align: start;
  text-align: center;
  padding: 1em;
  border-radius: 8px;
`;

const Image = styled.div`
height: 25em;
overflow: hidden;
width: 100%;

img{
  object-fit: cover;
  width: 80%;
  height: 80% ;
  border-radius: 22px;
}

`