import React, { useEffect } from 'react';
import Navbar from '../layout/Navbar';
import Hero from '../home/Hero';
import About from '../home/About';
import MissionVision from '../home/MissionVision';
import Services from '../home/Services';
import PortfolioGallery from '../home/PortfolioGallery';
import Projects from '../home/Projects';
import Contact from '../home/Contact';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  useEffect(() => {
    // Disable ScrollTrigger on mobile for better performance
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      ScrollTrigger.getAll().forEach(t => t.disable());
      ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
    } else {
      ScrollTrigger.config({ 
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        limitCallbacks: true 
      });
      
      // Refresh ScrollTrigger after all components are mounted
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }

    return () => {
      // Proper cleanup on unmount
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf('*');
    };
  }, []);

  return (
    <div style={{ 
      backgroundColor: '#e3e1d7',
      fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <MissionVision />
        <Services />
        <PortfolioGallery />
        <Projects />
        <Contact />
      </main>
      
      {/* Performance optimization */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }
        
        body {
          overflow-x: hidden;
        }
        
        /* Improve performance */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Prevent layout shifts */
        img {
          max-width: 100%;
          height: auto;
        }
        
        /* Better scrolling */
        @media (prefers-reduced-motion: no-preference) {
          html {
            scroll-behavior: smooth;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;