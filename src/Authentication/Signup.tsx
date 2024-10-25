import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate, AppDispatch } from "../store"; // Import AppDispatch
import { signup } from "../features/auth/authSlice";

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  input {
    border-radius: 12px;
    border: 1px solid #ddd;
    padding: 1em;
    width: 70%;
    &:focus {
      outline: none;
    }
    &::placeholder {
      font-style: italic;
      color: #aeaeae;
    }
  }
`;

const LoginContainer = styled.div`
  text-align: center;
  display: flex;
  padding: 1em;
  flex-direction: column;
  gap: 2em;
  h2 {
    font-weight: 400;
    color: #6e6e6e;
  }
  h4 {
    font-weight: 400;
    color: #939393;
  }
  p {
    font-size: 14px;
    font-weight: 300;
    font-style: italic;
    span {
      color: #60a6e7;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export default function Signup() {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state: Rootstate) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        city: '',
        street: '',
        number: '',
        zipcode: '',
        phone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(signup({
            email: formData.email,
            username: formData.username,
            password: formData.password,
            name: { firstname: formData.firstname, lastname: formData.lastname },
            address: {
                city: formData.city,
                street: formData.street,
                number: Number(formData.number),
                zipcode: formData.zipcode,
                geolocation: { lat: '-37.3159', long: '81.1496' },
            },
            phone: formData.phone,
        })).then((result) => {
            if (signup.fulfilled.match(result)) {
                navigate('/login');
            }
        });
    };

    return (
        <LoginContainer>
            <h2>Signup</h2>
            <h4>Create a new account</h4>
            <LoginForm onSubmit={handleSubmit}>
                <input type="text" name="email" onChange={handleChange} placeholder="Email" required />
                <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
                <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
                <input type="text" name="firstname" onChange={handleChange} placeholder="First Name" required />
                <input type="text" name="lastname" onChange={handleChange} placeholder="Last Name" required />
                <input type="text" name="city" onChange={handleChange} placeholder="City" required />
                <input type="text" name="street" onChange={handleChange} placeholder="Street" required />
                <input type="text" name="number" onChange={handleChange} placeholder="Street Number" required />
                <input type="text" name="zipcode" onChange={handleChange} placeholder="Zipcode" required />
                <input type="text" name="phone" onChange={handleChange} placeholder="Phone" required />
                <div>
                    <Button type="reset" $variant="secondary">Clear</Button>
                    <Button type="submit">{loading ? 'Signing up...' : 'Sign Up'}</Button>
                </div>
            </LoginForm>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </LoginContainer>
    );
}
