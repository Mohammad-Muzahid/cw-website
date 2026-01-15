import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPenAlt, FaTools, FaPaintRoller, FaHardHat, FaUserTie, FaArrowRight } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Move theme and services data outside component
const theme = {
  charcoal: '#1e252f',
  beige: '#e3e1d7',
  accent: '#8b7355',
  lightAccent: '#a89070',
  white: '#ffffff'
};

const services = [
  {
    id: 1,
    title: "Design & Consultation",
    icon: "FaPenAlt",
    shortDesc: "Complete design solutions",
    description: "Complete design solutions tailored to your vision with 3D visualization, material selection, and technical detailing.",
    features: [
      "Shop drawings & technical detailing",
      "Material selection & specification",
      "3D visualization & concepts",
      "Client consultation & planning"
    ],
    color: theme.accent,
    route: "/services",
    rotationOffset: 0
  },
  {
    id: 2,
    title: "Precision Fabrication",
    icon: "FaTools",
    shortDesc: "Precision fabrication",
    description: "Precision fabrication in our 2000 m² factory with CNC machining, solid wood work, and quality control.",
    features: [
      "CNC machining & cutting",
      "Solid wood & veneer work",
      "Panel processing & assembly",
      "Quality control checks"
    ],
    color: theme.lightAccent,
    route: "/services",
    rotationOffset: 72
  },
  {
    id: 3,
    title: "Professional Finishing",
    icon: "FaPaintRoller",
    shortDesc: "Professional finishing",
    description: "Professional finishing for premium results with paint application, protective coatings, and surface detailing.",
    features: [
      "Paint & polish application",
      "Laminate & veneer finishing",
      "Protective coatings",
      "Surface treatment & detailing"
    ],
    color: theme.accent,
    route: "/services",
    rotationOffset: 144
  },
  {
    id: 4,
    title: "Installation Services",
    icon: "FaHardHat",
    shortDesc: "Professional installation",
    description: "Professional installation by expert teams with precision fitting, on-site assembly, and final adjustments.",
    features: [
      "On-site assembly",
      "Precision fitting & alignment",
      "Integration coordination",
      "Final adjustments"
    ],
    color: theme.lightAccent,
    route: "/services",
    rotationOffset: 216
  },
  {
    id: 5,
    title: "Project Management",
    icon: "FaUserTie",
    shortDesc: "End-to-end coordination",
    description: "End-to-end project coordination with timeline management, supplier coordination, and quality assurance.",
    features: [
      "Timeline & schedule management",
      "Supplier & subcontractor coordination",
      "Quality assurance monitoring",
      "Client communication & reporting"
    ],
    color: theme.accent,
    route: "/services",
    rotationOffset: 288
  }
];

// Icon mapping function
const getIconComponent = (iconName) => {
  switch (iconName) {
    case 'FaPenAlt':
      return <FaPenAlt />;
    case 'FaTools':
      return <FaTools />;
    case 'FaPaintRoller':
      return <FaPaintRoller />;
    case 'FaHardHat':
      return <FaHardHat />;
    case 'FaUserTie':
      return <FaUserTie />;
    default:
      return <FaPenAlt />;
  }
};

