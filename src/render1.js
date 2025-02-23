import axios from "axios";

// Backend API Base URL (Render Hosted)
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

// Authentication Methods (Using JWT with PostgreSQL)
const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        localStorage.setItem("token", response.data.token); // Store JWT token
        return response.data;
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error;
    }
};

const register = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password });
        return response.data;
    } catch (error) {
        console.error("Registration Error:", error.response?.data || error.message);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem("token");
};

// Fetching Data from PostgreSQL (Replacing Firestore)
const fetchItems = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/items`);
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error.response?.data || error.message);
        throw error;
    }
};

// Uploading Files (Using Cloud Storage Instead of Firebase)
const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Secure Upload
            },
        });
        return response.data.imageUrl;
    } catch (error) {
        console.error("File Upload Error:", error.response?.data || error.message);
        throw error;
    }
};

// Verify User from JWT Token
const verifyUser = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return null;

        const response = await axios.get(`${API_BASE_URL}/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.user;
    } catch (error) {
        console.error("User Verification Error:", error.response?.data || error.message);
        return null;
    }
};

export { login, register, logout, fetchItems, uploadImage, verifyUser };
