import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navigation.css';

const Navigation = ({ openContact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="navigation frosty">
      <div className="nav-container">
        
        <div className="nav-left-group">
          {/* Mobile Hamburger Menu (Left) */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Brand (Center on mobile, Left on desktop) */}
          <Link to="/" className="nav-brand" onClick={() => setIsOpen(false)}>
            <img src="/oryx-logo.png" alt="Oryx Studios Logo" className="nav-logo" />
          </Link>
        </div>

        {/* Desktop Links / Mobile Overlay */}
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <a href="/#work" className="nav-link" onClick={() => setIsOpen(false)}>Work</a>
          <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>About</Link>
          <a href="#" className="nav-link contact-btn desktop-only" onClick={(e) => { e.preventDefault(); setIsOpen(false); openContact(); }}>Let's Work</a>
        </div>

        {/* Mobile Static Contact Button (Right) */}
        <a href="#" className="nav-link contact-btn mobile-only" onClick={(e) => { e.preventDefault(); openContact(); }}>Let's Work</a>

      </div>
    </nav>
  );
};

export default Navigation;
