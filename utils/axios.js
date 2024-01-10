import axios from 'axios';

const API_URL = 'http://localhost:3001'; 

export const registerUser = async (name, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, password });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l’utilisateur:', error);
    throw error;
  }
};
