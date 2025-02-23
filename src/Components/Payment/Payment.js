import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // React Router v6
import "../Payment/Payment.css";
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { getBasketTotal } from "../../Reducer";
import { db } from "../../render1";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../../axios";

const Payment = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    // State Hooks
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [address, setAddress] = useState("");

    // Generate Stripe Client Secret on Basket Change
    useEffect(() => {
        if (basket.length === 0) return; // Don't fetch if the basket is empty

        const getClientSecret = async () => {
            try {
                const response = await axios.post(`/payments/create?total=${getBasketTotal(basket) * 100}`);
                setClientSecret(response.data.clientSecret);
            } catch (err) {
                console.error("Error fetching client secret:", err);
            }
        };

        getClientSecret();
    }, [basket]);

    // Handle Payment Submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            setError("Stripe is not initialized.");
            setProcessing(false);
            return;
        }

        try {
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (payload.error) {
                throw new Error(payload.error.message);
            }

            // Save order to Firestore
            await db.collection("users")
                .doc(user?.uid)
                .collection("orders")
                .doc(payload.paymentIntent.id)
                .set({
                    basket: basket,
                    amount: payload.paymentIntent.amount,
                    created: payload.paymentIntent.created,
                    address: address,
                });

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({ type: "EMPTY_BASKET" });

            navigate("/orders", { replace: true }); // Redirect to orders page
        } catch (error) {
            setError(error.message);
            setProcessing(false);
        }
    };

    // Handle Card Details Change
    const handleChange = (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>

                {/* Delivery Address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <input
                            type="text"
                            placeholder="Enter Address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <p>{address}</p>
                    </div>
                </div>

                {/* Review items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map((item) => (
                            <CheckoutProduct
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment Method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <h3 className="payment__priceContainerH3">
                                    Order Total: INR {getBasketTotal(basket)}
                                </h3>
                                <button disabled={processing || disabled || succeeded}>
                                    {processing ? <p>Processing...</p> : "Buy Now"}
                                </button>
                            </div>
                            {error && <div className="payment__error">{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
