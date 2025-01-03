import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { Rootstate, AppDispatch } from "../store"; // Import AppDispatch
import { useState } from "react";
import { login } from "../features/auth/authSlice";

const LoginForm = styled.form`
display: flex ;
flex-direction: column;
align-items: center;
gap: 1em;

input{
    border-radius: 12px;
    border: 1px solid #ddd;
    padding: 1em;
    width: 70%;
    &:focus{
        outline: none;
    }
    &::placeholder{
        font-style: italic;
        color: #aeaeae;
    }

}

`
const LoginContainer = styled.div`
    text-align: center;
    display: flex;
    padding: 1em;
    flex-direction: column;
    gap: 2em;
    h2{
        font-weight: 400;
        color: #6e6e6e;
    }
    p{
        font-size: 14px;
        font-weight: 300;
        font-style: italic;

        span{
            color: #60a6e7;
            text-decoration:underline;
            cursor: pointer;
        }
    }
    @media (max-width:320px) {
        padding: 0;
    }


`
export default function Login() {
    const dispatch: AppDispatch = useDispatch();
    const { loading, error } = useSelector((state: Rootstate) => state.auth);
    const navigate = useNavigate();



    const [formData, setFormData] = useState({
        username: 'johnd',
        password: 'm38rmF$',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueWithoutSpaces = e.target.value.replace(/\s+/g, ''); // Remove all spaces
        setFormData({ ...formData, [e.target.name]: valueWithoutSpaces });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({
            username: formData.username,
            password: formData.password,
        })).then((result) => {
            if (login.fulfilled.match(result)) {
                navigate('/home');
            }
        });
    };



    return (
        <LoginContainer>
            <h2>Login</h2>
            <LoginForm onSubmit={handleSubmit}>
                <input name="username" value={formData.username} onChange={handleChange} required placeholder="@username" type="text" />
                <input type="password" name="password" onChange={handleChange} value={formData.password} required placeholder="password" />
                <Buttons>
                    <Button type="reset" $variant="secondary">Clear</Button>
                    <Button type="submit">{loading ? 'Login...' : 'Login '}</Button>
                </Buttons>
            </LoginForm>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </LoginContainer>
    )
}



const Buttons = styled.div`
    display: flex;
    gap: 1em;
`