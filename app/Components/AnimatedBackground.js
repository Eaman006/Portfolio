// Creative animated background for computer science terminology
import React, { useEffect, useRef } from 'react';

const TERMS = [
  'DSA', 'AWS', 'GoogleCloud', 'Java', 'Python', 'Next.js', 'React.js',
  'HTML', 'CSS', 'JavaScript', 'Compiler', 'Logic', 'Machine Learning', 'SQL',
  'Database', 'CAD', 'OS', 'C++', 'C', 'Robotics', 'Blockchain','Computer Architecture','Cryptography',
  'AI-Trainer','Artificial Intelligence'
  
];

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const AnimatedBackground = () => {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const words = wordsRef.current;
    let animationFrame;
    // Slightly faster random speeds
    const speeds = words.map(() => ({
      x: getRandom(-0.15, 0.15),
      y: getRandom(-0.15, 0.15)
    }));

    // Store initial positions with glow data
    const wordData = words.map((el) => {
      if (!el) return { x: 0, y: 0, glowPhase: 0, glowSpeed: 0 };
      return {
        x: parseFloat(el.style.left),
        y: parseFloat(el.style.top),
        glowPhase: getRandom(0, Math.PI * 2), // Random starting phase
        glowSpeed: getRandom(0.01, 0.03) // Random glow speed
      };
    });

    function animate() {
      words.forEach((el, i) => {
        if (!el) return;
        let x = wordData[i].x;
        let y = wordData[i].y;
        x += speeds[i].x;
        y += speeds[i].y;
        
        // Bounce off edges
        if (x < 0) {
          x = 0;
          speeds[i].x *= -1;
        } else if (x > 95) {
          x = 95;
          speeds[i].x *= -1;
        }
        if (y < 0) {
          y = 0;
          speeds[i].y *= -1;
        } else if (y > 95) {
          y = 95;
          speeds[i].y *= -1;
        }
        
        wordData[i].x = x;
        wordData[i].y = y;
      });

      // Update DOM positions with glow effect
      words.forEach((el, i) => {
        if (!el) return;
        
        // Update glow phase
        wordData[i].glowPhase += wordData[i].glowSpeed;
        
        // Calculate glow intensity (0.2 to 0.8)
        const glowIntensity = 0.3 + 0.5 * (Math.sin(wordData[i].glowPhase) * 0.5 + 0.5);
        
        // Calculate glow color with slight hue shift
        const baseHue = 180 + (260 - 180) * (i / words.length);
        const glowHue = baseHue + 20 * Math.sin(wordData[i].glowPhase * 0.5);
        
        el.style.left = `${wordData[i].x}%`;
        el.style.top = `${wordData[i].y}%`;
        el.style.opacity = glowIntensity;
        el.style.color = `hsl(${glowHue}, 80%, ${60 + 20 * Math.sin(wordData[i].glowPhase)})`;
        el.style.textShadow = `
          0 0 ${5 + 10 * glowIntensity}px hsl(${glowHue}, 90%, 70%),
          0 0 ${10 + 20 * glowIntensity}px hsl(${glowHue}, 80%, 60%),
          0 0 ${20 + 30 * glowIntensity}px hsl(${glowHue}, 70%, 50%),
          0 2px 8px #000
        `;
      });

      animationFrame = requestAnimationFrame(animate);
    }
    
    // Small delay to ensure elements are rendered before starting animation
    setTimeout(() => {
      // Initialize glow properties if not set
      wordData.forEach((data, i) => {
        if (data.glowPhase === undefined) {
          data.glowPhase = getRandom(0, Math.PI * 2);
          data.glowSpeed = getRandom(0.01, 0.03);
        }
      });
      animate();
    }, 100);
    
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        
      }}
      aria-hidden="true"
    >
      {TERMS.map((word, i) => (
        <span
          key={word + i}
          ref={el => (wordsRef.current[i] = el)}
          style={{
            position: 'absolute',
            left: `${getRandom(0, 95)}%`,
            top: `${getRandom(0, 95)}%`,
            fontSize: `${getRandom(1.2, 2.5)}rem`,
            color: `hsl(${getRandom(180, 260)}, 80%, 70%)`,
            fontWeight: 700,
            opacity: 0.3,
            userSelect: 'none',
            whiteSpace: 'nowrap',
            textShadow: '0 0 10px currentColor, 0 2px 8px #000',
            transition: 'none',
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default AnimatedBackground;
