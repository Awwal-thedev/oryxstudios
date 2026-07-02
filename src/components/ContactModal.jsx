import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { X, Send, CheckCircle2, Globe, Palette, Lightbulb } from 'lucide-react';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setTemplate = (type) => {
    let templateText = '';
    if (type === 'brand') {
      templateText = "I'm looking to create a strong brand identity for my business. Specifically, I need help with...";
    } else if (type === 'website') {
      templateText = "I need a high-converting website for my project. The main goal is to...";
    } else if (type === 'custom') {
      templateText = "I have a custom project in mind that involves...";
    }
    setFormData(prev => ({ ...prev, message: templateText }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="contact-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="contact-modal-content light-theme"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks from closing modal
          >
            <div className="modal-header-inline">
              <h2>Contact Form</h2>
              <button className="close-modal-btn" onClick={onClose} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>

            {status === 'success' ? (
              <motion.div 
                className="success-state"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, type: 'spring' }}
              >
                <Confetti 
                  width={window.innerWidth} 
                  height={window.innerHeight} 
                  recycle={false} 
                  numberOfPieces={500} 
                  gravity={0.15}
                  style={{ position: 'fixed', top: 0, left: 0, zIndex: 10000, pointerEvents: 'none' }}
                />
                <div className="icon-glow-wrapper">
                  <CheckCircle2 size={72} className="success-icon blue-accent glowing-icon" />
                </div>
                <h3 className="success-title">Amazing!</h3>
                <p className="success-subtitle">Thanks for reaching out! We've received your request and will get back to you within 24 hours.</p>
                <button className="btn-solid-blue" onClick={onClose} style={{ marginTop: '2.5rem', width: '100%' }}>
                  Return to Site
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="Enter your Full name"
                      value={formData.name}
                      onChange={handleChange}
                      required 
                      disabled={status === 'loading'}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number <span className="optional-text">(Optional)</span></label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Brief Overview</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    required
                    disabled={status === 'loading'}
                  ></textarea>
                </div>

                <div className="templates-section">
                  <span className="templates-label">Quick start with a template:</span>
                  <div className="chips-container">
                    <button type="button" className="template-chip" onClick={() => setTemplate('brand')}>
                      <Palette size={14} /> Brand Identity
                    </button>
                    <button type="button" className="template-chip" onClick={() => setTemplate('website')}>
                      <Globe size={14} /> Website
                    </button>
                    <button type="button" className="template-chip" onClick={() => setTemplate('custom')}>
                      <Lightbulb size={14} /> Custom Project
                    </button>
                  </div>
                </div>

                {status === 'error' && (
                  <div className="error-message">
                    {errorMessage}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn-solid-blue submit-btn"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending...' : 'Send'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
