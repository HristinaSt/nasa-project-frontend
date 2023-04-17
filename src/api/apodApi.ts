import axios from 'axios';

export const fetchAPODData = async (date: string): Promise<any> => {
  try {
    const response = await axios.get('http://localhost:3001/apod', { 
      params: {
        date: date,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    throw error;
  }
};
