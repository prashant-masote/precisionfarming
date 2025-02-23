import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const login = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
};

export const fetchCrops = async () => {
    const response = await axios.get(`${API_BASE_URL}/crops`);
    return response.data;
};
