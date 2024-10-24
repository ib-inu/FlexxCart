import { useRef } from "react";
import styled from "styled-components";
import { Product } from "../../api/useRandomProducts";
import { useParams } from "react-router-dom";
import { Button } from "../home/ItemCard";

const SimilarProductWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  overflow: hidden;
  margin: 10em auto;
  position: relative;
  background-color: #f4f4f4;
  
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

const ScrollButton = styled.button`
  background-color: #717171ce;
  border: none;
  border-radius: 50%;
  width: 2em;
  color: #fff;
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
  overflow-x: scroll;
  scroll-behavior: smooth;
  width: 100%;
  padding: 0 2em;
  /* gap: 1.5em; Space between items */
  scroll-snap-type: x mandatory; 
  


  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for better UX */
   } 
`;

const ProductCard = styled.div`
  flex: 0 0 auto;
  width: 300px;
  scroll-snap-align: start; /* Align items at the start during scroll snap */
  text-align: center;
  padding: 1em;
  border-radius: 8px;
`;

interface Props {
  item: Product[];
}

export default function SimilarCategory({ item }: Props): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();


  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <SimilarProductWrapper>
      <ScrollButton onClick={scrollLeft}>{"<"}</ScrollButton>

      <SimilarProducts ref={scrollRef}>
        {
          item?.map((i) => (
            i.id !== Number(id) ?
              <ProductCard key={i.id}>
                <Image>
                  <img src={i.image} alt={i.title} />
                </Image>
                <h2>{i.title}</h2>
                <h3>${i.price}</h3>
                <Button $variant="secondary">Details</Button>
              </ProductCard>
              : ""
          ))
        }

      </SimilarProducts>

      <ScrollButton onClick={scrollRight}>{">"}</ScrollButton>
    </SimilarProductWrapper>
  );
}

