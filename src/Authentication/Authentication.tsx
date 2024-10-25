import styled from "styled-components"
import { BsCart } from "react-icons/bs"
import { Outlet } from "react-router-dom"


const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 3em;
gap: 2em;
width: 100%;
`
const AuthContainer = styled.div`
background-color: #ffffff;
box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
width: 80%;
height: 60%;
border-radius: 18px;
max-width: 40rem;
min-height: 25rem;
`


export default function Authentication() {





    return (
        <Container>
            <h1>Welcome <BsCart /></h1>
            <AuthContainer>
                <Outlet />
            </AuthContainer>
        </Container>
    )
}
