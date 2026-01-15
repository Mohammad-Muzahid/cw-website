import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight, FaArrowLeft, FaArrowRight as FaArrowRightIcon } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const circlesContainerRef = useRef(null);
  const circlesRef = useRef([]);
  const [isMounted, setIsMounted] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const navigate = useNavigate();

  // Track mouse position for swipe detection
  const mouseXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const safeRequire = (path) => {
    try {
      return require(`../../assets/${path}`);
    } catch (error) {
      console.warn(`Image not found: ${path}`);
      return null;
    }
  };

  const theme = {
    charcoal: '#1e252f',
    beige: '#e3e1d7',
    accent: '#8b7355',
    lightAccent: '#a89070',
    white: '#ffffff'
  };

  const content = {
    title: "Our Masterpieces",
    subtitle: "Experience the artistry of exceptional woodwork through our portfolio of completed projects",
    projects: [
      {
        id: 1,
        title: "Riyadh Airport",
        image: safeRequire('riyadhair64.JPEG'),
      },
      {
        id: 2,
        title: "Bupa",
        image: safeRequire('bupa1.JPEG'),
      },
      {
        id: 3,
        title: "Le Vesuvio & Madeo Restaurants",
        image: safeRequire('madeo10.JPEG'),
      },
      {
        id: 4,
        title: "BAT Corporate Office",
        image: safeRequire('bat20.JPEG'),
      },
      {
        id: 5,
        title: "Outdoors",
        image: safeRequire('outdoor6.JPG'),
      }
    ]
  };

  useEffect(() => {
    setIsMounted(true);
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  // Scroll functions for horizontal container
  const scrollHorizontal = (direction) => {
    const container = circlesContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  // Update scroll button states
  const updateScrollButtons = () => {
    const container = circlesContainerRef.current;
    if (!container) return;

    const canScrollL = container.scrollLeft > 10;
    const canScrollR = container.scrollLeft < container.scrollWidth - container.clientWidth - 10;
    
    setCanScrollLeft(canScrollL);
    setCanScrollRight(canScrollR);
  };

  // Individual circle hover animation
  const createCircleAnimations = useCallback(() => {
    circlesRef.current.forEach((circle, index) => {
      if (!circle) return;
      
      const circleElement = circle;
      
      gsap.to(circleElement, {
        y: -10,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2
      });
      
      const glowElement = circleElement.querySelector('.circle-glow');
      if (glowElement) {
        gsap.to(glowElement, {
          scale: 1.1,
          opacity: 0.6,
          duration: 1.5 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3
        });
      }
    });
  }, []);

  // Mouse handlers for horizontal swipe
  const handleMouseDown = useCallback((e) => {
    const container = circlesContainerRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
    
    container.style.cursor = 'grabbing';
    container.style.userSelect = 'none';
  }, []);

  const handleMouseLeave = useCallback(() => {
    isDraggingRef.current = false;
    const container = circlesContainerRef.current;
    if (container) {
      container.style.cursor = 'grab';
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    const container = circlesContainerRef.current;
    if (container) {
      container.style.cursor = 'grab';
      container.style.removeProperty('user-select');
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDraggingRef.current || !circlesContainerRef.current) return;
    
    e.preventDefault();
    const container = circlesContainerRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 2; // Scroll speed multiplier
    
    container.scrollLeft = scrollLeftRef.current - walk;
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = useCallback((e) => {
    const container = circlesContainerRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    startXRef.current = e.touches[0].pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDraggingRef.current || !circlesContainerRef.current) return;
    
    e.preventDefault();
    const container = circlesContainerRef.current;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    
    container.scrollLeft = scrollLeftRef.current - walk;
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  useEffect(() => {
    if (!isMounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { 
          opacity: 0, 
          y: 60,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(subtitleRef.current,
        { 
          opacity: 0, 
          y: 40
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      setTimeout(() => {
        createCircleAnimations();
      }, 500);

    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted, createCircleAnimations]);

  useEffect(() => {
    const container = circlesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      
      return () => {
        container.removeEventListener('scroll', updateScrollButtons);
      };
    }
  }, [isMounted]);

  // Add event listeners for mouse and touch swipe
  useEffect(() => {
    const container = circlesContainerRef.current;
    if (!container) return;

    // Mouse events
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);

    // Touch events
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
      
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseDown, handleMouseLeave, handleMouseUp, handleMouseMove, handleTouchStart, handleTouchMove, handleTouchEnd]);

  const addToCirclesRefs = useCallback((el) => {
    if (el && !circlesRef.current.includes(el)) {
      circlesRef.current.push(el);
    }
  }, []);

  const handleSeeMoreClick = () => {
    navigate('/projects/completed');
  };

  const handleCircleClick = (project) => {
    navigate('/projects/completed', { state: { scrollTo: project.id } });
  };

  if (!isMounted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: theme.beige,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="loading-spinner" style={{
          width: '50px',
          height: '50px',
          border: `3px solid ${theme.accent}20`,
          borderTop: `3px solid ${theme.accent}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <section 
      ref={sectionRef}
      id="projects"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: theme.beige,
        color: theme.charcoal,
        padding: '100px 0 150px'
      }}
    >
      {/* Decorative Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `linear-gradient(${theme.charcoal}05 1px, transparent 1px),
                           linear-gradient(90deg, ${theme.charcoal}05 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          opacity: 0.3
        }} />
      </div>

      <div style={{
        maxWidth: '1800px',
        margin: '0 auto',
        padding: '0 20px',
        width: '100%',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2
            ref={titleRef}
            style={{
              fontWeight: '800',
              color: theme.charcoal,
              marginBottom: '20px',
              fontSize: '3.5rem',
              fontFamily: "'Cygre', sans-serif",
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            {content.title}
          </h2>
          
          <p
            ref={subtitleRef}
            style={{
              color: `${theme.charcoal}cc`,
              maxWidth: '700px',
              margin: '0 auto',
              fontSize: '1.2rem',
              lineHeight: '1.7',
              fontFamily: "'Cygre', sans-serif",
              fontWeight: '300'
            }}
          >
            {content.subtitle}
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div style={{
          width: '100%',
          height: '70vh',
          position: 'relative',
          overflow: 'hidden',
          userSelect: 'none'
        }}>
          {/* Left Scroll Button */}
          <button
            onClick={() => scrollHorizontal('left')}
            disabled={!canScrollLeft}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              background: `${theme.white}dd`,
              backdropFilter: 'blur(10px)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: `1px solid ${theme.charcoal}20`,
              color: theme.charcoal,
              cursor: canScrollLeft ? 'pointer' : 'not-allowed',
              opacity: canScrollLeft ? 0.9 : 0.3,
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontFamily: "'Cygre', sans-serif'",
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              if (canScrollLeft) {
                e.currentTarget.style.background = theme.accent;
                e.currentTarget.style.color = theme.white;
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (canScrollLeft) {
                e.currentTarget.style.background = `${theme.white}dd`;
                e.currentTarget.style.color = theme.charcoal;
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }
            }}
          >
            <FaArrowLeft />
          </button>

          {/* Right Scroll Button */}
          <button
            onClick={() => scrollHorizontal('right')}
            disabled={!canScrollRight}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              background: `${theme.white}dd`,
              backdropFilter: 'blur(10px)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: `1px solid ${theme.charcoal}20`,
              color: theme.charcoal,
              cursor: canScrollRight ? 'pointer' : 'not-allowed',
              opacity: canScrollRight ? 0.9 : 0.3,
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontFamily: "'Cygre', sans-serif'",
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              if (canScrollRight) {
                e.currentTarget.style.background = theme.accent;
                e.currentTarget.style.color = theme.white;
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (canScrollRight) {
                e.currentTarget.style.background = `${theme.white}dd`;
                e.currentTarget.style.color = theme.charcoal;
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }
            }}
          >
            <FaArrowRightIcon />
          </button>

          {/* Horizontal Scroll Container with swipe support */}
          <div 
            ref={circlesContainerRef}
            className="circles-container"
            style={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              overflowX: 'auto',
              overflowY: 'hidden',
              gap: '80px',
              padding: '0 20px',
              width: '100%',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              cursor: 'grab'
            }}
          >
            <style>{`
              .circles-container::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {/* Add extra space at start */}
            <div style={{ flex: '0 0 auto', width: '20px', height: '100%' }} />
            
            {/* Project Circles */}
            {content.projects.map((project, index) => (
              <div
                key={project.id}
                ref={addToCirclesRefs}
                onClick={() => handleCircleClick(project)}
                style={{
                  position: 'relative',
                  flexShrink: 0,
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  const circle = e.currentTarget;
                  const image = circle.querySelector('.circle-image');
                  const glow = circle.querySelector('.circle-glow');
                  
                  gsap.to(circle, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                  
                  gsap.to(image, {
                    scale: 1.1,
                    duration: 0.4,
                    ease: "power2.out"
                  });
                  
                  gsap.to(glow, {
                    opacity: 0.8,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
                onMouseLeave={(e) => {
                  const circle = e.currentTarget;
                  const image = circle.querySelector('.circle-image');
                  const glow = circle.querySelector('.circle-glow');
                  
                  gsap.to(circle, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                  
                  gsap.to(image, {
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                  });
                  
                  gsap.to(glow, {
                    opacity: 0.4,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
              >
                {/* Glow Effect */}
                <div 
                  className="circle-glow"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '420px',
                    height: '420px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${theme.accent}20 0%, transparent 70%)`,
                    opacity: 0.4,
                    filter: 'blur(20px)',
                    zIndex: 1,
                    pointerEvents: 'none'
                  }}
                />
                
                {/* Main Circle */}
                <div style={{
                  width: '350px',
                  height: '350px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative',
                  zIndex: 2,
                  border: `4px solid ${theme.white}`,
                  boxShadow: `0 20px 60px ${theme.charcoal}20`
                }}>
                  {/* Project Image */}
                  <div 
                    className="circle-image"
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(180deg, transparent 40%, ${theme.charcoal}dd)`,
                    opacity: 0.7,
                    transition: 'opacity 0.3s ease'
                  }} />
                  
                  {/* Project Title */}
                  <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    zIndex: 3,
                    padding: '0 30px'
                  }}>
                    <h3 style={{
                      color: theme.white,
                      fontWeight: '700',
                      fontSize: '1.8rem',
                      marginBottom: '8px',
                      fontFamily: "'Cygre', sans-serif",
                      textShadow: `0 2px 10px ${theme.charcoal}80`
                    }}>
                      {project.title}
                    </h3>
                    <p style={{
                      color: `${theme.white}cc`,
                      fontSize: '1rem',
                      fontWeight: '300',
                      fontFamily: "'Cygre', sans-serif",
                      margin: 0,
                      textShadow: `0 1px 5px ${theme.charcoal}80`
                    }}>
                      {project.client}
                    </p>
                  </div>
                </div>
                
                {/* Outer Ring with Continuous Rotation */}
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '-15px',
                  right: '-15px',
                  bottom: '-15px',
                  borderRadius: '50%',
                  border: `3px solid ${theme.accent}40`,
                  zIndex: 0,
                  pointerEvents: 'none',
                  animation: `spin ${20 + index * 5}s linear infinite`
                }} />
              </div>
            ))}
            
            {/* See More Button Circle */}
            <div
              onClick={handleSeeMoreClick}
              style={{
                position: 'relative',
                flexShrink: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                const circle = e.currentTarget;
                gsap.to(circle, {
                  scale: 1.05,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                const circle = e.currentTarget;
                gsap.to(circle, {
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
            >
              {/* Glow Effect */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '420px',
                height: '420px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${theme.lightAccent}20 0%, transparent 70%)`,
                opacity: 0.4,
                filter: 'blur(20px)',
                zIndex: 1,
                pointerEvents: 'none'
              }} />
              
              {/* Button Circle */}
              <div style={{
                width: '350px',
                height: '350px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.lightAccent})`,
                position: 'relative',
                zIndex: 2,
                border: `4px solid ${theme.white}`,
                boxShadow: `0 20px 60px ${theme.charcoal}20`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                padding: '40px'
              }}>
                {/* Arrow Icon */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: theme.white,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 10px 30px ${theme.charcoal}30`
                }}>
                  <FaArrowRight style={{
                    color: theme.accent,
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }} />
                </div>
                
                {/* Button Text */}
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{
                    color: theme.white,
                    fontWeight: '700',
                    fontSize: '1.8rem',
                    marginBottom: '10px',
                    fontFamily: "'Cygre', sans-serif",
                    textShadow: `0 2px 10px ${theme.charcoal}80`
                  }}>
                    See More
                  </h3>
                  <p style={{
                    color: `${theme.white}cc`,
                    fontSize: '1rem',
                    fontWeight: '300',
                    fontFamily: "'Cygre', sans-serif",
                    margin: 0,
                    textShadow: `0 1px 5px ${theme.charcoal}80`
                  }}>
                    View All Projects
                  </p>
                </div>
                
                {/* Pulsing Animation */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: `3px solid ${theme.white}40`,
                  animation: 'pulse 2s infinite',
                  pointerEvents: 'none'
                }} />
              </div>
              
              {/* Outer Ring */}
              <div style={{
                position: 'absolute',
                top: '-15px',
                left: '-15px',
                right: '-15px',
                bottom: '-15px',
                borderRadius: '50%',
                border: `3px solid ${theme.lightAccent}40`,
                zIndex: 0,
                pointerEvents: 'none',
                animation: 'spin 25s linear infinite'
              }} />
            </div>
            
            {/* Add extra space at end */}
            <div style={{ flex: '0 0 auto', width: '20px', height: '100%' }} />
          </div>
        </div>
      </div>

      {/* Animations and Responsive CSS */}
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/cygre');
        
        /* Keyframe Animations */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0;
          }
        }
        
        /* Mobile responsiveness */
        @media (max-width: 1200px) {
          #projects {
            padding: 80px 0 120px !important;
          }
          
          #projects h2 {
            font-size: 3rem !important;
          }
          
          div[style*="width: '350px'"] {
            width: 320px !important;
            height: 320px !important;
          }
          
          div[style*="width: '420px'"] {
            width: 380px !important;
            height: 380px !important;
          }
          
          div[style*="gap: '80px'"] {
            gap: 60px !important;
          }
          
          button[style*="left: '10px'"],
          button[style*="right: '10px'"] {
            width: 45px !important;
            height: 45px !important;
            font-size: 1.1rem !important;
          }
        }
        
        @media (max-width: 992px) {
          #projects {
            padding: 60px 0 100px !important;
          }
          
          #projects h2 {
            font-size: 2.5rem !important;
            padding: 0 20px !important;
          }
          
          #projects p[style*="subtitle"] {
            font-size: 1.1rem !important;
            padding: 0 20px !important;
          }
          
          div[style*="width: '350px'"] {
            width: 300px !important;
            height: 300px !important;
          }
          
          div[style*="width: '420px'"] {
            width: 360px !important;
            height: 360px !important;
          }
          
          div[style*="gap: '80px'"] {
            gap: 50px !important;
            padding: 0 30px !important;
          }
          
          button[style*="left: '10px'"],
          button[style*="right: '10px'"] {
            width: 40px !important;
            height: 40px !important;
            font-size: 1rem !important;
            left: 5px !important;
            right: 5px !important;
          }
        }
        
        @media (max-width: 768px) {
          #projects {
            padding: 50px 0 80px !important;
          }
          
          #projects h2 {
            font-size: 2.2rem !important;
          }
          
          #projects p[style*="subtitle"] {
            font-size: 1rem !important;
          }
          
          div[style*="width: '350px'"] {
            width: 280px !important;
            height: 280px !important;
          }
          
          div[style*="width: '420px'"] {
            width: 340px !important;
            height: 340px !important;
          }
          
          div[style*="gap: '80px'"] {
            gap: 40px !important;
            padding: 0 20px !important;
          }
          
          h3[style*="font-size: '1.8rem'"] {
            font-size: 1.6rem !important;
          }
          
          div[style*="width: '80px'"] {
            width: 70px !important;
            height: 70px !important;
          }
          
          button[style*="left: '10px'"],
          button[style*="right: '10px'"] {
            display: none !important;
          }
        }
        
        @media (max-width: 576px) {
          #projects {
            padding: 40px 0 60px !important;
          }
          
          #projects h2 {
            font-size: 1.8rem !important;
          }
          
          #projects p[style*="subtitle"] {
            font-size: 0.9rem !important;
          }
          
          div[style*="width: '350px'"] {
            width: 250px !important;
            height: 250px !important;
          }
          
          div[style*="width: '420px'"] {
            width: 310px !important;
            height: 310px !important;
          }
          
          div[style*="gap: '80px'"] {
            gap: 30px !important;
            padding: 0 15px !important;
          }
          
          h3[style*="font-size: '1.8rem'"] {
            font-size: 1.4rem !important;
          }
          
          p[style*="font-size: '1rem'"] {
            font-size: 0.9rem !important;
          }
          
          div[style*="width: '80px'"] {
            width: 60px !important;
            height: 60px !important;
          }
          
          svg, path[style*="FaArrowRight"] {
            font-size: 1.5rem !important;
          }
        }
        
        @media (max-width: 400px) {
          div[style*="width: '350px'"] {
            width: 220px !important;
            height: 220px !important;
          }
          
          div[style*="width: '420px'"] {
            width: 280px !important;
            height: 280px !important;
          }
          
          div[style*="gap: '80px'"] {
            gap: 25px !important;
          }
          
          h3[style*="font-size: '1.8rem'"] {
            font-size: 1.2rem !important;
            padding: 0 15px !important;
          }
        }
        
        /* Performance optimizations */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
          
          .circle-glow {
            animation: none !important;
          }
          
          div[style*="animation:"] {
            animation: none !important;
          }
        }
        
        /* Fix for iOS Safari */
        @supports (-webkit-touch-callout: none) {
          #projects {
            min-height: -webkit-fill-available;
          }
          
          .circles-container {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;