import React from "react";
import { useNavigate } from "react-router-dom"; // React Router v6
import "./BuyorSell.css";
import buyImage from "./buy.jpeg";
import sellImage from "./sell.jpeg";

const BuyorSell = () => {
    const navigate = useNavigate();

    return (
        <div className="buyorsell">
            <div className="buyorsell__heading">
                <h1 className="buyorsell__h1">
                    Welcome to <strong>Khet Market</strong>
                </h1>
            </div>

            <div className="buyorsell__cards">
                {/* Buy Section */}
                <div className="card" onClick={() => navigate("/buy")}>
                    <img src={buyImage} alt="Buy Goods" className="buyorsell__image" />
                    <div className="container">
                        <h4><b>Buy Goods</b></h4>
                    </div>
                </div>

                {/* Sell Section */}
                <div className="card" onClick={() => navigate("/sell")}>
                    <img src={sellImage} alt="Sell Crops" className="buyorsell__image" />
                    <div className="container">
                        <h4><b>Sell Crops</b></h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyorSell;
