import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MoveRight, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AsciiPortrait from '../components/AsciiPortrait';
import './Home.css';

const Home = () => {
  const scrollToWork = () => {
    document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
  };

  // Shared Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 1.5 // Delay metadata until typing is mostly done
      }
    }
  };

  // Typewriter Animation Logic
  const titleText = "PRODUCT & DESIGN";
  
  const typingContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const typingCharVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline-block", transition: { duration: 0.01 } }
  };

  return (
    <div className="landing-page">
      <div className="home-content-curtain" style={{ paddingTop: '200px' }}>
      
      {/* 1. MASTHEAD HERO SECTION */}
      <section className="hero-masthead container">
        <div className="masthead-header">
          <div className="masthead-text-wrap">
            {/* Typewriter Text Reveal */}
            <motion.h1 
              className="masthead-title"
              variants={typingContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {titleText.split(/(\s+)/).map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                  {word.split("").map((char, charIndex) => (
                    <motion.span key={charIndex} variants={typingCharVariants}>
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>
              ))}
              
              {/* Blinking Cursor */}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                style={{ display: "inline-block", marginLeft: "4px", borderRight: "0.08em solid var(--text-primary)" }}
              >
                &nbsp;
              </motion.span>
            </motion.h1>
          </div>

          <motion.div 
            className="masthead-interactive-portrait"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <AsciiPortrait imageSrc="/headshot.png" />
          </motion.div>
        </div>
        
        <motion.div 
          className="masthead-grid"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Fun floating elements */}
          <div className="fun-elements-container">
            <motion.div 
              className="floating-badge badge-1"
              animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              🚀 Strategy
            </motion.div>
            <motion.div 
              className="floating-badge badge-2"
              animate={{ y: [0, 20, 0], rotate: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            >
              ✨ Design Engineer
            </motion.div>
            <motion.div 
              className="floating-badge badge-3"
              animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
            >
              ⚡ Product Building
            </motion.div>
          </div>

          <motion.div className="masthead-col small-col" variants={fadeUp}>
            <div className="masthead-meta">
              <span className="meta-label">Focus</span>
              <span className="meta-value">Enterprise SaaS & AI</span>
            </div>
            <div className="masthead-meta">
              <span className="meta-label">Role</span>
              <span className="meta-value">Product Manager & Designer</span>
            </div>
            <div className="masthead-meta">
              <span className="meta-label">Location</span>
              <span className="meta-value">Global</span>
            </div>
          </motion.div>
          
          <motion.div className="masthead-col main-col" variants={fadeUp}>
            <h2 className="masthead-statement">
              I turn complex workflows into <span className="text-gradient">intuitive enterprise experiences.</span>
            </h2>
            <p className="masthead-description">
              Helping healthcare, fintech, and enterprise SaaS organizations build products that reduce cognitive load and drive business outcomes.
            </p>
            <div className="masthead-actions">
              <motion.button 
                onClick={scrollToWork} 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View selected work <ChevronDown size={18} />
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div className="masthead-col small-col right-col" variants={fadeUp}>
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span>Available for new opportunities</span>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/about" className="btn-secondary read-more-btn">
                Read full bio <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. FEATURED WORK SECTION */}
      <section id="work" className="work-section container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Selected Work
        </motion.h2>
        
        <div className="work-showcase">
          {/* Project 1: Theraptly */}
          <div className="project-feature-card">
            <motion.div 
              className="project-visual theraptly-visual"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
               <div className="mockup-placeholder">
                  <span>AI Compliance Dashboard Mockup</span>
               </div>
            </motion.div>
            <motion.div 
              className="project-details"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="project-tags">
                <span className="tag">Healthcare</span>
                <span className="tag">AI Product</span>
              </div>
              <h3 className="project-title">Theraptly</h3>
              <p className="project-summary">
                Designed an AI-powered platform that helps healthcare organizations analyze internal policies against regulatory requirements and generate actionable recommendations.
              </p>
              <Link to="/case-study/theraptly" className="read-case-study">
                Read Case Study <motion.span whileHover={{ x: 5 }}><ArrowRight size={20} /></motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Project 2: Xentoba */}
          <div className="project-feature-card reverse">
            <motion.div 
              className="project-visual xentoba-visual"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
               <div className="mockup-placeholder">
                  <span>Enterprise Tax CRM Mockup</span>
               </div>
            </motion.div>
            <motion.div 
              className="project-details"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="project-tags">
                <span className="tag">FinTech</span>
                <span className="tag">Enterprise CRM</span>
              </div>
              <h3 className="project-title">Xentoba</h3>
              <p className="project-summary">
                A unified enterprise platform for tax firms to manage clients, accounting, workflow automation, and document management at scale.
              </p>
              <Link to="/case-study/xentoba" className="read-case-study">
                Read Case Study <motion.span whileHover={{ x: 5 }}><ArrowRight size={20} /></motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. EXPERTISE / SERVICES SECTION */}
      <section className="expertise-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            Core Expertise
          </motion.h2>
          
          <motion.div 
            className="expertise-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div className="expertise-card" variants={fadeUp} whileHover={{ y: -10 }}>
              <div className="expertise-icon">🎯</div>
              <h3>Product Strategy</h3>
              <p>Bridging the gap between business goals and user needs through feature planning, journey mapping, and clear product direction.</p>
            </motion.div>
            <motion.div className="expertise-card" variants={fadeUp} whileHover={{ y: -10 }}>
              <div className="expertise-icon">🧩</div>
              <h3>Systems Thinking</h3>
              <p>Organizing complex enterprise information architecture, creating scalable design systems, and ensuring cross-platform consistency.</p>
            </motion.div>
            <motion.div className="expertise-card" variants={fadeUp} whileHover={{ y: -10 }}>
              <div className="expertise-icon">✨</div>
              <h3>Interaction Design</h3>
              <p>Crafting high-density dashboards, user flows, and responsive interfaces that reduce friction and cognitive load for expert users.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      </div> {/* End home-content-curtain */}

      {/* 4. FOOTER / CTA (Sticky Reveal) */}
      <footer className="footer-reveal">
        <div className="footer-inner container">
          
          {/* Massive Typographic Name */}
          <div className="footer-massive-text">
            Awwal.
          </div>
          
          <div className="footer-bottom-grid">
            <div className="footer-col">
              <h4>Crafted with intent.</h4>
              <p>Built to outlive trends and scale gracefully.</p>
              
              <div className="footer-cta-wrap">
                <p>Have a complex product challenge?</p>
                <motion.a 
                  href="mailto:awwal.adeyemoola@gmail.com" 
                  className="btn-light"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start a conversation <MoveRight size={16} />
                </motion.a>
              </div>
            </div>
            
            <div className="footer-col">
              <h4>Navigation</h4>
              <a href="/#work">Work</a>
              <Link to="/about">About</Link>
            </div>
            
            <div className="footer-col">
              <h4>Socials</h4>
              <a href="https://www.instagram.com/miday__999/" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://x.com/miday__999" target="_blank" rel="noreferrer">Twitter</a>
              <a href="https://github.com/Awwal-thedev" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
          
          <div className="footer-copyright">
            © {new Date().getFullYear()} Awwal Adeyemo. Rooted in craft, refined through code.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
