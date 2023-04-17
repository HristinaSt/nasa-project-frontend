import React from 'react';
import './App.css';
import APODImage from './components/apod/APODImage';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MarsRoverPhotos from './components/marsRover/MarsRoverPhotos';
import NEOList from './components/NEOList/NEOList';
import NEODetails from './components/NEOList/NEODetails/NeoDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <nav>
          <Link to="/apod" />
          <Link to="/mars-rover-photos" />
          <Link to="/neolist"/>
          <Link to="/neo-details/:id"/>
        </nav>
        <Routes>

          <Route path="/apod" element={<APODImage />} />
          <Route path="/mars-rover-photos" element={<MarsRoverPhotos />} />
          <Route path="/neolist" element={<NEOList/>} />
          <Route path="/neo-details/:id" element={<NEODetails/>} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
