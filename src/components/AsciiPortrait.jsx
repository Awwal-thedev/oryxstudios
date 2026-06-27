import React, { useEffect, useRef } from 'react';

const ASCII_CHARS = [' ', '.', '-', '+', '*', '%', '#', '@'];

export default function AsciiPortrait({ imageSrc }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    let particlesArray = [];
    let animationFrameId;

    // Mouse object for interaction
    let mouse = {
      x: null,
      y: null,
      radius: 80 // Increased repulsion radius for a softer, wider fluid effect
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageSrc;

    img.onload = () => {
      // Configuration for the grid
      const gridDensity = 5; // How many pixels per character (resolution)
      const renderWidth = 380; // Bumped size to 380px
      const renderHeight = renderWidth * (img.height / img.width);
      
      canvas.width = renderWidth;
      canvas.height = renderHeight;

      // Draw image onto a hidden canvas to read pixel data
      const hiddenCanvas = document.createElement('canvas');
      const hCtx = hiddenCanvas.getContext('2d', { willReadFrequently: true });
      
      // Calculate how big to draw the image to extract pixels
      const cols = Math.floor(renderWidth / gridDensity);
      const rows = Math.floor(renderHeight / gridDensity);
      
      hiddenCanvas.width = cols;
      hiddenCanvas.height = rows;
      
      // Draw image scaled down
      hCtx.drawImage(img, 0, 0, cols, rows);
      const imageData = hCtx.getImageData(0, 0, cols, rows);
      const pixels = imageData.data;

      // Parse pixels and build particles
      particlesArray = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const index = (y * cols + x) * 4;
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          const a = pixels[index + 3];

          // Skip completely transparent pixels
          if (a < 128) continue;

          const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
          
          // INVERSE MAPPING for a white background: 
          // Darker pixels (brightness ~ 0) need denser characters (like '@')
          // Lighter pixels (brightness ~ 255) need lighter characters (like ' ')
          const charIndex = Math.floor(((255 - brightness) / 255) * (ASCII_CHARS.length - 1));
          const char = ASCII_CHARS[charIndex];

          // We don't render spaces to save performance
          if (char === ' ') continue;

          // Define true physical position on canvas
          const posX = x * gridDensity;
          const posY = y * gridDensity;

          particlesArray.push({
            x: posX + Math.random() * 20 - 10,
            y: posY + Math.random() * 20 - 10,
            originX: posX,
            originY: posY,
            char: char,
            vx: 0,
            vy: 0
          });
        }
      }

      ctx.font = `600 ${gridDensity * 1.5}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle'; 
      
      // Classic monochrome rendering matching the typography
      ctx.fillStyle = '#111827';

      // Animation Loop
      const animate = () => {
        // Clear canvas with a very slight trail effect or fully clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
          let p = particlesArray[i];

          // Check mouse interaction
          let dx = mouse.x - p.x;
          let dy = mouse.y - p.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (mouse.x !== null && distance < mouse.radius) {
            // Push particle away
            const force = (mouse.radius - distance) / mouse.radius;
            // The direction vector
            const angle = Math.atan2(dy, dx);
            // Move opposite to mouse (Middle-ground push speed)
            const forceDirectionX = Math.cos(angle) * force * -1.2;
            const forceDirectionY = Math.sin(angle) * force * -1.2;
            
            p.vx += forceDirectionX;
            p.vy += forceDirectionY;
          }

          // Spring force back to origin (Middle-ground return speed)
          const springX = (p.originX - p.x) * 0.02;
          const springY = (p.originY - p.y) * 0.02;
          
          p.vx += springX;
          p.vy += springY;

          // Add friction (Balanced momentum)
          p.vx *= 0.94;
          p.vy *= 0.94;

          // Update position
          p.x += p.vx;
          p.y += p.vy;

          // Draw the character
          ctx.fillText(p.char, p.x, p.y);
        }

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [imageSrc]);

  return (
    <div ref={containerRef} className="interactive-ascii-container">
      <canvas ref={canvasRef} className="interactive-ascii-canvas" />
    </div>
  );
}
