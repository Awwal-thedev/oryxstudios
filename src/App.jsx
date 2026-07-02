import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import About from './pages/About'
import ContactModal from './components/ContactModal'

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="app">
      <Navigation openContact={() => setIsContactOpen(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Home openContact={() => setIsContactOpen(true)} />} />
          <Route path="/about" element={<About />} />
          <Route path="/case-study/:id" element={<CaseStudy />} />
        </Routes>
      </main>
      
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  )
}

export default App
