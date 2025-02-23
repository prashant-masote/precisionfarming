import React, { useCallback } from "react";
import { useStateValue } from "../../StateProvider";
import "./CheckoutProduct.css";

const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {
    const [, dispatch] = useStateValue();

    // Memoize removeFromBasket function to prevent unnecessary re-renders
    const removeFromBasket = useCallback(() => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id,
        });
    }, [dispatch, id]);

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} alt={title} />

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>

                <p className="checkoutProduct__price">
                    <small>INR </small>
                    <strong>{price}</strong>
                </p>

                <div className="checkoutProduct__rating">
                    {Array.from({ length: rating }, (_, i) => (
                        <span key={i}>★</span>
                    ))}
                </div>

                {!hideButton && (
                    <button className="checkoutProduct__removeBtn" onClick={removeFromBasket}>
                        🛒 Remove from Basket
                    </button>
                )}
            </div>
        </div>
    );
};

export default CheckoutProduct;
