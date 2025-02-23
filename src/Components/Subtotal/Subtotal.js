import React from "react";
import { useNavigate } from "react-router-dom"; // React Router v6
import { getBasketTotal } from "../../Reducer";
import { useStateValue } from "../../StateProvider";
import "../Subtotal/Subtotal.css";

const Subtotal = () => {
    const navigate = useNavigate();
    const [{ basket }] = useStateValue();

    const formattedTotal = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
    }).format(getBasketTotal(basket));

    return (
        <div className="subtotal">
            <p>
                Subtotal ({basket?.length || 0} items): <strong>{formattedTotal}</strong>
            </p>

            <button onClick={() => navigate("/payment")}>Proceed to Checkout</button>
        </div>
    );
};

export default Subtotal;
