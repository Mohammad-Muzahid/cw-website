import React, { useEffect, useRef, useMemo, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);
  const [titleText, setTitleText] = useState({ about: '', us: '' });
  const [typingComplete, setTypingComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  const hoverHandlers = useRef([]);

  const theme = {
    charcoal: '#1e252f',
    beige: '#e3e1d7',
    accent: '#8b7355',
    lightAccent: '#a89070',
    white: '#ffffff'
  };

  const handleLearnMoreClick = () => {
    navigate('/about');
  };

  const companyInfo = {
    name: "Comprehensive Woodwork",
    establishment: "2010",
    factorySize: "2000 m²",
    location: "Jeddah, Saudi Arabia",
    description: "A premier woodwork contracting company delivering exceptional craftsmanship through advanced production capabilities and skilled workforce, operating from a fully equipped 2000 m² factory in Jeddah."
  };

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Responsive cards configuration
  const cards = useMemo(() => {
    if (isMobile) {
      return [
        {
          title: "Advanced Facility",
          description: "2000 m² factory with CNC machines & specialized equipment",
          image: '/images/advanced.jpeg',
          mobileHeight: '220px'
        },
        {
          title: "Quality Craftsmanship",
          description: "ISO certified quality management system",
          image: '/images/craftmanship.jpg',
          mobileHeight: '220px'
        },
        {
          title: "Expert Team",
          description: "60+ skilled professionals with 13+ years experience",
          image: '/images/our-team.jpg',
          mobileHeight: '220px'
        },
        {
          title: "Proven Track Record",
          description: "50+ projects completed nationwide",
          image: '/images/record.jpeg',
          mobileHeight: '220px'
        }
      ];
    } else {
      return [
        {
          title: "Advanced Facility",
          description: "2000 m² factory with CNC machines & specialized equipment",
          image: '/images/advanced.jpeg',
          gridColumn: '1',
          gridRow: 'span 2',
          height: '600px'
        },
        {
          title: "Quality Craftsmanship",
          description: "ISO certified quality management system",
          image: '/images/craftmanship.jpg',
          gridColumn: '2',
          gridRow: '1',
          height: '294px'
        },
        {
          title: "Expert Team",
          description: "60+ skilled professionals with 13+ years experience",
          image: '/images/our-team.jpg',
          gridColumn: '2',
          gridRow: '2',
          height: '294px'
        },
        {
          title: "Proven Track Record",
          description: "50+ projects completed nationwide",
          image: '/images/record.jpeg',
          gridColumn: 'span 2',
          gridRow: '3',
          height: '180px'
        }
      ];
    }
  }, [isMobile]);

  // Typewriter effect for title
  useEffect(() => {
    setTitleText({ about: '', us: '' });
    
    const startTimeout = setTimeout(() => {
      const aboutText = "About";
      const usText = "Us";
      let aboutIndex = 0;
      let usIndex = 0;

      const typeAbout = () => {
        if (aboutIndex <= aboutText.length) {
          setTitleText(prev => ({ 
            ...prev, 
            about: aboutText.substring(0, aboutIndex) 
          }));
          aboutIndex++;
          setTimeout(typeAbout, 120);
        } else {
          setTimeout(typeUs, 400);
        }
      };

      const typeUs = () => {
        if (usIndex <= usText.length) {
          setTitleText(prev => ({ 
            ...prev, 
            us: usText.substring(0, usIndex) 
          }));
          usIndex++;
          setTimeout(typeUs, 150);
        } else {
          setTypingComplete(true);
        }
      };

      typeAbout();
    }, 1000);

    return () => {
      clearTimeout(startTimeout);
    };
  }, []);

  // Setup card hover animations
  useEffect(() => {
    if (!typingComplete) return;
    
    const cardElements = cardRefs.current;
    if (cardElements.length === 0) return;

    // Simple fade in animation
    gsap.fromTo(cardElements,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }
    );

    // Setup hover effects with proper cleanup
    const setupHoverEffects = () => {
      if (!isMobile) {
        hoverHandlers.current = [];
        cardElements.forEach((card) => {
          if (card) {
            const title = card.querySelector('.card-title');
            const description = card.querySelector('.card-description');
            
            const handleMouseEnter = () => {
              // Card animation
              gsap.to(card, {
                scale: 1.03,
                y: -5,
                duration: 0.3,
                ease: "power2.out"
              });

              // Title animation - hide title
              if (title) {
                gsap.to(title, {
                  opacity: 0,
                  y: -10,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }

              // Description animation - show description
              if (description) {
                gsap.to(description, {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  ease: "power2.out",
                  delay: 0.1
                });
              }
            };
            
            const handleMouseLeave = () => {
              // Card animation
              gsap.to(card, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
              });

              // Title animation - show title
              if (title) {
                gsap.to(title, {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  ease: "power2.out"
                });
              }

              // Description animation - hide description
              if (description) {
                gsap.to(description, {
                  opacity: 0,
                  y: 15,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }
            };
            
            hoverHandlers.current.push({
              card,
              handleMouseEnter,
              handleMouseLeave
            });
            
            card.addEventListener('mouseenter', handleMouseEnter);
            card.addEventListener('mouseleave', handleMouseLeave);
          }
        });
      }
    };

    // Delay hover effect setup
    const hoverTimeout = setTimeout(setupHoverEffects, 1500);

    return () => {
      clearTimeout(hoverTimeout);
      hoverHandlers.current.forEach(handler => {
        if (handler.card) {
          handler.card.removeEventListener('mouseenter', handler.handleMouseEnter);
          handler.card.removeEventListener('mouseleave', handler.handleMouseLeave);
        }
      });
      hoverHandlers.current = [];
    };
  }, [typingComplete, isMobile]);

  // SCROLL ANIMATIONS - SIMPLIFIED
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Content animation
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { 
            opacity: 0, 
            y: 20
          },
          { 
            opacity: 1, 
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              once: true
            }
          }
        );
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { 
            opacity: 0, 
            y: 15
          },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              once: true
            }
          }
        );
      }

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="about"
      style={{ 
        padding: isMobile ? '40px 0' : '80px 0',
        backgroundColor: theme.charcoal,
        color: theme.beige,
        overflow: 'hidden',
        position: 'relative',
        minHeight: isMobile ? 'auto' : '90vh'
      }}
    >
      {/* Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: isMobile ? 'none' : 'url(/images/about.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: isMobile ? 0 : 0.3,
        zIndex: 0
      }}>
        {!isMobile && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, 
              ${theme.charcoal} 0%, 
              ${theme.charcoal} 25%, 
              ${theme.charcoal} 50%, 
              ${theme.charcoal} 75%, 
              ${theme.charcoal}f0 78%, 
              ${theme.charcoal}e0 81%, 
              ${theme.charcoal}c0 84%, 
              ${theme.charcoal}a0 87%, 
              ${theme.charcoal}80 90%, 
              ${theme.charcoal}60 93%, 
              ${theme.charcoal}40 96%, 
              ${theme.charcoal}20 99%, 
              transparent 100%)`,
            zIndex: 1
          }} />
        )}
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '0 15px' : '0 40px',
        position: 'relative',
        zIndex: 3
      }}>
        {isMobile ? (
          /* MOBILE LAYOUT - SIMPLE SINGLE COLUMN */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* Title Section */}
            <div>
              <h2 style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '12px',
                marginBottom: '25px',
                lineHeight: 1,
                minHeight: '60px'
              }}>
                <div style={{ 
                  fontFamily: "'Cygre', sans-serif",
                  fontSize: windowWidth < 380 ? '2.2rem' : '2.5rem',
                  fontWeight: '700',
                  color: theme.beige,
                  height: windowWidth < 380 ? '2.2rem' : '2.5rem',
                  overflow: 'hidden'
                }}>
                  {titleText.about}
                </div>
                
                <div style={{ 
                  fontFamily: "'Cygre', sans-serif",
                  fontWeight: '700',
                  color: theme.accent,
                  fontSize: windowWidth < 380 ? '2rem' : '2.2rem',
                  marginBottom: windowWidth < 380 ? '0.2rem' : '0.3rem',
                  height: windowWidth < 380 ? '2rem' : '2.2rem',
                  overflow: 'hidden'
                }}>
                  {titleText.us}
                </div>
              </h2>
              
              <div ref={contentRef}>
                <p style={{
                  color: theme.beige,
                  fontSize: windowWidth < 380 ? '0.95rem' : '1rem',
                  lineHeight: 1.6,
                  marginBottom: '20px'
                }}>
                  Founded in {companyInfo.establishment}, we are a premier woodwork contracting company delivering exceptional craftsmanship through our {companyInfo.factorySize} factory in {companyInfo.location}.
                </p>
                <p style={{
                  color: `${theme.beige}cc`,
                  fontSize: windowWidth < 380 ? '0.9rem' : '0.95rem',
                  lineHeight: 1.6,
                  borderLeft: `2px solid ${theme.accent}`,
                  paddingLeft: '15px',
                  marginTop: '20px'
                }}>
                  {companyInfo.description}
                </p>
              </div>
            </div>

            {/* Cards Section - Simple vertical stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {cards.map((card, index) => (
                <div
                  key={index}
                  ref={addToCardRefs}
                  style={{
                    backgroundColor: theme.charcoal,
                    borderRadius: '12px',
                    border: `2px solid ${theme.beige}30`,
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                    height: card.mobileHeight,
                    opacity: 0
                  }}
                >
                  {/* Background Image */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.6)'
                  }} />
                  
                  {/* Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: `${theme.charcoal}70`,
                    zIndex: 1
                  }} />
                  
                  {/* Title (always visible on mobile) */}
                  <div 
                    className="card-title"
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      padding: '20px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <h3 style={{
                      color: theme.beige,
                      fontSize: windowWidth < 380 ? '1.2rem' : '1.3rem',
                      fontWeight: '700',
                      margin: '0 0 10px 0',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                    }}>
                      {card.title}
                    </h3>
                    <p style={{
                      color: `${theme.beige}dd`,
                      fontSize: windowWidth < 380 ? '0.85rem' : '0.9rem',
                      margin: 0,
                      textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)',
                      lineHeight: 1.4
                    }}>
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div ref={ctaRef} style={{ marginTop: '20px' }}>
              <button
                onClick={handleLearnMoreClick}
                style={{
                  backgroundColor: theme.accent,
                  color: theme.charcoal,
                  padding: '16px 30px',
                  fontWeight: '700',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%'
                }}
              >
                <span>Learn More About Us</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        ) : (
          /* DESKTOP LAYOUT - WITH HOVER ANIMATIONS */
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
            marginBottom: '60px'
          }}>
            {/* Left Column */}
            <div>
              <div style={{ marginBottom: '40px' }}>
                <h2
                  ref={titleRef}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '20px',
                    marginBottom: '40px',
                    lineHeight: 1,
                    minHeight: '120px'
                  }}
                >
                  <div style={{ 
                    fontFamily: "'Cygre', sans-serif",
                    fontSize: '5.5rem',
                    fontWeight: '400',
                    color: theme.beige,
                    height: '5.5rem',
                    overflow: 'hidden'
                  }}>
                    {titleText.about}
                  </div>
                  
                  <div style={{ 
                    fontFamily: "'Cygre', sans-serif",
                    fontWeight: '700',
                    color: theme.accent,
                    fontSize: '5rem',
                    marginBottom: '0.5rem',
                    height: '5rem',
                    overflow: 'hidden'
                  }}>
                    {titleText.us}
                  </div>
                </h2>
                
                <div ref={contentRef}>
                  <p style={{
                    color: theme.beige,
                    fontSize: '1.2rem',
                    lineHeight: 1.7,
                    marginBottom: '25px'
                  }}>
                    Founded in {companyInfo.establishment}, we are a premier woodwork contracting company delivering exceptional craftsmanship through our {companyInfo.factorySize} factory in {companyInfo.location}.
                  </p>
                  <p style={{
                    color: `${theme.beige}cc`,
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    borderLeft: `3px solid ${theme.accent}`,
                    paddingLeft: '20px',
                    marginTop: '25px'
                  }}>
                    {companyInfo.description}
                  </p>
                </div>
              </div>
              
              <div ref={ctaRef} style={{ marginTop: '40px' }}>
                <button
                  onClick={handleLearnMoreClick}
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.charcoal,
                    padding: '16px 40px',
                    fontWeight: '700',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1.05,
                      backgroundColor: theme.lightAccent,
                      duration: 0.3
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      backgroundColor: theme.accent,
                      duration: 0.3
                    });
                  }}
                >
                  <span>Learn More About Us</span>
                  <FaArrowRight />
                </button>
              </div>
            </div>

            {/* Right Column - Cards Grid with Hover Effects */}
            <div>
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridTemplateRows: 'repeat(3, auto)',
                  gap: '25px',
                  height: '600px'
                }}
              >
                {cards.map((card, index) => (
                  <div
                    key={index}
                    ref={addToCardRefs}
                    style={{
                      backgroundColor: theme.charcoal,
                      borderRadius: '15px',
                      border: `2px solid ${theme.beige}30`,
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                      cursor: 'pointer',
                      opacity: 0,
                      gridColumn: card.gridColumn,
                      gridRow: card.gridRow,
                      height: card.height
                    }}
                  >
                    {/* Background Image */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${card.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.7)',
                        transition: 'filter 0.5s ease'
                      }}
                    />
                    
                    {/* Overlay */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: `${theme.charcoal}40`,
                        transition: 'background-color 0.5s ease',
                        zIndex: 1
                      }}
                    />
                    
                    {/* Title (shown on hover out) */}
                    <div 
                      className="card-title"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        zIndex: 2,
                        opacity: 1
                      }}
                    >
                      <h3 style={{
                        color: theme.beige,
                        fontSize: card.gridColumn === 'span 2' ? '1.8rem' : '1.4rem',
                        fontWeight: '700',
                        margin: 0,
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                        textAlign: 'center'
                      }}>
                        {card.title}
                      </h3>
                    </div>
                    
                    {/* Description (shown on hover) */}
                    <div 
                      className="card-description"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '30px',
                        zIndex: 3,
                        opacity: 0,
                        transform: 'translateY(20px)'
                      }}
                    >
                      <p style={{
                        color: theme.beige,
                        fontSize: card.gridColumn === 'span 2' ? '1rem' : '0.95rem',
                        lineHeight: 1.5,
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                        margin: 0,
                        textAlign: 'center'
                      }}>
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;