import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const fetchNEOs = async (startDate: string, endDate: string) => {
    const response = await axios.get(`${BASE_URL}/neo?start_date=${startDate}&end_date=${endDate}`);
    return response.data;
  };
  
  export const fetchNEODetails = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/neo/${id}`);
    return response.data;
  };

export {};
