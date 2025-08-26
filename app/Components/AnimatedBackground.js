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

    // Store initial positions
    const positions = words.map((el) => {
      if (!el) return { x: 0, y: 0 };
      return {
        x: parseFloat(el.style.left),
        y: parseFloat(el.style.top)
      };
    });

    function animate() {
      words.forEach((el, i) => {
        if (!el) return;
        let x = positions[i].x;
        let y = positions[i].y;
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
        positions[i].x = x;
        positions[i].y = y;
        el.style.left = `${x}%`;
        el.style.top = `${y}%`;
      });
      animationFrame = requestAnimationFrame(animate);
    }
    animate();
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
            opacity: 0.25 + getRandom(0, 0.25),
            userSelect: 'none',
            whiteSpace: 'nowrap',
            textShadow: '0 2px 8px #000',
            transition: 'color 0.5s',
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default AnimatedBackground;
