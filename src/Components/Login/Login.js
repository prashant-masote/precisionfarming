import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // React Router v6
import { auth } from "../../render1";
import { useStateValue } from "../../StateProvider";
import "./Login.css";

const Login = () => {
    const [, dispatch] = useStateValue();
    const navigate = useNavigate(); // React Router v6 hook

    // State for user input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle Sign In
    const signIn = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            dispatch({
                type: "SET_USER",
                user: userCredential.user, // Correctly setting the user object
            });
            navigate("/buyorsell"); // Redirect after successful login
        } catch (error) {
            console.error("Login Error:", error);
            alert(error.message);
        }
    };

    // Redirect to Register Page
    const redirect = useCallback(() => navigate("/register"), [navigate]);

    return (
        <div className="login">
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <h2 className="active"> Sign In </h2>

                    <div className="fadeIn first">
                        <img
                            src="https://cdn.pixabay.com/photo/2016/04/25/07/15/man-1351317_960_720.png"
                            id="icon"
                            alt="User Icon"
                        />
                    </div>

                    <form onSubmit={signIn}>
                        <input
                            type="email"
                            id="Username"
                            className="fadeIn second"
                            name="login"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            id="password"
                            className="fadeIn third"
                            name="login"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit" className="fadeIn fourth">
                            Log In
                        </button>
                    </form>

                    <button className="fadeIn redirectBtn" onClick={redirect}>
                        Redirect to Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
