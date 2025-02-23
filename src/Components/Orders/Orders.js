import React, { useEffect, useState } from "react";
import "./Orders.css";
import { db } from "../../render1";
import { useStateValue } from "../../StateProvider";
import Order from "./Order/Order";

const Orders = () => {
    const [{ user }] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user) {
            setOrders([]);
            return;
        }

        const ordersRef = db
            .collection("users")
            .doc(user.uid)
            .collection("orders")
            .orderBy("created", "desc");

        const unsubscribe = ordersRef.onSnapshot(
            (snapshot) => {
                setOrders(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                })));
            },
            (error) => console.error("Error fetching orders:", error) // Handle errors
        );

        return () => unsubscribe(); // Cleanup Firestore listener on unmount
    }, [user]);

    return (
        <div className="orders">
            <h2 className="orders__title">Your Orders</h2>

            <div className="orders__order">
                {orders.length > 0 ? (
                    orders.map((order) => <Order key={order.id} order={order} />)
                ) : (
                    <p className="orders__empty">You have no orders yet.</p>
                )}
            </div>
        </div>
    );
};

export default Orders;
