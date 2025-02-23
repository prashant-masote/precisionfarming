import React, { useState } from "react";
import "./Register.css";
import { auth, db } from "../../render1";
import { useNavigate } from "react-router-dom"; // React Router v6

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [khasra, setKhasra] = useState("");
    const [address, setAddress] = useState("");
    const [aadhar, setAadhar] = useState("");
    const [contact, setContact] = useState("");

    const validate = () => {
        if (khasra.length !== 8) return "Khasra No. must be 8 digits!";
        if (aadhar.length !== 12) return "Aadhar No. must be 12 digits!";
        if (contact.length !== 10) return "Contact No. must be 10 digits!";
        return null;
    };

    const register = async (e) => {
        e.preventDefault();
        const errorMessage = validate();
        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        try {
            // Create user in Firebase Authentication
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Store user data in Firestore
            await db.collection("FarmersInfo").doc(user.uid).set({
                email,
                khasra,
                address,
                aadhar,
                contact,
            });

            navigate("/buyorsell"); // Redirect after successful registration
        } catch (error) {
            console.error("Registration Error:", error);
            alert(error.message);
        }
    };

    return (
        <div className="register">
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <h2 className="active">Sign Up</h2>

                    <div className="fadeIn first">
                        <img
                            src="https://cdn.pixabay.com/photo/2017/01/26/16/51/supermarket-2011060_960_720.png"
                            id="icon"
                            alt="User Icon"
                        />
                    </div>

                    <form onSubmit={register}>
                        <input
                            type="email"
                            className="fadeIn second"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            className="fadeIn third"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Enter Khasra No."
                            value={khasra}
                            onChange={(e) => setKhasra(e.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Enter Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Enter Aadhar No."
                            value={aadhar}
                            onChange={(e) => setAadhar(e.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Enter Contact No."
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />

                        <button type="submit" className="register__button">
                            Sign Up
                        </button>
                    </form>

                    <button onClick={() => navigate("/login")} className="fadeIn fourth">
                        Redirect to Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
