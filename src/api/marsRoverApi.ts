import axios from 'axios';

export const fetchMarsRoverData = async (date: string): Promise<any> => {
    try {
      const response = await axios.get('http://localhost:3001/mars-photos', {
        params: {
          date: date,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Mars Rover data:', error);
      throw error;
    }
  };
