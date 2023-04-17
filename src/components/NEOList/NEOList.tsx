// src/components/NEOList.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NEOList.module.scss";
import { fetchNEOs } from '../../api/neoApi';

interface NEO {
  id: string;
  name: string;
  close_approach_date: string;
  distance: number;
  dangerLevel: "green" | "orange" | "red";
}

const NEOList: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [NEOs, setNEOs] = useState<NEO[]>([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [neoCount, setNeoCount] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
        const fetchNEO = async (page: number) => {
            try {
            
              const data = await fetchNEOs(startDate, endDate);
              setNeoCount(data.element_count);
              const sortedDates = Object.keys(data.near_earth_objects).sort();
              const sortedNEOs = sortedDates.map((date) => data.near_earth_objects[date]);
          
              const processedNEOs: NEO[] = sortedNEOs.flatMap(
                (dateNEOs: any[]) =>
                  dateNEOs.map((neo: any) => {
                    const distance = parseFloat(
                      neo.close_approach_data[0].miss_distance.kilometers
                    );
                    const lunarDistance = 384_400; 
                    let dangerLevel: "green" | "orange" | "red" = "green";
          
                    if (distance <= 0.5 * lunarDistance) {
                      dangerLevel = "red";
                      console.log('Red:', neo.name, distance);
                    } else if (distance < lunarDistance) {
                      dangerLevel = "orange";
                      console.log('Orange:', neo.name, distance);
                    } else {
                      console.log('Green:', neo.name, distance);
                    }
          
                    return {
                      id: neo.id,
                      name: neo.name,
                      close_approach_date: neo.close_approach_data[0].close_approach_date,
                      distance,
                      dangerLevel,
                    };
                  })
              );
          
              setNEOs(processedNEOs);
            } catch (error) {
              console.error("Error fetching NEO data:", error);
            }
          };
          


          if (startDate && endDate) {
            fetchNEO(currentPage);
          }

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate,endDate]);

  
  const pageCount = Math.ceil(neoCount / 20); 
const pages = [];
for (let i = 1; i <= pageCount; i++) {
  pages.push(i);
}

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const onNEOClick = (id: string) => {
    navigate(`/neo-details/${id}`);
  };
  const renderNEO = (neo: NEO, index: number) => {
    // Calculate the starting index for the current page
    const startIndex = (currentPage - 1) * 20;
  
    // Calculate the ending index for the current page
    const endIndex = startIndex + 20;
  
    // Only render the items that are within the range of the current page
    if (index >= startIndex && index < endIndex) {
      return (
        <div
          key={neo.id}
          className={`${styles.neoListItem} ${styles['neoListItem' + capitalize(neo.dangerLevel)]}`}
          onClick={() => onNEOClick(neo.id)}
        >
          {neo.name} ({neo.close_approach_date})
        </div>
      );
    } else {
      return null;
    }
  };
  
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div>
      <h2>Near Earth Objects</h2>
      <p>
        Explore a list of Near Earth Objects (NEOs) by selecting a date range.
        NEOs are highlighted based on the level of danger they represent
      </p>
      
      <p>
        Click on an item to view more details, including a chart mapping the
        level of danger that the object may represent to Earth.
      </p>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            max={today}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
     
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            max={today}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.neoListContainer}>
  {NEOs.map((neo, index) => renderNEO(neo, index))}
</div>
      <div>
      {pages.map((page) => (
        <button key={page} onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}
    </div>
  </div>
);
};

export default NEOList;
