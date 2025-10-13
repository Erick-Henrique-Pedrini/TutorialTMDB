import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  
  params: {
    api_key: '60772ef54f8f6cd05409768a82335f9b',
  },
});

export default api;