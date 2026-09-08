import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.png';

export default function Preloader({ minDuration = 1800, onFinish }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress counter from 0 to 100
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / minDuration) * 100), 100);
      setProgress(pct);

      if (elapsed >= minDuration) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          if (onFinish) onFinish();
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minDuration, onFinish]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#FFFFFF',
            zIndex: 99999999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            userSelect: 'none',
            overflow: 'hidden'
          }}
        >
          {/* Subtle background glow circle for ocean depth */}
          <div
            style={{
              position: 'absolute',
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(2, 132, 199, 0.08) 0%, rgba(255,255,255,0) 70%)',
              pointerEvents: 'none'
            }}
          />

          {/* Logo & Content Box */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 2
            }}
          >
            {/* Logo Image */}
            <motion.div
              animate={{ 
                scale: [1, 1.02, 1] 
              }}
              transition={{ 
                duration: 2.4, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '32px'
              }}
            >
              <img
                src={logoImg}
                alt="Marvex International Logo"
                style={{
                  height: '95px',
                  width: 'auto',
                  maxWidth: '280px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.06))'
                }}
              />
            </motion.div>

            {/* Progress Bar Track */}
            <div
              style={{
                width: '220px',
                height: '4px',
                backgroundColor: '#F1F5F9',
                borderRadius: '999px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)'
              }}
            >
              {/* Animated Filling Line */}
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #1B4B7A 0%, #0284C7 50%, #38BDF8 100%)',
                  borderRadius: '999px',
                  boxShadow: '0 0 12px rgba(2, 132, 199, 0.6)',
                  transition: 'width 0.05s linear',
                  position: 'relative'
                }}
              >
                {/* Glowing head of progress line */}
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#FFF',
                    boxShadow: '0 0 8px 2px rgba(56, 189, 248, 0.9)'
                  }}
                />
              </div>
            </div>

            {/* Subtitle / Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                marginTop: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '220px'
              }}
            >
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: 700,
                  letterSpacing: '1.8px',
                  textTransform: 'uppercase',
                  color: '#64748B',
                  fontFamily: 'inherit'
                }}
              >
                Loading
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  color: '#0284C7',
                  fontFamily: 'monospace'
                }}
              >
                {progress}%
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
