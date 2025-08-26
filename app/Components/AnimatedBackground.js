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
    // Slow, small random speeds
    const speeds = words.map(() => ({
      x: getRandom(-0.08, 0.08),
      y: getRandom(-0.08, 0.08)
    }));

    // Store initial positions and dimensions with glow data
    const wordData = words.map((el) => {
      if (!el) return { x: 0, y: 0, width: 0, height: 0, glowPhase: 0, glowSpeed: 0 };
      const rect = el.getBoundingClientRect();
      return {
        x: parseFloat(el.style.left),
        y: parseFloat(el.style.top),
        width: rect.width / window.innerWidth * 100,
        height: rect.height / window.innerHeight * 100,
        glowPhase: getRandom(0, Math.PI * 2), // Random starting phase
        glowSpeed: getRandom(0.01, 0.03) // Random glow speed
      };
    });

    // Check collision between two words
    function checkCollision(word1, word2) {
      return !(word1.x + word1.width < word2.x || 
               word2.x + word2.width < word1.x || 
               word1.y + word1.height < word2.y || 
               word2.y + word2.height < word1.y);
    }

    // Resolve collision by moving words apart
    function resolveCollision(i, j) {
      const word1 = wordData[i];
      const word2 = wordData[j];
      const centerX1 = word1.x + word1.width / 2;
      const centerY1 = word1.y + word1.height / 2;
      const centerX2 = word2.x + word2.width / 2;
      const centerY2 = word2.y + word2.height / 2;
      
      const dx = centerX2 - centerX1;
      const dy = centerY2 - centerY1;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        const pushDistance = 2;
        const pushX = (dx / distance) * pushDistance;
        const pushY = (dy / distance) * pushDistance;
        
        word1.x -= pushX;
        word1.y -= pushY;
        word2.x += pushX;
        word2.y += pushY;
        
        // Reverse speeds to bounce apart
        speeds[i].x *= -0.8;
        speeds[i].y *= -0.8;
        speeds[j].x *= -0.8;
        speeds[j].y *= -0.8;
      }
    }

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
        } else if (x + wordData[i].width > 95) {
          x = 95 - wordData[i].width;
          speeds[i].x *= -1;
        }
        if (y < 0) {
          y = 0;
          speeds[i].y *= -1;
        } else if (y + wordData[i].height > 95) {
          y = 95 - wordData[i].height;
          speeds[i].y *= -1;
        }
        
        wordData[i].x = x;
        wordData[i].y = y;
      });

      // Check for collisions between all word pairs
      for (let i = 0; i < wordData.length; i++) {
        for (let j = i + 1; j < wordData.length; j++) {
          if (checkCollision(wordData[i], wordData[j])) {
            resolveCollision(i, j);
          }
        }
      }

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
      // Recalculate dimensions after render
      wordData.forEach((data, i) => {
        const el = words[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          data.width = rect.width / window.innerWidth * 100;
          data.height = rect.height / window.innerHeight * 100;
          // Initialize glow properties if not set
          if (data.glowPhase === undefined) {
            data.glowPhase = getRandom(0, Math.PI * 2);
            data.glowSpeed = getRandom(0.01, 0.03);
          }
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
