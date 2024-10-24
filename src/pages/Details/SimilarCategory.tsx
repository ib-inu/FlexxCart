import { useRef } from "react";
import styled from "styled-components";
import { Product } from "../../api/useRandomProducts";

const SimilarProductWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10em 0;
  position: relative;
`;

const ScrollButton = styled.button`
  background-color: #fff;
  border: none;
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
  gap: 1.5em; /* Space between items */
  scroll-snap-type: x mandatory; /* Snap scrolling */
  ::-webkit-scrollbar {
    display: none; /* Hide scrollbar for better UX */
  }
`;

const ProductCard = styled.div`
  flex: 0 0 auto;
  width: 200px;
  scroll-snap-align: start; /* Align items at the start during scroll snap */
  text-align: center;
  border: 1px solid #ddd;
  padding: 1em;
  border-radius: 8px;
`;

interface Props {
    item: Product[];
}

export default function SimilarCategory({ item }: Props): JSX.Element {
    const scrollRef = useRef<HTMLDivElement>(null);

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
                {item?.map((i) => (
                    <ProductCard key={i.id}>
                        <img src={i.image} alt={i.title} style={{ width: "100%", height: "auto" }} />
                        <h2>{i.title}</h2>
                        <p>${i.price}</p>
                    </ProductCard>
                ))}
            </SimilarProducts>

            <ScrollButton onClick={scrollRight}>{">"}</ScrollButton>
        </SimilarProductWrapper>
    );
}

