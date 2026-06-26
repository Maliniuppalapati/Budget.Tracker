import axios from "axios";

const API = axios.create({
  baseURL: "https://budget-tracker-z6gi.onrender.com/api",
});

// Set Authorization header dynamically
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export default API;
