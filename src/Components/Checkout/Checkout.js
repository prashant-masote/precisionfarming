import React, { useMemo } from "react";
import { useStateValue } from "../../StateProvider";
import "../Checkout/Checkout.css";
import Subtotal from "../Subtotal/Subtotal";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";

const Checkout = () => {
    const [{ basket, user }] = useStateValue();

    // Memoize Basket Items to Avoid Unnecessary Rerenders
    const renderedBasket = useMemo(() => {
        if (basket.length === 0) {
            return <h3 className="checkout__empty">Your basket is empty.</h3>;
        }

        return basket.map((item) => (
            <CheckoutProduct
                key={item.id} // Unique key for React optimization
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
            />
        ));
    }, [basket]);

    return (
        <div className="checkout">
            {/* Left Section */}
            <div className="checkout__left">
                <div>
                    <h3>{user?.email ? `Hello, ${user.email}` : "Welcome, Guest!"}</h3>
                    <h2 className="checkout__title">Your Shopping Basket</h2>

                    {/* Render Basket Items */}
                    {renderedBasket}
                </div>
            </div>

            {/* Right Section */}
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    );
};

export default Checkout;
