import axios from 'axios'

// Client axios global
export const client = axios.create({
    baseURL: "http://localhost:3001"
  });

export default client;