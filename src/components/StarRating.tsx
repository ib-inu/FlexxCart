import styled from "styled-components";
import { FaStar } from "react-icons/fa";

interface RatingProps {
    rate: number | undefined;
    count: number | undefined;
}

const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled(FaStar)`
  margin-right: 0.2em;
  font-size: 1.5em;



`;

export default function Rating({ rate, count }: RatingProps) {
    const stars = Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
            <Star
                key={index}
                style={{ color: starValue <= Math.round(rate || 0) ? "#FFD700" : "#e4e5e9" }}
            />
        );
    });

    return (
        <StarContainer>
            {stars}
            {rate !== undefined && count !== undefined ? (
                <span>{rate.toFixed(1)} ({count} ratings)</span>
            ) : (
                <span>No rating available</span>
            )}
        </StarContainer>
    );
}

