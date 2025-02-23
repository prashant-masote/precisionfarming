import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "../../CheckoutProduct/CheckoutProduct";
import CurrencyFormat from "react-currency-format";

const Order = ({ order }) => {
    const orderDate = order?.data?.created
        ? moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")
        : "N/A";

    return (
        <div className="order">
            <h2 className="order__title">Your Orders</h2>

            <p>
                <strong className="order__label">Date:</strong> {orderDate}
            </p>

            <p className="order__id">
                <small>
                    <strong className="order__label">Order ID:</strong> {order?.id || "N/A"}
                </small>
            </p>

            {order?.data?.basket?.map((item) => (
                <CheckoutProduct
                    key={item.id} // Adding key to prevent React warnings
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideButton
                />
            ))}

            <CurrencyFormat
                renderText={(value) => <h3 className="order__total">Order Total: {value}</h3>}
                decimalScale={2}
                value={(order?.data?.amount || 0) / 100}
                displayType={"text"}
                thousandSeparator={true} // Fixed typo (was "thousandSeperator")
                prefix={"INR "}
            />
        </div>
    );
};

export default Order;
