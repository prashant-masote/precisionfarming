import React, { useMemo } from "react";
import Product from "../Product/Product";
import "./Buy.css";

const Buy = () => {
    // Memoized Product Data (Prevents Unnecessary Re-renders)
    const products = useMemo(() => [
        {
            id: "1",
            title: "TrustBasket Organic Vermicompost Fertilizer Manure for Plants - 5 KG",
            price: 299,
            image: "https://m.media-amazon.com/images/I/71iPA5LfB7L._AC_UL320_.jpg",
            rating: 5,
        },
        {
            id: "2",
            title: "Trust basket Enriched Organic Earth Magic Potting Soil Fertilizer for Plants, 5 kg",
            price: 299,
            image: "https://m.media-amazon.com/images/I/61fUoGkNdHL._AC_UL320_.jpg",
            rating: 4,
        },
        {
            id: "3",
            title: "Go Garden NPK 19 19 19 Fertilizer for Plants and Gardening Purpose (450G)",
            price: 199,
            image: "https://m.media-amazon.com/images/I/71t4fa+-XHL._AC_UL320_.jpg",
            rating: 4,
        },
        {
            id: "4",
            title: "John Deere 5310 4WD",
            price: 100000,
            image: "https://www.tractorjunction.com/assets/images/upload/john-deere-5310-4wd-985351.png",
            rating: 5,
        },
        {
            id: "5",
            title: "Kartar 4000",
            price: 247000,
            image: "https://www.tractorjunction.com/assets/images/images/implementTractor/40009999.jpg",
            rating: 5,
        },
        {
            id: "6",
            title: "VISHWAKARMA Mild Steel YUG-15 Model Cultivator, More Than 40 Hp",
            price: 24500,
            image: "https://5.imimg.com/data5/UL/CE/UO/SELLER-288604/yug-15-model-cultivator-500x500.jpg",
            rating: 5,
        },
        {
            id: "7",
            title: "Wasabinoki Seeds",
            price: 600,
            image: "https://5.imimg.com/data5/VP/MG/MY-3966004/wasabinoki-seeds-500x500.jpg",
            rating: 5,
        },
        {
            id: "8",
            title: "Gliricidia Sepium",
            price: 400,
            image: "https://5.imimg.com/data5/DP/DI/MY-2072454/gliricidia-sepium-500x500.jpg",
            rating: 5,
        },
        {
            id: "9",
            title: "Saffron Seeds",
            price: 1450,
            image: "https://5.imimg.com/data5/TV/GS/MY-23290214/saffron-seeds-500x500.jpeg",
            rating: 5,
        },
    ], []);

    return (
        <div className="buy">
            <div className="home__container">
                <img
                    className="home__image"
                    src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                    alt="Agriculture background"
                />

                {/* Render Products in Rows */}
                <div className="home__row">
                    {products.slice(0, 3).map((product) => (
                        <Product key={product.id} {...product} />
                    ))}
                </div>

                <div className="home__row">
                    {products.slice(3, 6).map((product) => (
                        <Product key={product.id} {...product} />
                    ))}
                </div>

                <div className="home__row">
                    {products.slice(6, 9).map((product) => (
                        <Product key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Buy;
