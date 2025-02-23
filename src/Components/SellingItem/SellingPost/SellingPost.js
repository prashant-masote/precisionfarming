import React, { useEffect, useState } from "react";
import { storage } from "../../../render1";
import "./SellingPost.css";

const SellingPost = ({ classData }) => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!classData.Image) return;

        const fetchImage = async () => {
            try {
                const url = await storage.ref(`/images/${classData.Image}`).getDownloadURL();
                setImage(url);
            } catch (err) {
                console.error("Error fetching image:", err);
                setError("Image not available.");
            }
        };

        fetchImage();
    }, [classData.Image]);

    return (
        <div className="sellingPost">
            <div className="sellingPost__crop">
                <p><strong>Crop:</strong> {classData.crop}</p>
            </div>

            <div className="sellingPost__price">
                <p><strong>Price:</strong> ₹{classData.price}</p>
            </div>

            <div className="sellingPost__capacity">
                <p><strong>Capacity:</strong> {classData.capacity} KG</p>
            </div>

            <div className="sellingPost__contact">
                <p><strong>Contact:</strong> {classData?.contact}</p>
            </div>

            <div className="sellingPost__user">
                <p><strong>Email:</strong> {classData?.user}</p>
            </div>

            <div className="sellingPost__image">
                {image ? (
                    <img
                        src={image}
                        alt={`Crop: ${classData.crop}`}
                        className="sellingPost__img"
                    />
                ) : (
                    <p className="sellingPost__error">{error || "Loading image..."}</p>
                )}
            </div>
        </div>
    );
};

export default SellingPost;
