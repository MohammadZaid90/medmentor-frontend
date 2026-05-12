import axios from "axios";

// backend running on port 5001
const API = axios.create({
  baseURL: "https://medmentor-backend.onrender.com/api", 
});

export default API;
