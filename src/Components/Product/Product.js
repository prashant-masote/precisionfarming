import React, { useCallback } from "react";
import "./Product.css";
import { useStateValue } from "../../StateProvider";

const Product = ({ id, title, image, price, rating }) => {
    const [{ user }, dispatch] = useStateValue();

    // Memoized addToBasket function
    const addToBasket = useCallback(() => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id,
                title,
                image,
                price,
                rating,
                user: user?.email || "Guest", // Default to "Guest" if no user
            },
        });
    }, [dispatch, id, title, image, price, rating, user]);

    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>INR </small>
                    <strong>{price}</strong>
                </p>
            </div>

            <div className="product__rating">
                {Array.from({ length: rating }, (_, i) => (
                    <span key={i} className="product__stars">★</span>
                ))}
            </div>

            <img src={image} alt={title} className="product__image" />
            <button onClick={addToBasket} className="product__button">
                Add to Basket
            </button>
        </div>
    );
};

export default Product;