const Services = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const centerCircleRef = useRef(null);
  const circleRefs = useRef([]);
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);
  const [hoveredCircle, setHoveredCircle] = useState(null);
  const [containerSize, setContainerSize] = useState(900);
  const [isMobile, setIsMobile] = useState(false);
  const [rotationProgress, setRotationProgress] = useState(0);
  
  const rotationTweenRef = useRef(null);
  const masterTimelineRef = useRef(null);
  const scrollTriggersRef = useRef([]);
  const animationInitializedRef = useRef(false);
  const resizeTimeoutRef = useRef(null);

  // Cleanup GSAP animations
  useEffect(() => {
    return () => {
      if (rotationTweenRef.current) {
        rotationTweenRef.current.kill();
      }
      if (masterTimelineRef.current) {
        masterTimelineRef.current.kill();
      }
      gsap.killTweensOf("*");
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      scrollTriggersRef.current.forEach(trigger => {
        if (trigger && trigger.kill) trigger.kill();
      });
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      animationInitializedRef.current = false;
    };
  }, []);

  // Responsive sizing with proper debouncing and layout updates
  useEffect(() => {
    const updateContainerSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Determine size based on both width and height
      if (width <= 768 || height <= 700) {
        setContainerSize(450); // Reduced from 500 for better mobile fit
        setIsMobile(true);
      } else if (width <= 992) {
        setContainerSize(650); // Reduced from 700 for better tablet fit
        setIsMobile(false);
      } else if (width <= 1200) {
        setContainerSize(750); // Reduced from 800 for better medium desktop fit
        setIsMobile(false);
      } else {
        setContainerSize(900);
        setIsMobile(false);
      }
    };

    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        const previousSize = containerSize;
        updateContainerSize();
        
        // Update circle positions if size changed
        if (circleRefs.current.length > 0 && animationInitializedRef.current) {
          updateCirclePositions();
        }
      }, 150);
    };

    updateContainerSize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  // Calculate responsive values with better mobile adjustments
  const responsive = React.useMemo(() => {
    const scale = containerSize / 900;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isSmallMobile = width <= 480 || height <= 600;
    const isVerySmallMobile = width <= 360;
    
    // Adjust scaling for mobile
    const mobileScale = isMobile ? 0.5 : scale;
    
    return {
      containerSize: containerSize,
      centerSize: isMobile 
        ? Math.max(isVerySmallMobile ? 100 : 120, 250 * mobileScale)
        : Math.max(isSmallMobile ? 120 : 150, 300 * scale),
      circleSize: isMobile
        ? Math.max(isVerySmallMobile ? 60 : 70, 140 * mobileScale)
        : Math.max(isSmallMobile ? 90 : 110, 180 * scale),
      radius: isMobile
        ? Math.max(isVerySmallMobile ? 120 : 140, 250 * mobileScale)
        : Math.max(isSmallMobile ? 150 : 180, 320 * scale),
      fontSize: {
        title: isMobile 
          ? Math.max(0.9, 1.8 * mobileScale) + 'rem'
          : Math.max(1.2, 2.5 * scale) + 'rem',
        serviceTitle: isMobile
          ? Math.max(0.6, 0.9 * mobileScale) + 'rem'
          : Math.max(0.8, 1.3 * scale) + 'rem',
        centerTitle: isMobile
          ? Math.max(0.7, 1.2 * mobileScale) + 'rem'
          : Math.max(0.9, 1.8 * scale) + 'rem'
      },
      isSmallMobile,
      isVerySmallMobile,
      isMobile
    };
  }, [containerSize, isMobile]);

  // Calculate position based on angle
  const calculatePosition = useCallback((angle, radius) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius
    };
  }, []);

  // Update circle positions
  const updateCirclePositions = useCallback(() => {
    if (!circleRefs.current.length || !animationInitializedRef.current) return;

    const currentProgress = rotationProgress;
    
    services.forEach((service, index) => {
      const circle = circleRefs.current[index];
      if (circle) {
        const angle = service.rotationOffset - (currentProgress * 360);
        const position = calculatePosition(angle, responsive.radius);
        
        gsap.to(circle, {
          x: position.x,
          y: position.y,
          duration: 0.3,
          ease: "power2.out"
        });

        // Update connecting line
        const line = circle.querySelector('.connecting-line');
        if (line) {
          gsap.to(line, {
            rotation: angle,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    });
  }, [responsive.radius, calculatePosition, rotationProgress]);

  // Initialize animations
  useEffect(() => {
    if (animationInitializedRef.current || !sectionRef.current || !containerRef.current) return;

    animationInitializedRef.current = true;

    // Background image animation
    if (backgroundRef.current) {
      const bgTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(backgroundRef.current, {
            opacity: 0.8,
            duration: 1.5,
            ease: "power2.out"
          });
        }
      });
      scrollTriggersRef.current.push(bgTrigger);
    }

    // Center circle animation
    if (centerCircleRef.current) {
      const centerTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.fromTo(centerCircleRef.current,
            { 
              opacity: 0, 
              scale: 0,
              rotation: 360
            },
            { 
              opacity: 1, 
              scale: 1,
              rotation: 0,
              duration: 1.2,
              ease: "back.out(1.7)"
            }
          );
        }
      });
      scrollTriggersRef.current.push(centerTrigger);
    }

    // Service circles entrance animation
    const entranceTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
        once: true
      }
    });

    // Animate service circles coming in from outside
    services.forEach((service, index) => {
      const circle = circleRefs.current[index];
      if (circle) {
        const radius = responsive.radius;
        
        // Calculate position far outside for start
        const startAngle = service.rotationOffset;
        const startRad = (startAngle * Math.PI) / 180;
        const startPos = {
          x: Math.cos(startRad) * (radius * 2),
          y: Math.sin(startRad) * (radius * 2)
        };
        
        // Set initial position far outside
        gsap.set(circle, {
          x: startPos.x,
          y: startPos.y,
          opacity: 0,
          scale: 0.3,
          rotation: 180
        });

        // Calculate final position
        const finalPos = calculatePosition(service.rotationOffset, radius);

        // Animate to final position
        entranceTimeline.to(circle, {
          x: finalPos.x,
          y: finalPos.y,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          delay: index * 0.1,
          ease: "back.out(1.5)",
          onStart: () => {
            // Start rotation animation after last circle enters
            if (index === services.length - 1) {
              setTimeout(startRotationAnimation, 500);
            }
          }
        }, index * 0.1);
      }
    });

    masterTimelineRef.current = entranceTimeline;

  }, [responsive.radius, calculatePosition]);

  // Update positions when responsive values change
  useEffect(() => {
    if (animationInitializedRef.current) {
      updateCirclePositions();
    }
  }, [responsive.radius, updateCirclePositions]);

  // Start rotation animation
  const startRotationAnimation = useCallback(() => {
    if (rotationTweenRef.current) {
      rotationTweenRef.current.kill();
    }

    // Disable auto-rotation on mobile for better performance
    if (isMobile) return;

    // Create smooth continuous rotation
    rotationTweenRef.current = gsap.to({}, {
      duration: 50,
      repeat: -1,
      ease: "none",
      onUpdate: () => {
        if (rotationTweenRef.current) {
          setRotationProgress(rotationTweenRef.current.progress());
        }
      }
    });
  }, [isMobile]);

  // Handle circle hover
  const handleCircleHover = useCallback((index) => {
    // Don't show hover overlay on mobile
    if (isMobile) return;
    
    setHoveredCircle(index);
    
    const circle = circleRefs.current[index];
    if (circle) {
      gsap.killTweensOf(circle);
      gsap.to(circle, {
        scale: 1.15,
        zIndex: 100,
        duration: 0.3,
        ease: "power2.out"
      });

      // Scale down other circles
      circleRefs.current.forEach((otherCircle, i) => {
        if (i !== index && otherCircle) {
          gsap.killTweensOf(otherCircle);
          gsap.to(otherCircle, {
            scale: 0.9,
            opacity: 0.7,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });

      // Scale up center circle
      if (centerCircleRef.current) {
        gsap.killTweensOf(centerCircleRef.current);
        gsap.to(centerCircleRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      }

      // Pause rotation on hover
      if (rotationTweenRef.current) {
        rotationTweenRef.current.pause();
      }
    }
  }, [isMobile]);

  // Handle circle leave
  const handleCircleLeave = useCallback(() => {
    if (isMobile) return;
    
    setHoveredCircle(null);
    
    circleRefs.current.forEach((circle, index) => {
      if (circle) {
        gsap.killTweensOf(circle);
        gsap.to(circle, {
          scale: 1,
          opacity: 1,
          zIndex: 10,
          duration: 0.4,
          ease: "power3.out"
        });
      }
    });

    if (centerCircleRef.current) {
      gsap.killTweensOf(centerCircleRef.current);
      gsap.to(centerCircleRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power3.out"
      });
    }

    // Resume rotation after hover
    if (rotationTweenRef.current && !isMobile) {
      rotationTweenRef.current.resume();
    }
  }, [isMobile]);

  // Handle circle click
  const handleCircleClick = useCallback((service) => {
    // On mobile, navigate directly without hover state
    if (isMobile) {
      navigate('/services', { 
        state: { 
          selectedService: service.id.toString(),
          serviceName: service.title,
          serviceColor: service.color
        }
      });
    } else {
      // On desktop, show hover effect briefly before navigation
      handleCircleHover(services.findIndex(s => s.id === service.id));
      setTimeout(() => {
        navigate('/services', { 
          state: { 
            selectedService: service.id.toString(),
            serviceName: service.title,
            serviceColor: service.color
          }
        });
      }, 300);
    }
  }, [navigate, isMobile, handleCircleHover]);

  // Handle "Explore" button click
  const handleExploreClick = useCallback((service, e) => {
    e.stopPropagation();
    navigate('/services', { 
      state: { 
        selectedService: service.id.toString(),
        serviceName: service.title,
        serviceColor: service.color
      }
    });
  }, [navigate]);

  // Add circle ref
  const addCircleRef = useCallback((el, index) => {
    if (el && !circleRefs.current.includes(el)) {
      circleRefs.current[index] = el;
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="services"
      className="services-section"
      style={{ 
        padding: '0',
        backgroundColor: theme.beige,
        color: theme.charcoal,
        overflow: 'hidden',
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Background Image with Overlay */}
      <div 
        ref={backgroundRef}
        className="services-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/services-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0,
          zIndex: 1
        }}
      >
        {/* Gradient overlay */}
        <div className="background-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, 
            ${theme.beige} 0%, 
            ${theme.beige}cc 25%, 
            ${theme.beige}99 50%, 
            ${theme.beige}66 75%, 
            ${theme.beige}33 100%)`,
          zIndex: 1
        }} />
      </div>

      {/* Main container for rotating circles */}
      <div 
        ref={containerRef}
        className="services-container"
        style={{
          position: 'relative',
          width: `${responsive.containerSize}px`,
          height: `${responsive.containerSize}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          maxWidth: responsive.isMobile ? '95vw' : '90vw',
          maxHeight: responsive.isMobile ? '95vh' : '90vh',
          transform: 'translateZ(0)',
          margin: '0 auto'
        }}
      >
        {/* Center Circle */}
        <div
          ref={centerCircleRef}
          className="center-circle"
          style={{
            position: 'absolute',
            width: `${responsive.centerSize}px`,
            height: `${responsive.centerSize}px`,
            borderRadius: '50%',
            backgroundColor: theme.charcoal,
            border: `${responsive.isMobile ? '3px' : '4px'} solid ${theme.accent}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            zIndex: 15,
            boxShadow: '0 20px 50px rgba(30, 37, 47, 0.4)',
            transform: 'scale(0)',
            padding: `${Math.min(responsive.centerSize * 0.12, responsive.isMobile ? 12 : 30)}px`,
            cursor: 'default'
          }}
        >
          <h2 className="center-title" style={{
            color: theme.beige,
            fontSize: responsive.fontSize.centerTitle,
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: responsive.isMobile ? '1px' : '2px',
            textAlign: 'center',
            margin: 0,
            fontFamily: "'Cygre', sans-serif",
            lineHeight: 1.1
          }}>
            Our<br />Services
          </h2>
          <div className="center-divider" style={{
            width: `${Math.min(responsive.centerSize * 0.23, responsive.isMobile ? 40 : 60)}px`,
            height: responsive.isMobile ? '3px' : '4px',
            backgroundColor: theme.accent,
            margin: `${Math.min(responsive.centerSize * 0.06, responsive.isMobile ? 8 : 15)}px 0`,
            borderRadius: '2px'
          }} />
          <p className="center-description" style={{
            color: `${theme.beige}cc`,
            fontSize: `${Math.min(responsive.centerSize * 0.035, responsive.isMobile ? 10 : 14)}px`,
            textAlign: 'center',
            margin: 0,
            fontFamily: "'Cygre', sans-serif",
            fontWeight: 300,
            lineHeight: 1.4
          }}>
            Complete woodwork solutions from concept to completion
          </p>
        </div>

        {/* Service Circles */}
        {services.map((service, index) => (
          <div
            key={service.id}
            ref={(el) => addCircleRef(el, index)}
            onClick={() => handleCircleClick(service)}
            onMouseEnter={() => handleCircleHover(index)}
            onMouseLeave={handleCircleLeave}
            className="service-circle"
            style={{
              position: 'absolute',
              width: `${responsive.circleSize}px`,
              height: `${responsive.circleSize}px`,
              borderRadius: '50%',
              backgroundColor: theme.beige,
              border: `${responsive.isMobile ? '2px' : '3px'} solid ${service.color}`,
              cursor: 'pointer',
              zIndex: hoveredCircle === index ? 100 : 10,
              transform: 'translate(0px, 0px)',
              boxShadow: `0 15px 35px ${theme.charcoal}20`,
              overflow: 'hidden',
              opacity: 0,
              scale: 0.3
            }}
          >
            {/* Circle background pattern */}
            <div className="circle-bg" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(/images/wood${11 + index}.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.15,
              filter: 'grayscale(100%) brightness(1.1)'
            }} />
            
            {/* Content container */}
            <div className="circle-content" style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: `${Math.min(responsive.circleSize * 0.12, responsive.isMobile ? 12 : 20)}px`,
              backgroundColor: `${theme.beige}dd`,
              transition: 'all 0.3s ease'
            }}>
              {/* Icon */}
              <div className="circle-icon" style={{
                color: service.color,
                fontSize: `${Math.min(responsive.circleSize * 0.17, responsive.isMobile ? 18 : 24)}px`,
                marginBottom: `${Math.min(responsive.circleSize * 0.08, responsive.isMobile ? 6 : 10)}px`,
                transition: 'all 0.3s ease',
                transform: hoveredCircle === index && !isMobile ? 'scale(1.2) translateY(-8px)' : 'scale(1)'
              }}>
                {getIconComponent(service.icon)}
              </div>

              {/* Title */}
              <h3 className="circle-title" style={{
                color: theme.charcoal,
                fontSize: responsive.fontSize.serviceTitle,
                fontWeight: '700',
                marginBottom: `${Math.min(responsive.circleSize * 0.04, responsive.isMobile ? 4 : 6)}px`,
                textAlign: 'center',
                fontFamily: "'Cygre', sans-serif",
                lineHeight: 1.2,
                transition: 'all 0.3s ease',
                transform: hoveredCircle === index && !isMobile ? 'translateY(-4px)' : 'translateY(0)'
              }}>
                {service.title}
              </h3>

              {/* Short Description - Always visible on mobile, hides on desktop hover */}
              <p className="circle-desc" style={{
                color: `${theme.charcoal}cc`,
                fontSize: `${Math.min(responsive.circleSize * 0.05, responsive.isMobile ? 8 : 10)}px`,
                textAlign: 'center',
                marginBottom: '0',
                fontFamily: "'Cygre', sans-serif",
                fontWeight: 300,
                lineHeight: 1.4,
                opacity: (isMobile || hoveredCircle !== index) ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}>
                {service.shortDesc}
              </p>

              {/* Hover Overlay with Content - Hidden on mobile */}
              {!isMobile && (
                <div className="circle-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: `${theme.charcoal}ee`,
                  color: theme.beige,
                  padding: `${Math.min(responsive.circleSize * 0.14, 18)}px`,
                  opacity: hoveredCircle === index ? 1 : 0,
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: hoveredCircle === index ? 'scale(1)' : 'scale(0.9)'
                }}>
                  <h4 className="overlay-title" style={{
                    fontSize: responsive.fontSize.serviceTitle,
                    fontWeight: '700',
                    marginBottom: `${Math.min(responsive.circleSize * 0.07, 10)}px`,
                    textAlign: 'center',
                    fontFamily: "'Cygre', sans-serif",
                    color: service.color
                  }}>
                    {service.title}
                  </h4>
                  
                  <p className="overlay-description" style={{
                    fontSize: `${Math.min(responsive.circleSize * 0.047, 10)}px`,
                    lineHeight: 1.4,
                    textAlign: 'center',
                    marginBottom: `${Math.min(responsive.circleSize * 0.08, 12)}px`,
                    fontFamily: "'Cygre', sans-serif",
                    fontWeight: 300
                  }}>
                    {service.description}
                  </p>
                  
                  <div className="overlay-features" style={{
                    fontSize: `${Math.min(responsive.circleSize * 0.042, 9)}px`,
                    lineHeight: 1.3,
                    textAlign: 'left',
                    marginBottom: `${Math.min(responsive.circleSize * 0.11, 16)}px`,
                    fontFamily: "'Cygre', sans-serif",
                    fontWeight: 300
                  }}>
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="feature-item" style={{ marginBottom: `${Math.min(responsive.circleSize * 0.03, 5)}px`, display: 'flex', alignItems: 'flex-start' }}>
                        <span className="feature-dot" style={{ 
                          color: service.color, 
                          marginRight: '6px',
                          fontSize: `${Math.min(responsive.circleSize * 0.06, 12)}px`,
                          lineHeight: 1
                        }}>•</span>
                        <span className="feature-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={(e) => handleExploreClick(service, e)}
                    className="explore-button"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      color: theme.beige,
                      fontWeight: '600',
                      fontSize: `${Math.min(responsive.circleSize * 0.047, 10)}px`,
                      padding: `${Math.min(responsive.circleSize * 0.04, 6)}px ${Math.min(responsive.circleSize * 0.11, 16)}px`,
                      borderRadius: '20px',
                      border: `2px solid ${service.color}`,
                      backgroundColor: service.color,
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      fontFamily: "'Cygre', sans-serif"
                    }}
                  >
                    <span>Explore</span>
                    <FaArrowRight size={Math.min(responsive.circleSize * 0.07, 12)} />
                  </button>
                </div>
              )}
            </div>

            {/* Connecting line to center - Thinner on mobile */}
            <div className="connecting-line" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${responsive.radius}px`,
              height: responsive.isMobile ? '1px' : '2px',
              backgroundColor: `${service.color}30`,
              transformOrigin: '0 0',
              zIndex: -1,
              opacity: hoveredCircle === index && !isMobile ? 0.5 : 0.2,
              transition: 'opacity 0.3s ease'
            }} />
          </div>
        ))}
      </div>

      {/* CSS Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Allura&display=swap');
        
        /* Add Cygre font */
        @font-face {
          font-family: 'Cygre';
          font-style: normal;
          font-weight: 300;
          src: url('https://fonts.cdnfonts.com/s/87584/Cygre-Light.woff') format('woff');
        }
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
        
        /* Performance optimizations */
        .services-section {
          contain: layout style paint;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000;
          min-height: 100vh !important;
          overflow: hidden !important;
        }
        
        .services-container {
          transform: translateZ(0);
          will-change: transform;
          contain: layout style paint;
        }
        
        .service-circle {
          transform: translateZ(0);
          will-change: transform, opacity, scale;
          backface-visibility: hidden;
          contain: layout style paint;
        }
        
        .center-circle {
          transform: translateZ(0);
          will-change: transform, scale;
          backface-visibility: hidden;
          contain: layout style paint;
        }
        
        /* Hover effects - Only on desktop */
        @media (min-width: 769px) {
          .service-circle:hover {
            box-shadow: 
              0 25px 50px ${theme.charcoal}40,
              0 0 0 3px ${theme.accent},
              0 0 40px ${theme.accent}50 !important;
          }
          
          .explore-button:hover {
            background-color: ${theme.lightAccent} !important;
            transform: scale(1.05);
          }
        }
        
        /* Pulsing animation for center circle */
        @keyframes centerPulse {
          0%, 100% {
            box-shadow: 0 20px 50px rgba(30, 37, 47, 0.4);
          }
          50% {
            box-shadow: 0 20px 50px rgba(30, 37, 47, 0.6), 0 0 30px ${theme.accent}60;
          }
        }
        
        .center-circle {
          animation: centerPulse 4s infinite ease-in-out;
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
          .services-section {
            padding: 10px !important;
            min-height: 100vh !important;
            overflow: hidden !important;
          }
          
          .services-container {
            width: 450px !important;
            height: 450px !important;
            max-width: 95vw !important;
            max-height: 95vw !important;
            margin: 0 auto !important;
          }
          
          .center-circle {
            width: 120px !important;
            height: 120px !important;
            padding: 12px !important;
          }
          
          .center-title {
            font-size: 1rem !important;
            letter-spacing: 0.8px !important;
          }
          
          .center-description {
            font-size: 0.6rem !important;
            line-height: 1.2 !important;
          }
          
          .service-circle {
            width: 70px !important;
            height: 70px !important;
          }
          
          .circle-overlay {
            display: none !important;
          }
          
          .circle-desc {
            opacity: 1 !important;
            font-size: 0.65rem !important;
            line-height: 1.2 !important;
          }
          
          .circle-title {
            font-size: 0.75rem !important;
            margin-bottom: 3px !important;
          }
          
          .circle-icon {
            font-size: 1.2rem !important;
            margin-bottom: 4px !important;
          }
        }
        
        @media (max-width: 576px) {
          .services-container {
            width: 400px !important;
            height: 400px !important;
          }
          
          .center-circle {
            width: 110px !important;
            height: 110px !important;
          }
          
          .center-title {
            font-size: 0.9rem !important;
          }
          
          .service-circle {
            width: 65px !important;
            height: 65px !important;
          }
          
          .circle-title {
            font-size: 0.7rem !important;
          }
          
          .circle-desc {
            font-size: 0.6rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .services-container {
            width: 350px !important;
            height: 350px !important;
          }
          
          .center-circle {
            width: 100px !important;
            height: 100px !important;
            padding: 10px !important;
          }
          
          .center-title {
            font-size: 0.8rem !important;
          }
          
          .center-description {
            font-size: 0.55rem !important;
          }
          
          .service-circle {
            width: 60px !important;
            height: 60px !important;
          }
          
          .circle-title {
            font-size: 0.65rem !important;
          }
          
          .circle-desc {
            font-size: 0.55rem !important;
          }
          
          .circle-icon {
            font-size: 1rem !important;
          }
        }
        
        @media (max-width: 400px) {
          .services-container {
            width: 320px !important;
            height: 320px !important;
          }
          
          .center-circle {
            width: 90px !important;
            height: 90px !important;
          }
          
          .center-title {
            font-size: 0.75rem !important;
          }
          
          .service-circle {
            width: 55px !important;
            height: 55px !important;
          }
          
          .circle-title {
            font-size: 0.6rem !important;
          }
          
          .circle-desc {
            font-size: 0.5rem !important;
          }
        }
        
        @media (max-width: 360px) {
          .services-container {
            width: 300px !important;
            height: 300px !important;
          }
          
          .center-circle {
            width: 85px !important;
            height: 85px !important;
          }
          
          .service-circle {
            width: 50px !important;
            height: 50px !important;
          }
        }
        
        @media (max-height: 700px) {
          .services-section {
            min-height: 700px !important;
          }
          
          .services-container {
            max-height: 85vh !important;
          }
        }
        
        /* Fix for touch devices */
        @media (hover: none) and (pointer: coarse) {
          .service-circle:hover {
            transform: none !important;
          }
          
          .explore-button:active {
            transform: scale(0.95);
          }
          
          /* Disable hover effects on touch devices */
          .circle-overlay {
            display: none !important;
          }
          
          .circle-desc {
            opacity: 1 !important;
          }
          
          /* Tap highlight color */
          .service-circle:active {
            background-color: ${theme.beige} !important;
            transform: scale(0.95) !important;
          }
        }
        
        /* Fix for iOS Safari */
        @supports (-webkit-touch-callout: none) {
          .services-section {
            min-height: -webkit-fill-available;
          }
        }
        
        /* Smooth transitions */
        .service-circle,
        .center-circle,
        .explore-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Ensure proper stacking */
        .services-section * {
          box-sizing: border-box;
        }
      `}</style>
    </section>
  );
};

export default Services;