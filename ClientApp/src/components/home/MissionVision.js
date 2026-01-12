import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MissionVision = () => {
  const sectionRef = useRef(null);
  const missionCardRef = useRef(null);
  const visionCardRef = useRef(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const theme = {
    charcoal: '#1e252f',
    beige: '#e3e1d7',
    accent: '#8b7355',
    lightAccent: '#a89070',
    white: '#ffffff'
  };

  const missionContent = {
    title: "Mission",
    description: "Our mission is to deliver high quality woodwork contracting solutions supported by precise craftsmanship, advanced production capabilities, and a skilled workforce. We aim to provide clients with reliable and customized joinery for residential, commercial, and institutional projects through our fully equipped 2000 m² factory and diverse material expertise.",
    continuation: "While our core focus is woodwork, we also provide fit out services and coordinate MEP works through trusted subcontractors when required, ensuring a seamless and integrated project delivery. We are committed to maintaining strong quality control, safety practices, and effective project management to achieve client satisfaction in every scope we undertake."
  };

  const visionContent = {
    title: "Vision",
    description: "We aim to follow in the Kingdom's footsteps towards Vision 2030 and to be recognized as a leading woodwork contracting company in Saudi Arabia, known for delivering exceptional craftsmanship, reliable project execution, and innovative interior solutions. We aim to strengthen our position as the preferred woodwork partner for general contractors, consultants, and clients by maintaining",
    continuation: "high production standards, expanding our technical capabilities, and ensuring seamless integration with fit out and supporting works when required."
  };

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Setup animations with GSAP Context for proper cleanup
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Setup initial 3D perspective
      gsap.set(containerRef.current, {
        perspective: 1200
      });

      // Initial state for cards
      gsap.set([missionCardRef.current, visionCardRef.current], {
        opacity: 0,
        y: 80,
        rotationY: isMobile ? 0 : 20,
        rotationX: isMobile ? 0 : -10,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden"
      });

      // Create timeline for entrance animation
      const entranceTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 85%" : "top 80%",
          toggleActions: "play none none reverse",
          once: true
        }
      });

      // Mission card entrance
      entranceTL.to(missionCardRef.current, {
        opacity: 1,
        y: 0,
        rotationY: isMobile ? 0 : 8,
        rotationX: isMobile ? 0 : -5,
        duration: 1.2,
        ease: "power3.out"
      })
      // Vision card entrance
      .to(visionCardRef.current, {
        opacity: 1,
        y: 0,
        rotationY: isMobile ? 0 : -8,
        rotationX: isMobile ? 0 : -5,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.8");

      // Desktop hover effects
      if (!isMobile) {
        const missionCard = missionCardRef.current;
        const visionCard = visionCardRef.current;

        const handleMissionEnter = () => {
          gsap.to(missionCard, {
            rotationY: 15,
            rotationX: -8,
            scale: 1.03,
            y: -10,
            duration: 0.5,
            ease: "power2.out"
          });
        };

        const handleMissionLeave = () => {
          gsap.to(missionCard, {
            rotationY: 8,
            rotationX: -5,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out"
          });
        };

        const handleVisionEnter = () => {
          gsap.to(visionCard, {
            rotationY: -15,
            rotationX: -8,
            scale: 1.03,
            y: -10,
            duration: 0.5,
            ease: "power2.out"
          });
        };

        const handleVisionLeave = () => {
          gsap.to(visionCard, {
            rotationY: -8,
            rotationX: -5,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out"
          });
        };

        // Add event listeners
        if (missionCard) {
          missionCard.addEventListener('mouseenter', handleMissionEnter);
          missionCard.addEventListener('mouseleave', handleMissionLeave);
        }

        if (visionCard) {
          visionCard.addEventListener('mouseenter', handleVisionEnter);
          visionCard.addEventListener('mouseleave', handleVisionLeave);
        }

        // Return cleanup function for event listeners
        return () => {
          if (missionCard) {
            missionCard.removeEventListener('mouseenter', handleMissionEnter);
            missionCard.removeEventListener('mouseleave', handleMissionLeave);
          }
          if (visionCard) {
            visionCard.removeEventListener('mouseenter', handleVisionEnter);
            visionCard.removeEventListener('mouseleave', handleVisionLeave);
          }
        };
      }
    }, sectionRef);

    // Cleanup function
    return () => {
      ctx.revert(); // This will kill all GSAP animations and ScrollTriggers in this context
    };
  }, [isMobile]);

  return (
    <section 
      ref={sectionRef}
      style={{
        padding: isMobile ? '60px 20px' : '100px 20px',
        backgroundColor: theme.beige,
        color: theme.charcoal,
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Subtle Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `radial-gradient(${theme.charcoal}05 1px, transparent 2px)`,
        backgroundSize: '60px 60px',
        opacity: 0.1,
        zIndex: 0
      }} />

      <div 
        ref={containerRef}
        style={{
          maxWidth: '1400px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Section Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: isMobile ? '50px' : '80px',
          position: 'relative'
        }}>
          <div style={{
            fontFamily: "'Cygre', sans-serif",
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: '700',
            color: theme.charcoal,
            marginBottom: '20px',
            position: 'relative',
            display: 'inline-block'
          }}>
            Our Purpose
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: isMobile ? '80px' : '100px',
              height: '3px',
              backgroundColor: theme.accent,
              borderRadius: '2px'
            }} />
          </div>
          <p style={{
            color: `${theme.charcoal}cc`,
            fontSize: isMobile ? '1rem' : '1.2rem',
            maxWidth: isMobile ? '90%' : '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Driving excellence in woodwork craftsmanship with a clear vision for the future
          </p>
        </div>

        {/* Cards Container */}
        <div style={{
          display: isMobile ? 'block' : 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '30px' : '50px',
          alignItems: 'stretch',
          maxWidth: isMobile ? '600px' : 'none',
          margin: isMobile ? '0 auto' : '0'
        }}>
          {/* Mission Card */}
          <div
            ref={missionCardRef}
            style={{
              backgroundColor: theme.charcoal,
              borderRadius: '20px',
              padding: isMobile ? '30px 25px' : '50px 40px',
              position: 'relative',
              boxShadow: `
                0 20px 60px rgba(30, 37, 47, 0.3),
                0 0 0 1px ${theme.accent}30,
                inset 0 0 0 1px ${theme.beige}15
              `,
              border: `1px solid ${theme.accent}40`,
              overflow: 'hidden',
              minHeight: isMobile ? '400px' : '500px',
              display: 'flex',
              flexDirection: 'column',
              cursor: isMobile ? 'default' : 'pointer',
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              willChange: "transform"
            }}
          >
            {/* Card Background Pattern */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(45deg, ${theme.accent}05 25%, transparent 25%),
                              linear-gradient(-45deg, ${theme.accent}05 25%, transparent 25%),
                              linear-gradient(45deg, transparent 75%, ${theme.accent}05 75%),
                              linear-gradient(-45deg, transparent 75%, ${theme.accent}05 75%)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
              opacity: 0.2,
              zIndex: 0
            }} />

            <div 
              className="card-content"
              style={{
                position: 'relative',
                zIndex: 2,
                transformStyle: "preserve-3d"
              }}
            >
              {/* Card Title */}
              <h3 
                className="card-title"
                style={{
                  fontFamily: "'Cygre', sans-serif",
                  fontSize: isMobile ? '2rem' : '2.5rem',
                  fontWeight: '700',
                  color: theme.beige,
                  marginBottom: '25px',
                  position: 'relative',
                  paddingBottom: '15px'
                }}
              >
                {missionContent.title}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: isMobile ? '60px' : '80px',
                  height: '3px',
                  backgroundColor: theme.accent,
                  borderRadius: '2px'
                }} />
              </h3>

              {/* Card Description */}
              <div style={{
                marginBottom: '30px'
              }}>
                <p style={{
                  color: `${theme.beige}dd`,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  lineHeight: 1.7,
                  marginBottom: '20px'
                }}>
                  {missionContent.description}
                </p>
                <p style={{
                  color: `${theme.beige}bb`,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  lineHeight: 1.7,
                  fontStyle: 'italic'
                }}>
                  {missionContent.continuation}
                </p>
              </div>

              {/* Decorative Element */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginTop: 'auto',
                paddingTop: '20px'
              }}>
                <div style={{
                  width: '40px',
                  height: '3px',
                  backgroundColor: theme.accent,
                  borderRadius: '2px'
                }} />
                <span style={{
                  color: `${theme.accent}dd`,
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  fontWeight: '600',
                  letterSpacing: '1px'
                }}>
                  COMMITTED TO EXCELLENCE
                </span>
              </div>
            </div>

            {/* Glow Effect */}
            <div style={{
              position: 'absolute',
              bottom: '-100px',
              right: '-100px',
              width: '200px',
              height: '200px',
              background: `radial-gradient(circle, ${theme.accent}15 0%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(20px)',
              zIndex: 0,
              opacity: 0.4,
              transform: 'translateZ(-10px)'
            }} />
          </div>

          {/* Vision Card */}
          <div
            ref={visionCardRef}
            style={{
              backgroundColor: theme.charcoal,
              borderRadius: '20px',
              padding: isMobile ? '30px 25px' : '50px 40px',
              position: 'relative',
              boxShadow: `
                0 20px 60px rgba(30, 37, 47, 0.3),
                0 0 0 1px ${theme.lightAccent}30,
                inset 0 0 0 1px ${theme.beige}15
              `,
              border: `1px solid ${theme.lightAccent}40`,
              overflow: 'hidden',
              minHeight: isMobile ? '400px' : '500px',
              display: 'flex',
              flexDirection: 'column',
              cursor: isMobile ? 'default' : 'pointer',
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              willChange: "transform"
            }}
          >
            {/* Card Background Pattern */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(45deg, ${theme.lightAccent}05 25%, transparent 25%),
                              linear-gradient(-45deg, ${theme.lightAccent}05 25%, transparent 25%),
                              linear-gradient(45deg, transparent 75%, ${theme.lightAccent}05 75%),
                              linear-gradient(-45deg, transparent 75%, ${theme.lightAccent}05 75%)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
              opacity: 0.2,
              zIndex: 0
            }} />

            <div 
              className="card-content"
              style={{
                position: 'relative',
                zIndex: 2,
                transformStyle: "preserve-3d"
              }}
            >
              {/* Card Title */}
              <h3 
                className="card-title"
                style={{
                  fontFamily: "'Cygre', sans-serif",
                  fontSize: isMobile ? '2rem' : '2.5rem',
                  fontWeight: '700',
                  color: theme.beige,
                  marginBottom: '25px',
                  position: 'relative',
                  paddingBottom: '15px'
                }}
              >
                {visionContent.title}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: isMobile ? '60px' : '80px',
                  height: '3px',
                  backgroundColor: theme.lightAccent,
                  borderRadius: '2px'
                }} />
              </h3>

              {/* Card Description */}
              <div style={{
                marginBottom: '30px'
              }}>
                <p style={{
                  color: `${theme.beige}dd`,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  lineHeight: 1.7,
                  marginBottom: '20px'
                }}>
                  {visionContent.description}
                </p>
                <p style={{
                  color: `${theme.beige}bb`,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  lineHeight: 1.7,
                  fontStyle: 'italic'
                }}>
                  {visionContent.continuation}
                </p>
              </div>

              {/* Vision 2030 Badge */}
              <div style={{
                marginTop: 'auto',
                padding: '15px 20px',
                backgroundColor: `${theme.accent}20`,
                borderRadius: '12px',
                border: `1px solid ${theme.accent}40`,
                position: 'relative',
                overflow: 'hidden',
                transformStyle: "preserve-3d"
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: theme.accent,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.white,
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}>
                    ٢٠٣٠
                  </div>
                  <div>
                    <span style={{
                      color: theme.beige,
                      fontSize: isMobile ? '0.85rem' : '0.9rem',
                      fontWeight: '600',
                      display: 'block',
                      marginBottom: '5px'
                    }}>
                      Vision 2030 Initiative
                    </span>
                    <span style={{
                      color: `${theme.beige}bb`,
                      fontSize: isMobile ? '0.8rem' : '0.85rem'
                    }}>
                      Aligned with Saudi Arabia's national vision
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div style={{
              position: 'absolute',
              bottom: '-100px',
              left: '-100px',
              width: '200px',
              height: '200px',
              background: `radial-gradient(circle, ${theme.lightAccent}15 0%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(20px)',
              zIndex: 0,
              opacity: 0.4,
              transform: 'translateZ(-10px)'
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @font-face {
          font-family: 'Cygre';
          font-style: normal;
          font-weight: 400;
          src: url('https://fonts.cdnfonts.com/s/87584/Cygre-Book.woff') format('woff');
        }
        @font-face {
          font-family: 'Cygre';
          font-style: normal;
          font-weight: 700;
          src: url('https://fonts.cdnfonts.com/s/87584/Cygre-Bold.woff') format('woff');
        }
        
        /* Hardware acceleration */
        section {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        /* Card hover effects */
        div[style*="Mission Card"]:hover {
          transform: translateZ(20px) !important;
        }
        
        div[style*="Vision Card"]:hover {
          transform: translateZ(20px) !important;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          section {
            padding: 60px 20px !important;
            min-height: auto !important;
          }
          
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          
          div[style*="font-size: 2.5rem"] {
            font-size: 2rem !important;
          }
          
          div[style*="min-height: 500px"] {
            min-height: 400px !important;
            padding: 30px !important;
          }
          
          div[style*="font-size: 1.1rem"] {
            font-size: 1rem !important;
          }
        }
        
        @media (max-width: 480px) {
          section {
            padding: 40px 15px !important;
          }
          
          div[style*="font-size: 2.5rem"] {
            font-size: 1.8rem !important;
          }
          
          div[style*="min-height: 500px"] {
            min-height: 350px !important;
            padding: 25px 20px !important;
          }
        }
        
        /* Reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          div[style*="Mission Card"],
          div[style*="Vision Card"] {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default MissionVision;