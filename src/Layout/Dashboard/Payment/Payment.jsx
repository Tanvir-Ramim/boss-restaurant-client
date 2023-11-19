import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutFrom from "./CheckOutFrom";

// TODO
const stripePromise= loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    return (
        <div>
            <SectionTitle subHeading='Paymentc' heading='Please pay to eat'></SectionTitle>
            <div>
                <Elements stripe={stripePromise}> 
                 <CheckOutFrom></CheckOutFrom>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;