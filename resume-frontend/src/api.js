import axios from 'axios';

const API_URL = 'http://localhost:8080/api';


// api.js
export const getResumeById = async (resumeId) => {
    try {
      const response = await axios.get(`${API_URL}/getResumeById/${resumeId}`);
      console.log('API Response:', response.data); // Add this line
      return response.data;
    } catch (error) {
      console.error('Error fetching resume by ID:', error);
      throw error;
    }
  };
  

  


export const getResumeByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/getResumeByName/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resumes by name:', error);
    throw error;
  }
};




export const uploadResumeDetails = async (resumeData) => {
    try {
      const response = await axios.post(`${API_URL}/uploadResumeDetails`, resumeData);
      return response.data.resumeId; // Assuming the server sends the generated resume ID
    } catch (error) {
      console.error('Error uploading resume details:', error);
      throw error;
    }
  };