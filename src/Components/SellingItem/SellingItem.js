import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router v6
import { useStateValue } from "../../StateProvider";
import { db } from "../../render1";
import SellingPost from "./SellingPost/SellingPost";
import "./SellingItem.css";

const SellingItem = () => {
    const [{ user }] = useStateValue();
    const navigate = useNavigate();
    const [post, setPost] = useState([]);

    useEffect(() => {
        if (!user) return;

        const unsubscribe = db.collection("SellingUsers").onSnapshot(
            (snapshot) => {
                setPost(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            },
            (error) => console.error("Error fetching selling items:", error)
        );

        return () => unsubscribe();
    }, [user]);

    return (
        <div className="sellingItem">
            <h2 className="sellingItem__heading">
                🎉 Congratulations <strong>{user?.email}</strong>, your item is saved with us!
            </h2>

            <div className="sellingItem__buttons">
                <button className="sellingItem__button" onClick={() => navigate("/sell")}>
                    Go Back to Sell Page
                </button>

                <button className="sellingItem__button" onClick={() => navigate("/buyorsell")}>
                    Go Back to Main Page
                </button>
            </div>

            <div className="sellingItem__post">
                {post.length > 0 ? (
                    post.map((item) => <SellingPost key={item.id} classData={item} />)
                ) : (
                    <p className="sellingItem__empty">No items available for sale.</p>
                )}
            </div>
        </div>
    );
};

export default SellingItem;
