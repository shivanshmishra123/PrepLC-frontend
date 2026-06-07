// src/config.js

// You only have to deal with import.meta here once
const config = {
  apiUrl: import.meta.env.VITE_API_URL || "https://preplc-backend.onrender.com", // Fallback useful for debugging
};

export default config;
