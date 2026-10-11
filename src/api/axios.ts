import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.BASE_URL, // Важно для GitHub Pages
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;