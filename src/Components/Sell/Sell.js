import React, { useState, useCallback } from "react";
import "./Sell.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useStateValue } from "../../StateProvider";
import { useNavigate } from "react-router-dom"; // React Router v6
import axios from "axios";

// API Base URL (Render Backend)
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

// Crop Options & MSP Prices
const options = ["Paddy", "Jowar", "Bajra", "Potato", "Maize", "Tomato", "Moong", "Urad"];
const mspRates = {
    Paddy: 18.68,
    Jowar: 26.2,
    Bajra: 21.5,
    Potato: 24,
    Maize: 18.5,
    Tomato: 16.5,
    Moong: 71.96,
    Urad: 60.3,
};

const Sell = () => {
    const navigate = useNavigate();
    const [{ user }] = useStateValue();

    // Form States
    const [capacity, setCapacity] = useState("");
    const [price, setPrice] = useState("");
    const [crop, setCrop] = useState("");
    const [contact, setContact] = useState("");
    const [mspText, setMspText] = useState("");
    const [file, setFile] = useState(null);
    const [isValid, setIsValid] = useState(false);

    // Handle File Upload
    const handleUpload = (event) => setFile(event.target.files[0]);

    // Validate Form
    const validate = useCallback(() => {
        if (!mspRates[crop]) return alert("Please select a valid crop from the list.");
        if (price < mspRates[crop]) {
            setMspText(`MSP for ${crop} is ₹${mspRates[crop]}`);
            return alert("Price cannot be less than MSP.");
        }
        if (contact.length !== 10) return alert("Contact No. must be 10 digits.");
        
        setMspText(`✔ Your price is above MSP! ✅`);
        setIsValid(true);
    }, [crop, price, contact]);

    // Handle Submission
    const addUser = async (e) => {
        e.preventDefault();
        if (!isValid) return alert("Please validate your details first.");

        try {
            const formData = new FormData();
            formData.append("crop", crop);
            formData.append("capacity", capacity);
            formData.append("price", price);
            formData.append("user", user?.email || "Anonymous");
            formData.append("contact", contact);
            if (file) formData.append("image", file);

            // Send data to backend (PostgreSQL)
            await axios.post(`${API_BASE_URL}/sell`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            navigate("/sellingItem");
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error submitting data. Please try again.");
        }
    };

    return (
        <div className="sell">
            <h1>Sell Crops</h1>
            <h4>{`Hello ${user?.email || "Guest"}`}</h4>

            <form className="sell__form" onSubmit={addUser}>
                <img
                    className="sell__formImage"
                    src="https://cdn.pixabay.com/photo/2017/01/26/16/51/supermarket-2011060_960_720.png"
                    alt="Market Icon"
                />

                {/* Crop Selection */}
                <div className="sell__crop">
                    <p className="sell__cropP">Available Crops:</p>
                    <Dropdown
                        className="sell__cropMenu"
                        options={options}
                        value={crop}
                        onChange={(e) => setCrop(e.value)}
                        placeholder="Select a Crop"
                        required
                    />
                </div>

                {/* Crop Input */}
                <div className="sell__selectCrop">
                    <p className="sell__selectCropP">Crop Name:</p>
                    <input
                        type="text"
                        placeholder="Enter the crop name..."
                        value={crop}
                        onChange={(e) => setCrop(e.target.value)}
                        required
                    />
                </div>

                {/* Capacity Input */}
                <div className="sell__capacity">
                    <p className="sell__capacityTitle">Capacity (KG):</p>
                    <input
                        type="number"
                        placeholder="Enter your capacity..."
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        required
                    />
                </div>

                {/* Contact Input */}
                <div className="sell__contact">
                    <p className="sell__contactP">Seller's Contact:</p>
                    <input
                        type="text"
                        placeholder="Enter phone number..."
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                    />
                </div>

                {/* Price Input */}
                <div className="sell__price">
                    <div className="sell__priceFields">
                        <p className="sell__priceP">Price / KG:</p>
                        <input
                            type="number"
                            placeholder="Enter price..."
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className="sell__mspDisplay">
                        <p className="msp__message">{mspText}</p>
                    </div>

                    {/* Image Upload */}
                    <div className="sell__image">
                        <p className="sell__imageP">Select Image:</p>
                        <input type="file" onChange={handleUpload} />
                    </div>

                    {/* Validate Button */}
                    <div className="sell__validate">
                        <button type="button" onClick={validate}>Validate with MSP</button>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="sell__button">
                    <button type="submit" className="sell__submit" disabled={!isValid}>
                        Submit
                    </button>
                </div>

                {/* Redirect to Buy Page */}
                <div className="sell__redirect">
                    <button type="button" onClick={() => navigate("/buy")}>
                        Redirect to Buy Page
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Sell;
