import React from "react";
import "./Header.css";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link, useNavigate } from "react-router-dom"; // React Router v6
import { useStateValue } from "../../StateProvider";
import { auth } from "../../render1";

const Header = () => {
    const [{ basket, user }] = useStateValue();
    const navigate = useNavigate(); // React Router v6 replacement for useHistory()

    const handleAuthentication = () => {
        if (user) {
            auth.signOut().then(() => navigate("/login"));
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="header">
            <Link to="/">
                <img
                    className="header__logo"
                    src="https://raw.githubusercontent.com/pranjals149/acevent/75eed4a1a0a65bdde48eddf5e5c061fca26b3934/expend/expend.svg"
                    alt="Khet Market Logo"
                />
            </Link>

            <div className="header__search">
                <Link to="/buy">
                    <h1 className="header__h1">Buy</h1>
                </Link>

                <Link to="/buyorsell">
                    <h1 className="header__h1 header__mainPage">Main Page</h1>
                </Link>
            </div>

            <div className="header__nav">
                <div onClick={handleAuthentication} className="header__option">
                    <span className="header__optionLineOne">
                        {user ? `Hello, ${user.email}` : "Hello, Guest"}
                    </span>
                    <span className="header__optionLineTwo">
                        {user ? "Sign Out" : "Sign In"}
                    </span>
                </div>

                <Link to="/orders">
                    <div className="header__option">
                        <span className="header__optionLineOne">Returns</span>
                        <span className="header__optionLineTwo">& Orders</span>
                    </div>
                </Link>

                <Link to="/checkout">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header__optionLineTwo header__basketCount">
                            {basket?.length}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Header;
