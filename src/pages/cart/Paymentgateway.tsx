import { useState } from 'react';
import PaymentForm from './PaymentForm';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../features/cart/cartSlice';

type Props = {
    setIsPaymentModalOpen: (value: boolean) => void;
}
function MockPaymentGateway({ setIsPaymentModalOpen }: Props) {
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const dispatch = useDispatch();



    const handlePaymentSuccess = () => {
        toast.success('Order Confirmed!')
        setPaymentStatus('success');
        dispatch(clearCart());
        setIsPaymentModalOpen(false)
    };

    const handlePaymentFailure = () => {
        toast.error("Payment Failed.")
        setPaymentStatus('failure');
        setIsPaymentModalOpen(false)
    };

    return (
        <Container>

            <Overlay onClick={() => setIsPaymentModalOpen(false)}>
            </Overlay>

            <PaymentDiv>
                <h2>Pay to confirm your order</h2>

                {paymentStatus === null && (
                    <PaymentForm
                        onPaymentSuccess={handlePaymentSuccess}
                        onPaymentFailure={handlePaymentFailure}
                    />
                )}

                {paymentStatus === 'success' && <p>Payment Successful! 🎉</p>}
                {paymentStatus === 'failure' && <p>Payment Failed. Please try again. ❌</p>}
            </PaymentDiv>
        </Container>
    );
}

export default MockPaymentGateway;


const PaymentDiv = styled.div`
    width:80%;
    max-width: 50em;
    height: 50%;
    border: 2px solid #dddddd;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    padding: 2em;
    align-items: center;
    gap: 1em;
    z-index: 1008;


    h2{
        margin-bottom: 1em;
    }

    @media (max-width:700px) {
        h2{
            font-size: 3vw;
        }
    }
    
    `

const Overlay = styled.div`
    position: fixed;
    backdrop-filter: blur(8px);
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 1002;
    justify-content:center ;
    align-items: center;
`

const Container = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 1001;
    justify-content:center ;
    align-items: center;
`