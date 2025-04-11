import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Interact from './pages/Interact';
import Transfer from './pages/Transfer';
import TransferToken from './pages/TransferToken';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/interact" element={<Interact />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/transfertoken" element={<TransferToken />} />
      </Routes>
    </Router>
  );
}

export default App;
