import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './MarsRoverPhotos.module.scss';
import { fetchMarsRoverData } from '../../api/marsRoverApi';
import { format } from 'date-fns';


const MarsRoverPhotos: React.FC = () => {

    const [photos, setPhotos] = useState<PhotoData[]>([]);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

    interface PhotoData {
        id: number;
        img_src: string;
        earth_date: string;
    }

    useEffect(() => {
        fetchPhotos(selectedDate);
    }, [selectedDate]);
    useEffect(() => {
        fetchPhotos(selectedDate);
    }, []);

    const fetchPhotos = async (date: Date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        try {
            const response = await fetchMarsRoverData(formattedDate);
            setPhotos(response.photos);
        } catch (error) {
            console.error('Error fetching Mars Rover data:', error);
        }
    };
    const handlePhotoClick = (photo: PhotoData) => {
        const index = photos.findIndex((p) => p.id === photo.id);
        setSelectedPhotoIndex(index);
    };


    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };


    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const closeModal = (event: React.MouseEvent) => {
        event.stopPropagation();
        setSelectedPhotoIndex(null);
    };
    const handlePrevClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
            setSelectedPhotoIndex(selectedPhotoIndex - 1);
        }
    };

    const handleNextClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1) {
            setSelectedPhotoIndex(selectedPhotoIndex + 1);
        }
    };


    return (

        <div className={styles["mars-rover-photos"]}>
            <h2>Mars Rover Photos</h2>
            <p>
                Welcome! You can change the date to view Mars rover photos taken on
                that specific day. Use the calendar below to select a date and explore
                Mars through the lens of the rover.
            </p>
            <div className={styles["date-picker-container"]}>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    className={styles["datepicker"]}
                    maxDate={new Date()}
                />
            </div>
            <div className={styles["photo-grid"]}>
                {photos
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((photo: any, index: number) => (
                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                        <img
                            key={photo.id}
                            src={photo.img_src}
                            alt={`Mars Rover Photo taken on ${photo.earth_date}`}
                            onClick={() => handlePhotoClick(photo)}
                        />
                    ))}

            </div>
            <div className={styles["pagination"]}>
                {Array.from({ length: Math.ceil(photos.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
                    <button key={page} onClick={() => handlePageChange(page)}>
                        {page}
                    </button>
                ))}
            </div>
            {selectedPhotoIndex !== null && (
                <div className={`${styles['modal']} ${selectedPhotoIndex !== null ? styles['open'] : ''}`} onClick={closeModal}>
                    <button className={styles["close-button"]} onClick={closeModal}>
                        &times;
                    </button>
                    <button
                        className={`${styles['arrow']} ${selectedPhotoIndex === 0 ? styles['disabled'] : ''}`}
                        onClick={(event) => handlePrevClick(event)}
                    >
                        &#10094;
                    </button>
                    <img src={photos[selectedPhotoIndex].img_src} alt={`Mars Rover Photo1 taken on ${photos[selectedPhotoIndex].earth_date}`} />
                    <button
                        className={`${styles['arrow']} ${selectedPhotoIndex === photos.length - 1 ? styles['disabled'] : ''}`}
                        onClick={(event) => handleNextClick(event)}
                    >
                        &#10095;
                    </button>

                </div>

            )}
        </div>
    );

};

export default MarsRoverPhotos;