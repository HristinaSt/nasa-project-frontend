import React, { useState, useEffect } from 'react';
import { fetchAPODData } from '../../api/apodApi';
import styles from './APODImage.module.scss';

interface APODData {
  [date: string]: {
    title: string,
    explanation: string,
    hdurl: string,
    url: string
  }
}

const APODImage: React.FC = () => {
  const [apodData, setApodData] = useState<APODData>({});
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        const todayString = today.toISOString().slice(0, 10);
        const data = await fetchAPODData(todayString);
        setApodData(data);
        setImageUrl(data[todayString].url);
      } catch (error) {
        console.error('Error fetching APOD data:', error);
      }
    };
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 60500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.imageContainer}>
      <img
        className={styles.image}
        src={imageUrl}
        alt="Astronomy Picture1"
      />
    </div>
  );
};

export default APODImage;
