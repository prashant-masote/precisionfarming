import React from "react";
import { Link } from "react-router-dom"; // Use React Router for navigation
import "./css/Home.css";

const Home = () => {
    return (
        <div className="Home">
            {/* Navigation */}
            <div className="home__nav">
                <h3><Link to="/login" className="home__link">Login</Link></h3>
                <h3><Link to="/register" className="home__link">Register</Link></h3>
            </div>

            {/* Header */}
            <div id="header">
                <i className="fas fa-tractor fa-4x" aria-label="Tractor Icon"></i>
                <h1>Welcome to Khet Market.</h1>
                <p>
                    Khet Market – a one-step solution for farmers
                    <br /> to buy goods and sell crops.
                </p>
            </div>

            {/* Main Section */}
            <div id="main" className="home__main">
                <header className="major container medium">
                    <h2 className="home__description">
                        Khet Market is a web app through which farmers can sell crops and buy
                        equipment directly from other merchants without any third-party mediation.
                        To avoid price inflation and maintain regulated selling, the app validates
                        any purchase through the use of MSP for pricing. The app also incorporates
                        payment authentication, helping both parties avoid middleman costs and 
                        enabling a completely self-sufficient virtual market space.
                    </h2>
                </header>

                {/* Feature Sections */}
                <div className="box alt container">
                    <section className="feature left">
                        <Link to="/buy" className="image icon solid fa-shopping-cart">
                            <img src="images/pic01.jpg" alt="Buy Goods" />
                        </Link>
                        <div className="content">
                            <h3>Buy Goods</h3>
                            <p>
                                We provide all essential equipment, fertilizers, pesticides, and 
                                a variety of seeds crucial for a productive output.
                            </p>
                        </div>
                    </section>

                    <section className="feature right">
                        <Link to="/sell" className="image icon solid fa-handshake">
                            <img src="images/pic02.jpg" alt="Sell Crops" />
                        </Link>
                        <div className="content">
                            <h3>Sell Crops</h3>
                            <p>
                                We help you get the best value for your crops by ensuring prices
                                with Minimum Support Price (MSP).
                            </p>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <footer className="major container medium">
                    <h3>How are we different?</h3>
                    <p>
                        We are creating a safe, regulated, and fully virtual platform that acts
                        as a self-sufficient marketplace exclusively for farmers. By using MSP,
                        we make farmers aware of the true market value of their goods and help them
                        strengthen their negotiating position.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Home;
