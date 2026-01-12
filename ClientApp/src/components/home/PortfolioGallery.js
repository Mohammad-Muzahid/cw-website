import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

const safeRequire = (path) => {
  try {
    return require(`../../assets/${path}`);
  } catch (error) {
    console.warn(`Image not found: ${path}`);
    return null;
  }
};

const PortfolioGallery = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isInView, setIsInView] = useState(false);
  const resizeTimeoutRef = useRef(null);
  const animationIdRef = useRef(null);

  // Sample images from your public folder
  const galleryImages = [
    { id: 1, src: safeRequire('bupa77.JPEG') },
    { id: 2, src: safeRequire('riyadhair64.JPEG') },
    { id: 3, src: safeRequire('p-breida1.jpg') },
    { id: 4, src: safeRequire('bat20.JPEG') },
    { id: 5, src: safeRequire('bupa77.JPEG') },
    { id: 6, src: safeRequire('ndmc16.JPEG') },
    { id: 7, src: safeRequire('jcd15.JPEG') },
    { id: 8, src: safeRequire('madeo10.JPEG') },
    { id: 9, src: safeRequire('saja2.jpg') },
    { id: 10, src: safeRequire('ams5.jpg') },
    { id: 11, src: safeRequire('outdoor6.JPG') },
    { id: 12, src: safeRequire('villa_esnad55.jpg') }
  ];

  // Theme colors
  const theme = {
    charcoal: '#1e252f',
    beige: '#e3e1d7',
    accent: '#8b7355',
    lightAccent: '#a89070',
    white: '#ffffff'
  };

  // Get appropriate image dimensions based on screen size
  const getImageDimensions = useCallback(() => {
    if (windowWidth < 480) {
      return { width: 120, height: 180 };
    } else if (windowWidth < 768) {
      return { width: 140, height: 210 };
    } else if (windowWidth < 1024) {
      return { width: 160, height: 240 };
    } else if (windowWidth < 1400) {
      return { width: 180, height: 270 };
    } else {
      return { width: 200, height: 300 };
    }
  }, [windowWidth]);

  // Calculate gap size based on screen width
  const getGapSize = useCallback(() => {
    if (windowWidth < 480) return 8;
    if (windowWidth < 768) return 10;
    if (windowWidth < 1024) return 12;
    if (windowWidth < 1400) return 14;
    return 15;
  }, [windowWidth]);

  // Create enough duplicates for continuous scrolling
  const getDuplicatedImages = useCallback(() => {
    // Calculate how many sets we need for seamless scrolling
    const imageWidth = getImageDimensions().width;
    const gap = getGapSize();
    const singleSetWidth = galleryImages.length * (imageWidth + gap) - gap;
    const setsNeeded = Math.ceil(windowWidth / singleSetWidth) + 3;
    
    let duplicated = [];
    for (let i = 0; i < setsNeeded; i++) {
      duplicated = [...duplicated, ...galleryImages];
    }
    return duplicated;
  }, [windowWidth, getImageDimensions, getGapSize]);

  // Start continuous animation
  const startAnimation = useCallback(() => {
    if (!containerRef.current || !isInView) return;

    // Stop any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    const container = containerRef.current;
    const images = container.children;
    if (images.length === 0) return;

    // Calculate total width
    const imageWidth = getImageDimensions().width;
    const gap = getGapSize();
    const singleImageWidth = imageWidth + gap;
    const totalImages = images.length;
    const totalWidth = totalImages * singleImageWidth - gap;
    
    // Speed calculation
    let speed;
    if (windowWidth < 480) speed = 80;
    else if (windowWidth < 768) speed = 100;
    else if (windowWidth < 1024) speed = 120;
    else if (windowWidth < 1400) speed = 140;
    else speed = 160;

    // Duration for one complete cycle
    const duration = totalWidth / speed;

    // Start position (off-screen to the right)
    gsap.set(container, { x: windowWidth });

    // Create continuous animation
    animationRef.current = gsap.to(container, {
      x: -totalWidth,
      duration: duration,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        // Reset to start position when animation completes
        gsap.set(container, { x: windowWidth });
      }
    });

  }, [isInView, windowWidth, getImageDimensions, getGapSize]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  // Start/stop animation based on visibility
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        startAnimation();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    }
  }, [isInView, startAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  // Get current values
  const imageDimensions = getImageDimensions();
  const gapSize = getGapSize();
  const duplicatedImages = getDuplicatedImages();

  return (
    <section 
      ref={sectionRef}
      style={{
        padding: windowWidth < 768 ? '20px 0' : windowWidth < 1024 ? '30px 0' : '40px 0',
        background: theme.charcoal,
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        minHeight: `${imageDimensions.height + 60}px`,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Horizontal scrolling container */}
      <div 
        ref={containerRef}
        style={{
          display: 'flex',
          gap: `${gapSize}px`,
          width: 'fit-content',
          willChange: 'transform'
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={`${image.id}-${index}`}
            style={{
              width: `${imageDimensions.width}px`,
              height: `${imageDimensions.height}px`,
              flexShrink: 0,
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              transform: 'translateZ(0)'
            }}
          >
            <img 
              src={image.src} 
              alt={`Woodwork project ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
              loading="lazy"
            />
            
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, transparent 70%, rgba(30, 37, 47, 0.4) 100%)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Gradient edges */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: windowWidth < 768 ? '40px' : windowWidth < 1024 ? '60px' : '80px',
          height: '100%',
          background: `linear-gradient(to right, ${theme.charcoal}, transparent)`,
          zIndex: 2
        }}
      />
      
      <div 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: windowWidth < 768 ? '40px' : windowWidth < 1024 ? '60px' : '80px',
          height: '100%',
          background: `linear-gradient(to left, ${theme.charcoal}, transparent)`,
          zIndex: 2
        }}
      />
    </section>
  );
};

export default PortfolioGallery;