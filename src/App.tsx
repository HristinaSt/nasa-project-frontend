import React from 'react';
import './App.css';
import APODImage from './components/apod/APODImage';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <nav>

          <Link to="/apod" />

        </nav>
        <Routes>

          <Route path="/apod" element={<APODImage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
