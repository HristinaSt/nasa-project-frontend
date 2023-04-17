import React from 'react';
import './App.css';
import APODImage from './components/apod/APODImage';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MarsRoverPhotos from './components/marsRover/MarsRoverPhotos';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <nav>
          <Link to="/apod" />
          <Link to="/mars-rover-photos" />

        </nav>
        <Routes>

          <Route path="/apod" element={<APODImage />} />
          <Route path="/mars-rover-photos" element={<MarsRoverPhotos />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
