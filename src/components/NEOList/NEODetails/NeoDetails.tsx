import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { fetchNEODetails } from '../../../api/neoApi';
import  styles from './NEODetails.module.scss';

interface NEODetailsParams {
    id: string;
}

interface NEO {
    id: string;
    name: string;
    close_approach_date: string;
    distance: number;
    dangerLevel: "green" | "orange" | "red";
    close_approach_data: any[];
}

const NEODetails: React.FC = () => {
    const { id } = useParams<Record<keyof NEODetailsParams, string>>();
    const [neoDetails, setNeoDetails] = useState<any>(null);
    const [neo, setNeo] = useState<NEO | null>(null);
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
       navigate('/neolist');
    };

    const renderEarthMoonSVG = (distance: number) => {
        const scaleFactor = 1 / 20;
        const earthRadius = 6371 * scaleFactor;
        const moonDistance = 384400 * scaleFactor;
        const lineLength = distance * scaleFactor;

        return (
            <svg width="1000" height="500" viewBox="0 0 1000 500">
                <circle cx="500" cy="250" r={earthRadius} fill="blue" />
                <circle cx="500" cy="250" r="5" fill="white" />
                <circle cx={500 + moonDistance} cy="250" r="2" fill="gray" />
                <line
                    x1="500"
                    y1="250"
                    x2={500 + lineLength}
                    y2="250"
                    stroke="red"
                    strokeWidth="1"
                />
            </svg>
        );
    };

    useEffect(() => {
        const fetchNEODetailsFunction = async () => {
            if (id) {
                try {
                    const data = await fetchNEODetails(id);
                    const distance = parseFloat(
                        data.close_approach_data[0].miss_distance.kilometers
                    );
                    const lunarDistance = 384_400;
                    let dangerLevel: "green" | "orange" | "red" = "green";
    
                    if (distance <= 0.5 * lunarDistance) {
                        dangerLevel = "red";
                    } else if (distance < lunarDistance) {
                        dangerLevel = "orange";
                    }
    
                    const processedNEO: NEO = {
                        id: data.id,
                        name: data.name,
                        close_approach_date: data.close_approach_data[0].close_approach_date,
                        distance,
                        dangerLevel,
                        close_approach_data: data.close_approach_data,
                    };
    
                    setNeo(processedNEO);
                    setNeoDetails(data);
                } catch (error) {
                    console.error('Error fetching NEO details:', error);
                }
            }
        };
    
        fetchNEODetailsFunction();
    }, [id]);

    if (!neoDetails) {
        return <div>Loading...</div>;
    }
    return (
        <div className="NEODetails">
                        <button onClick={handleBackButtonClick} className={styles.backButton}>&#8592; Back to NEO List</button>
            <h2>{neoDetails.name}</h2>
            <p>
                Estimated diameter (min-max):{' '}
                {neoDetails.estimated_diameter.meters.estimated_diameter_min.toFixed(2)}{' '}
                -{' '}
                {neoDetails.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}{' '}
                meters
            </p>
            <div>
                {neo ? (
                    <div>
                        <h1>{neo.name}</h1>
                        <p>
                            Close approach date: {neo.close_approach_date} | Distance:{" "}
                            {neo.distance.toFixed(2)} km
                        </p>

                        <div className={styles.chartContainer}>
                            <LineChart
                                width={800}
                                height={400}
                                data={neo.close_approach_data.map((cad: any) => ({
                                    date: cad.close_approach_date,
                                    distance: parseFloat(cad.miss_distance.kilometers),
                                }))}
                            >
                                <Line type="monotone" dataKey="distance" stroke="#8884d8" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            </LineChart>
                        </div>
                        <div className={styles.svgContainer}>
                            {renderEarthMoonSVG(neo.distance)}
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default NEODetails;