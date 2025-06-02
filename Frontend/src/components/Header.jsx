import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'About', path: '/about' },
    { name: 'Documentation', path: '/docs' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header style={{
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: '0',
      zIndex: '100',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Logo */}
        <Link 
          to="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <div style={{
            fontSize: '2rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ☁️
          </div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            CloudCalc
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          gap: '30px',
          alignItems: 'center'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              style={{
                textDecoration: 'none',
                color: isActive(item.path) ? '#667eea' : '#4a5568',
                fontWeight: isActive(item.path) ? 'bold' : '500',
                fontSize: '1rem',
                padding: '8px 16px',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                backgroundColor: isActive(item.path) ? 'rgba(102, 126, 234, 0.1)' : 'transparent'
              }}
              onMouseOver={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.color = '#667eea';
                  e.target.style.backgroundColor = 'rgba(102, 126, 234, 0.05)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.color = '#4a5568';
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '4px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px'
          }}
          className="mobile-menu-btn"
        >
          <div style={{
            width: '25px',
            height: '3px',
            backgroundColor: '#667eea',
            borderRadius: '2px',
            transition: 'all 0.3s ease'
          }}></div>
          <div style={{
            width: '25px',
            height: '3px',
            backgroundColor: '#667eea',
            borderRadius: '2px',
            transition: 'all 0.3s ease'
          }}></div>
          <div style={{
            width: '25px',
            height: '3px',
            backgroundColor: '#667eea',
            borderRadius: '2px',
            transition: 'all 0.3s ease'
          }}></div>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div style={{
          backgroundColor: 'white',
          borderTop: '1px solid #e2e8f0',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
        className="mobile-menu"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: isActive(item.path) ? '#667eea' : '#4a5568',
                fontWeight: isActive(item.path) ? 'bold' : '500',
                fontSize: '1.1rem',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: isActive(item.path) ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {/* CSS for responsive design */}
      <style>
        {`
          @media (max-width: 768px) {
            nav {
              display: none !important;
            }
            .mobile-menu-btn {
              display: flex !important;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;