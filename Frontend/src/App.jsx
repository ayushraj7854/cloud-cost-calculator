// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import About from './pages/About';
import Documentation from './pages/Documentation';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/about" element={<About />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;