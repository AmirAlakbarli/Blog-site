import axios from "axios";
const baseURL = "https://blog-api-t6u0.onrender.com";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
