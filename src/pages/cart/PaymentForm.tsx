import { useState } from 'react';
import styled from 'styled-components';

type PaymentFormProps = {
    onPaymentSuccess: () => void,
    onPaymentFailure: () => void,
}

function PaymentForm({ onPaymentSuccess, onPaymentFailure }: PaymentFormProps) {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        setTimeout(() => {
            const isSuccess = Math.random() > 0.5;
            setIsProcessing(false);
            if (isSuccess) {
                onPaymentSuccess();
            } else {
                onPaymentFailure();
            }
        }, 2000);
    };

    return (
        <Form onSubmit={handlePaymentSubmit}>
            <div>
                <label>Card Number:</label>
                <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="number"
                    required
                />
            </div>
            <div>
                <label>Expiry Date:</label>
                <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    required
                />
            </div>
            <div>
                <label>CVV:</label>

                <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    required
                />
            </div>
            <button type="submit" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
        </Form>
    );
}

export default PaymentForm;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    div{
        display: flex;
        gap: 1em;

        input{
            margin-left: auto;
            padding: .5em;
            border: 1px solid #d9d9d9;
            border-radius: 8px;
            &:focus{
                background-color: #bac2d538;
                outline: none;
            }
        }

        @media (max-width:370px) {
            label{
                font-size: clamp(12px , 3vw , 18px);
            }
        }
        @media (max-width:330px) {
            input{
                width: 50%;
                height: 35px;

            }
        }
    }

    button{
        border: 1px solid #d9d9d9;
        background-color: #646eff;
        color: white;
        height: 2.5em;
        border-radius: 12px;
        transition: all .5s ease;
        cursor: pointer;
        &:hover{
background-color: #868efc;

        }

    }
`
