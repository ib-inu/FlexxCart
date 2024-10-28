import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../Button";

export default function ErrorMsg() {
    const navigate = useNavigate()

    return (
        <Container>

            <p>404 , Invalid Page...</p>

            <Button onClick={() => navigate("/home")}>&larr; go back to HomePage</Button>

        </Container >
    );

}


const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 700;
    align-items: center;
    text-align: center;
    P{
        font-size: 6vw;
        font-family: "Silkscreen", sans-serif;
        color: #464646;
    }
    button{
        font-family: "Silkscreen", sans-serif;
        width: 15em;
        padding: 1em;
    }
`