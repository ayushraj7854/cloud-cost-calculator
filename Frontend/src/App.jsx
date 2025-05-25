import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import About from './pages/About';
import Documentation from './pages/Documentation';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh' }}>
        {/* Navigation Header */}
        <Header />
        
        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/about" element={<About />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;