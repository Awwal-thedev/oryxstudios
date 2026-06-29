import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const [isColored, setIsColored] = React.useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const experiences = [
    {
      id: 1,
      role: 'Product Designer',
      company: 'Acme Corp',
      year: '2023 - Present',
      description: 'Leading design systems and cross-functional product development for enterprise workflow tools, significantly reducing user cognitive load.'
    },
    {
      id: 2,
      role: 'Creative Technologist',
      company: 'Global Tech',
      year: '2021 - 2023',
      description: 'Bridged the gap between engineering and design. Prototyped high-fidelity interactions and drove front-end performance optimizations.'
    },
    {
      id: 3,
      role: 'UI/UX Designer',
      company: 'Startup Inc',
      year: '2019 - 2021',
      description: 'Designed 0-to-1 core features for a rapidly scaling SaaS platform. Conducted extensive user research to refine the core product loop.'
    }
  ];

  const skills = [
    'UI/UX Design', 'Interaction Design', 'Design Systems', 'Prototyping',
    'React & Frontend', 'Framer Motion', 'User Research', 'Strategic Thinking'
  ];

  return (
    <div className="about-page">
      <section className="about-hero container">
        <motion.div 
          className="about-hero-grid"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="about-text-col" variants={fadeUp}>
            <h1 className="about-title">I am Awwal. I build products with intent.</h1>
            <div className="about-prose">
              <p>
                I am a multi-disciplinary designer and engineer focused on bridging the gap between aesthetics and highly functional architecture. 
                I believe that the best products are those that do not force users to think—they simply work exactly as expected while feeling incredibly premium.
              </p>
              <p>
                My background spans deep UI/UX strategy, design system architecture, and robust front-end engineering. 
                This hybrid approach allows me to not only design beautiful interfaces but also implement them with a deep understanding of code and performance constraints.
              </p>
            </div>
          </motion.div>
          <motion.div className="about-image-col" variants={fadeUp}>
            <div 
              className={`about-image-wrapper ${isColored ? 'force-hover' : ''}`}
              onClick={() => setIsColored(!isColored)}
            >
              <img src="/about-headshot.jpg" alt="Awwal Adeyemo" className="about-image" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="experience-section container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <motion.div 
              className="experience-item" 
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="exp-meta">
                <span className="exp-year">{exp.year}</span>
                <h3 className="exp-role">{exp.role}</h3>
                <span className="exp-company">{exp.company}</span>
              </div>
              <div className="exp-details">
                <p>{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="skills-section container">
        <motion.div 
          className="skills-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="skills-header" variants={fadeUp}>
            <h2 className="section-title">Core Competencies</h2>
            <p>A hybrid skill set that spans the entire product lifecycle.</p>
          </motion.div>
          
          <motion.div className="skills-list" variants={fadeUp}>
            {skills.map((skill, index) => (
              <span key={index} className="skill-pill">{skill}</span>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
