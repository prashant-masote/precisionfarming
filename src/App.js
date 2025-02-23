import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { verifyUser } from './render1'; // Backend functions
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Components
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import BuyorSell from './Components/BuyorSell/BuyorSell';
import Header from './Components/Header/Header';
import Buy from './Components/Buy/Buy';
import Checkout from './Components/Checkout/Checkout';
import Payment from './Components/Payment/Payment';
import Orders from './Components/Orders/Orders';
import Sell from './Components/Sell/Sell';
import SellingItem from './Components/SellingItem/SellingItem';
import Home from './Components/Home/Home';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const token = localStorage.getItem("token"); // Get stored JWT token
      if (token) {
        const userData = await verifyUser(token); // Verify JWT
        if (userData) {
          dispatch({
            type: 'SET_USER',
            user: userData
          });
        }
      }
      setLoading(false);
    }
    checkUser();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/buy" element={<><Header /><Buy /></>} />

          {/* Protected Routes */}
          <Route path="/buyorsell" element={user ? <BuyorSell /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={user ? <><Header /><Checkout /></> : <Navigate to="/login" />} />
          <Route path="/payment" element={user ? <Elements stripe={stripePromise}><Payment /></Elements> : <Navigate to="/login" />} />
          <Route path="/orders" element={user ? <><Header /><Orders /></> : <Navigate to="/login" />} />
          <Route path="/sell" element={user ? <Sell /> : <Navigate to="/login" />} />
          <Route path="/sellingItem" element={user ? <SellingItem /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
