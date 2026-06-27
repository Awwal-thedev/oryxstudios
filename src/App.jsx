import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import About from './pages/About'

function App() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/case-study/:id" element={<CaseStudy />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
