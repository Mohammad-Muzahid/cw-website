import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const titleRef = useRef(null);
  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
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
      number: '01',
      title: 'Design & Consultation',
      subtitle: 'Crafting Your Vision',
      description: 'We transform your ideas into detailed technical drawings with precision. Our design team collaborates closely with you to create custom solutions that perfectly balance aesthetics and functionality.',
      image: '/images/design.jpeg',
      features: [
        'Custom Design Concepts',
        'Technical Drawings & Blueprints',
        '3D Visualizations',
        'Material Selection Guidance',
        'Project Planning & Scheduling',
        'Client Collaboration Sessions'
      ],
      stats: [
        { value: '450+', label: 'Projects Designed' },
        { value: '99.8%', label: 'Design Accuracy' },
        { value: '15+', label: 'Years Experience' }
      ]
    },
    {
      id: 2,
      number: '02',
      title: 'Precision Fabrication',
      subtitle: 'Master Craftsmanship',
      description: 'In our 2000 m² facility, master craftsmen and advanced CNC technology work in harmony to create exceptional woodwork with unparalleled precision and quality.',
      image: '/images/fabrication.jpeg',
      features: [
        'CNC Precision Machining',
        'Custom Joinery & Inlay Work',
        'Solid Wood Construction',
        'Veneer Application & Lamination',
        'Advanced Panel Processing',
        'Multiple Quality Inspections'
      ],
      stats: [
        { value: '2000 m²', label: 'Production Facility' },
        { value: '25+', label: 'Master Craftsmen' },
        { value: '±0.1mm', label: 'Tolerance Level' }
      ]
    },
    {
      id: 3,
      number: '03',
      title: 'Finishing Excellence',
      subtitle: 'The Perfect Finish',
      description: 'Our finishing department applies premium coatings that enhance natural beauty while providing long-lasting protection against wear, humidity, and UV exposure.',
      image: '/images/finishing.jpeg',
      features: [
        '50+ Premium Finish Options',
        'UV & Humidity Protection',
        'Custom Color Matching',
        'Hand-Rubbed Finishes',
        'Specialized Treatments',
        'Multiple Layer Application'
      ],
      stats: [
        { value: 'A+ Grade', label: 'Finish Quality' },
        { value: '10+ Years', label: 'Durability' },
        { value: '50+', label: 'Finish Options' }
      ]
    },
    {
      id: 4,
      number: '04',
      title: 'Professional Installation',
      subtitle: 'Flawless Implementation',
      description: 'Our certified installation teams ensure perfect fit and function with meticulous attention to detail, handling everything from site preparation to final adjustments.',
      image: '/images/installation.jpeg',
      features: [
        'Site Preparation & Protection',
        'Precision Fitting & Alignment',
        'Seamless Integration',
        'Final Adjustments & Calibration',
        'Thorough Site Cleanup',
        'Client Walkthrough & Training'
      ],
      stats: [
        { value: '8+ Teams', label: 'Installation Crews' },
        { value: '100%', label: 'Success Rate' },
        { value: '99%', label: 'Client Satisfaction' }
      ]
    },
    {
      id: 5,
      number: '05',
      title: 'Project Management',
      subtitle: 'End-to-End Coordination',
      description: 'Comprehensive oversight ensuring your project stays on schedule, within budget, and meets all quality standards from concept to completion.',
      image: '/images/management.jpeg',
      features: [
        'Timeline & Schedule Management',
        'Budget Control & Reporting',
        'Quality Assurance Monitoring',
        'Regular Client Communication',
        'Vendor & Contractor Coordination',
        'Risk Management & Problem Solving'
      ],
      stats: [
        { value: '98.5%', label: 'On-Time Delivery' },
        { value: '99%', label: 'Budget Adherence' },
        { value: '85%', label: 'Repeat Clients' }
      ]
    }
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: "power3.out"
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        scale: 0.8,
        rotationY: 30,
        duration: 1.8,
        delay: 0.3,
        ease: "power3.out"
      });

      // Service sections animations
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;

        const imageContainer = section.querySelector('.image-container');
        const contentContainer = section.querySelector('.content-container');
        const serviceNumber = section.querySelector('.service-number');
        const serviceTitle = section.querySelector('.service-title');
        const serviceSubtitle = section.querySelector('.service-subtitle');
        const serviceDescription = section.querySelector('.service-description');

        // Initial state - everything centered
        gsap.set(imageContainer, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          rotation: 0
        });

        gsap.set(contentContainer, {
          opacity: 0,
          scale: 0.8,
          rotationY: 30
        });

        // Different animation for mobile
        if (isMobile) {
          // Mobile animation - stacked layout
          ScrollTrigger.create({
            trigger: section,
            start: "top 70%",
            end: "bottom 30%",
            onEnter: () => animateMobileSection(section),
            onLeaveBack: () => resetMobileSection(section)
          });
        } else {
          // Desktop animation - split layout
          ScrollTrigger.create({
            trigger: section,
            start: "top 70%",
            end: "bottom 30%",
            onEnter: () => animateSectionIn(section, index),
            onLeaveBack: () => resetSection(section, index),
            onEnterBack: () => animateSectionIn(section, index)
          });
        }

        // Common animations for both
        gsap.from(serviceNumber, {
          opacity: 0,
          scale: 0,
          rotation: 180,
          duration: 1.5,
          ease: "back.out(2.5)",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });

        gsap.from([serviceTitle, serviceSubtitle], {
          opacity: 0,
          y: 30,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });

        gsap.from(serviceDescription, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Desktop animation
  const animateSectionIn = (section, index) => {
    const imageContainer = section.querySelector('.image-container');
    const contentContainer = section.querySelector('.content-container');
    const isEven = index % 2 === 0;

    // Adjust distances based on screen size
    const screenWidth = window.innerWidth;
    let imageDistance = '30vw';
    let contentDistance = '25vw';

    if (screenWidth < 1400) {
      imageDistance = '25vw';
      contentDistance = '30vw';
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut", duration: 1.5 }
    });

    tl.to(imageContainer, {
      x: isEven ? `-${imageDistance}` : imageDistance,
      scale: 0.85,
      rotation: isEven ? -2 : 2,
      duration: 1.8,
      ease: "expo.out"
    }, 0)
    
    .to(contentContainer, {
      opacity: 1,
      x: isEven ? contentDistance : `-${contentDistance}`,
      scale: 1,
      rotationY: 0,
      duration: 2,
      ease: "expo.out"
    }, 0.3);
  };

  const resetSection = (section, index) => {
    const imageContainer = section.querySelector('.image-container');
    const contentContainer = section.querySelector('.content-container');
    const isEven = index % 2 === 0;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1 }
    });

    tl.to(imageContainer, {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0
    })
    .to(contentContainer, {
      opacity: 0,
      x: isEven ? '-35vw' : '35vw',
      scale: 0.8,
      rotationY: isEven ? 30 : -30
    }, 0);
  };

  // Mobile animation
  const animateMobileSection = (section) => {
    const imageContainer = section.querySelector('.image-container');
    const contentContainer = section.querySelector('.content-container');

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1 }
    });

    tl.to(imageContainer, {
      scale: 0.9,
      y: -50,
      duration: 1.2
    }, 0)
    .to(contentContainer, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationY: 0,
      duration: 1.2
    }, 0.2);
  };

  const resetMobileSection = (section) => {
    const imageContainer = section.querySelector('.image-container');
    const contentContainer = section.querySelector('.content-container');

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 }
    });

    tl.to(imageContainer, {
      scale: 1,
      y: 0
    })
    .to(contentContainer, {
      opacity: 0,
      y: 30,
      scale: 0.9,
      rotationY: 20
    }, 0);
  };

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // Get appropriate sizes based on device
  const getImageSize = () => {
    if (isMobile) {
      return {
        width: '85vw',
        height: '50vh',
        maxWidth: '400px',
        maxHeight: '400px'
      };
    } else if (window.innerWidth < 1400) {
      return {
        width: '60vh',
        height: '80vh',
        maxWidth: '600px',
        maxHeight: '700px'
      };
    } else {
      return {
        width: '70vh',
        height: '90vh',
        maxWidth: '700px',
        maxHeight: '800px'
      };
    }
  };

  const getContentWidth = () => {
    if (isMobile) {
      return '90vw';
    } else if (window.innerWidth < 1400) {
      return '45vw';
    } else {
      return '40vw';
    }
  };

  const imageSize = getImageSize();
  const contentWidth = getContentWidth();

  return (
    <div 
      ref={containerRef}
      style={{
        backgroundColor: theme.beige,
        color: theme.charcoal,
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        width: '100%'
      }}
    >
      {/* Hero Section */}
      <section 
        ref={heroRef}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: isMobile ? '20px' : '40px',
          overflow: 'hidden'
        }}
      >
        {/* Animated background elements - only on desktop */}
        {!isMobile && (
          <>
            <div style={{
              position: 'absolute',
              top: '10%',
              left: '5%',
              width: '400px',
              height: '400px',
              background: `radial-gradient(circle, ${theme.accent}10 0%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(40px)',
              animation: 'float 20s infinite ease-in-out'
            }} />
            
            <div style={{
              position: 'absolute',
              bottom: '15%',
              right: '8%',
              width: '300px',
              height: '300px',
              background: `radial-gradient(circle, ${theme.lightAccent}10 0%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(30px)',
              animation: 'float 25s infinite ease-in-out reverse'
            }} />
          </>
        )}

        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '1200px',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '10px' : '20px',
            marginBottom: isMobile ? '20px' : '40px'
          }}>
            <div style={{
              width: isMobile ? '40px' : '80px',
              height: '3px',
              background: `linear-gradient(to right, transparent, ${theme.accent})`,
              borderRadius: '2px'
            }} />
            <span style={{
              color: theme.accent,
              fontSize: isMobile ? '0.8rem' : '1.1rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: isMobile ? '2px' : '4px',
              fontFamily: "'Cygre', sans-serif"
            }}>
              Professional Services
            </span>
            <div style={{
              width: isMobile ? '40px' : '80px',
              height: '3px',
              background: `linear-gradient(to left, transparent, ${theme.accent})`,
              borderRadius: '2px'
            }} />
          </div>

          <h1
            ref={titleRef}
            style={{
              fontSize: isMobile ? '2.5rem' : window.innerWidth < 1400 ? '4rem' : '6rem',
              fontWeight: '700',
              color: theme.charcoal,
              lineHeight: 1.1,
              marginBottom: isMobile ? '20px' : '40px',
              fontFamily: "'Cygre', sans-serif",
              textTransform: 'uppercase',
              padding: isMobile ? '0 10px' : '0'
            }}
          >
            Craftsmanship
            <br />
            <span style={{ 
              color: theme.accent,
              fontWeight: '300',
              display: 'block',
              fontSize: isMobile ? '0.6em' : '0.7em',
              marginTop: isMobile ? '10px' : '20px'
            }}>
              Through Every Stage
            </span>
          </h1>

          <p style={{
            fontSize: isMobile ? '1rem' : '1.4rem',
            color: `${theme.charcoal}cc`,
            maxWidth: '900px',
            margin: `0 auto ${isMobile ? '30px' : '60px'}`,
            lineHeight: 1.6,
            fontFamily: "'Cygre', sans-serif",
            fontWeight: 300,
            padding: isMobile ? '0 15px' : '0'
          }}>
            From initial concept to final installation, our comprehensive woodworking 
            services deliver precision, quality, and attention to detail at every step.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '20px' : '60px',
            flexWrap: 'wrap',
            padding: isMobile ? '0 10px' : '0'
          }}>
            {[
              { value: '450+', label: 'Projects' },
              { value: '15+', label: 'Years' },
              { value: '2000 m²', label: 'Facility' },
              { value: '99.8%', label: 'Satisfaction' }
            ].map((stat, index) => (
              <div key={index} style={{ 
                textAlign: 'center',
                minWidth: isMobile ? '80px' : 'auto'
              }}>
                <div style={{
                  fontSize: isMobile ? '1.8rem' : '3rem',
                  fontWeight: '700',
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.lightAccent})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '5px',
                  fontFamily: "'Cygre', sans-serif"
                }}>
                  {stat.value}
                </div>
                <div style={{
                  color: `${theme.charcoal}aa`,
                  fontSize: isMobile ? '0.7rem' : '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: isMobile ? '1px' : '2px',
                  fontFamily: "'Cygre', sans-serif",
                  lineHeight: 1.2
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Sections */}
      <div style={{ position: 'relative' }}>
        {services.map((service, index) => (
          <section
            key={service.id}
            ref={addToRefs}
            style={{
              height: isMobile ? 'auto' : '100vh',
              minHeight: isMobile ? '100vh' : '100vh',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: isMobile ? '60px 20px' : '0',
              flexDirection: isMobile ? 'column' : 'row'
            }}
          >
            {/* Background Pattern - lighter on mobile */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231e252f' fill-opacity='${isMobile ? '0.005' : '0.01'}' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              opacity: 0.5,
              zIndex: 0
            }} />

            {/* Image Container */}
            <div 
              className="image-container"
              style={{
                position: isMobile ? 'relative' : 'absolute',
                width: imageSize.width,
                height: imageSize.height,
                maxWidth: imageSize.maxWidth,
                maxHeight: imageSize.maxHeight,
                borderRadius: '10px',
                overflow: 'hidden',
                zIndex: 2,
                willChange: 'transform',
                boxShadow: `0 ${isMobile ? '20px' : '50px'} ${isMobile ? '40px' : '100px'} ${theme.charcoal}${isMobile ? '20' : '40'}`,
                border: `1px solid ${theme.accent}30`,
                marginBottom: isMobile ? '30px' : '0'
              }}
            >
              <img 
                src={service.image}
                alt={service.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(1.05) contrast(1.05)'
                }}
              />
              
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, 
                  ${theme.accent}10 0%, 
                  transparent 30%,
                  transparent 70%,
                  ${theme.charcoal}05 100%)`
              }} />
            </div>

            {/* Content Container */}
            <div 
              className="content-container"
              style={{
                position: isMobile ? 'relative' : 'absolute',
                width: contentWidth,
                maxWidth: isMobile ? '600px' : '600px',
                zIndex: 3,
                opacity: isMobile ? 1 : 0,
                willChange: 'transform, opacity',
                backdropFilter: isMobile ? 'none' : 'blur(10px)',
                backgroundColor: isMobile ? 'transparent' : 'transparent',
                marginTop: isMobile ? '20px' : '0',
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              {/* Service Number */}
              <div 
                className="service-number"
                style={{
                  fontSize: isMobile ? '6rem' : window.innerWidth < 1400 ? '10rem' : '15rem',
                  fontWeight: '700',
                  color: `${theme.accent}${isMobile ? '05' : '08'}`,
                  position: 'absolute',
                  top: isMobile ? '-2rem' : '-4rem',
                  left: !isMobile && index % 2 === 0 ? '-2rem' : 'auto',
                  right: !isMobile && index % 2 === 0 ? 'auto' : '-2rem',
                  fontFamily: "'Cygre', sans-serif",
                  lineHeight: 1,
                  zIndex: -1,
                  width: '100%',
                  textAlign: isMobile ? 'center' : (index % 2 === 0 ? 'left' : 'right')
                }}
              >
                {service.number}
              </div>

              {/* Service Title & Subtitle */}
              <div style={{ 
                marginBottom: isMobile ? '25px' : '40px', 
                position: 'relative',
                zIndex: 1 
              }}>
                <h2 
                  className="service-title"
                  style={{
                    fontSize: isMobile ? '1.8rem' : window.innerWidth < 1400 ? '2.5rem' : '3rem',
                    fontWeight: '700',
                    color: theme.charcoal,
                    marginBottom: isMobile ? '10px' : '15px',
                    fontFamily: "'Cygre', sans-serif",
                    textTransform: 'uppercase',
                    lineHeight: 1.1
                  }}
                >
                  {service.title}
                </h2>
                <div 
                  className="service-subtitle"
                  style={{
                    color: theme.accent,
                    fontSize: isMobile ? '1rem' : '1.3rem',
                    fontWeight: '600',
                    marginBottom: isMobile ? '20px' : '30px',
                    fontFamily: "'Cygre', sans-serif",
                    textTransform: 'uppercase',
                    letterSpacing: isMobile ? '2px' : '3px'
                  }}
                >
                  {service.subtitle}
                </div>
                <p 
                  className="service-description"
                  style={{
                    color: `${theme.charcoal}cc`,
                    fontSize: isMobile ? '0.95rem' : '1.1rem',
                    lineHeight: 1.6,
                    fontFamily: "'Cygre', sans-serif",
                    fontWeight: 300
                  }}
                >
                  {service.description}
                </p>
              </div>

              {/* Features List */}
              <div style={{ marginBottom: isMobile ? '30px' : '50px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                  gap: isMobile ? '15px' : '20px'
                }}>
                  {service.features.map((feature, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: isMobile ? '10px' : '15px'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: theme.accent,
                        marginTop: isMobile ? '8px' : '10px',
                        flexShrink: 0
                      }} />
                      <span style={{
                        color: theme.charcoal,
                        fontSize: isMobile ? '0.85rem' : '0.95rem',
                        lineHeight: 1.5,
                        fontFamily: "'Cygre', sans-serif",
                        fontWeight: 300,
                        textAlign: 'left'
                      }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div style={{
                display: 'flex',
                gap: isMobile ? '20px' : '40px',
                paddingTop: isMobile ? '20px' : '30px',
                borderTop: `2px solid ${theme.accent}20`,
                justifyContent: isMobile ? 'space-around' : 'flex-start'
              }}>
                {service.stats.map((stat, idx) => (
                  <div key={idx} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: isMobile ? '1.5rem' : '2.5rem',
                      fontWeight: '700',
                      background: `linear-gradient(135deg, ${theme.accent}, ${theme.lightAccent})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      marginBottom: '5px',
                      fontFamily: "'Cygre', sans-serif"
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      color: `${theme.charcoal}aa`,
                      fontSize: isMobile ? '0.7rem' : '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: isMobile ? '1px' : '2px',
                      fontFamily: "'Cygre', sans-serif",
                      lineHeight: 1.2
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll Indicator - only on desktop */}
            {!isMobile && (
              <div style={{
                position: 'absolute',
                bottom: '50px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '60px',
                  height: '2px',
                  backgroundColor: `${theme.accent}40`,
                  borderRadius: '1px'
                }} />
                <span style={{
                  color: theme.accent,
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontFamily: "'Cygre', sans-serif"
                }}>
                  Scroll
                </span>
                <div style={{
                  width: '60px',
                  height: '2px',
                  backgroundColor: `${theme.accent}40`,
                  borderRadius: '1px'
                }} />
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Final CTA */}
      <section style={{
        minHeight: isMobile ? '80vh' : '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: isMobile ? '40px 20px' : '40px',
        backgroundColor: theme.charcoal,
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/wood16.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isMobile ? 0.03 : 0.05,
          filter: 'grayscale(100%)'
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '800px',
          width: '100%'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '4rem',
            fontWeight: '700',
            color: theme.beige,
            marginBottom: isMobile ? '25px' : '40px',
            fontFamily: "'Cygre', sans-serif",
            textTransform: 'uppercase',
            lineHeight: 1.1,
            padding: isMobile ? '0 10px' : '0'
          }}>
            Begin Your
            <br />
            <span style={{ 
              color: theme.accent,
              fontWeight: '300',
              fontSize: isMobile ? '0.7em' : '0.8em',
              display: 'block',
              marginTop: isMobile ? '10px' : '20px'
            }}>
              Craftsmanship Journey
            </span>
          </h2>
          
          <p style={{
            fontSize: isMobile ? '1rem' : '1.3rem',
            color: `${theme.beige}cc`,
            lineHeight: 1.6,
            marginBottom: isMobile ? '40px' : '60px',
            fontFamily: "'Cygre', sans-serif",
            fontWeight: 300,
            padding: isMobile ? '0 15px' : '0'
          }}>
            Contact us to discuss your vision and discover how our master craftsmen 
            can transform your ideas into exceptional woodworking creations.
          </p>

          <a
            href="/contact"
            style={{
              backgroundColor: 'transparent',
              color: theme.accent,
              padding: isMobile ? '16px 30px' : '20px 50px',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontFamily: "'Cygre', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: isMobile ? '1px' : '2px',
              transition: 'all 0.4s ease',
              border: `3px solid ${theme.accent}`,
              position: 'relative',
              overflow: 'hidden',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.backgroundColor = theme.accent;
                e.currentTarget.style.color = theme.charcoal;
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = `0 25px 50px ${theme.accent}40`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = theme.accent;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
            onTouchStart={(e) => {
              if (isMobile) {
                e.currentTarget.style.backgroundColor = theme.accent;
                e.currentTarget.style.color = theme.charcoal;
              }
            }}
            onTouchEnd={(e) => {
              if (isMobile) {
                setTimeout(() => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = theme.accent;
                }, 200);
              }
            }}
          >
            Start Your Project
          </a>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
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

        /* Keyframes */
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Fix body overflow */
        body {
          overflow-x: hidden;
          width: 100%;
        }

        /* Custom scrollbar - only on desktop */
        @media (min-width: 768px) {
          ::-webkit-scrollbar {
            width: 10px;
          }

          ::-webkit-scrollbar-track {
            background: ${theme.beige};
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, ${theme.accent}, ${theme.lightAccent});
            border-radius: 5px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: ${theme.lightAccent};
          }
        }

        /* Mobile-specific fixes */
        @media (max-width: 768px) {
          /* Disable complex animations on mobile */
          .service-section {
            animation: none !important;
          }
          
          /* Improve touch targets */
          a, button {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Prevent text size adjustment */
          * {
            -webkit-text-size-adjust: 100%;
            text-size-adjust: 100%;
          }
          
          /* Improve performance on mobile */
          .image-container, .content-container {
            will-change: auto !important;
            transform: translateZ(0);
          }
        }

        /* Fix for very small screens */
        @media (max-width: 360px) {
          h1 {
            font-size: 2rem !important;
          }
          
          .service-title {
            font-size: 1.5rem !important;
          }
          
          .hero-stats > div {
            min-width: 70px !important;
          }
        }

        /* Fix for tablet screens */
        @media (min-width: 769px) and (max-width: 1024px) {
          .image-container {
            width: 50vh !important;
            height: 60vh !important;
          }
          
          .content-container {
            width: 50vw !important;
          }
          
          .service-number {
            font-size: 8rem !important;
          }
        }

        /* Fix for mid-size desktop screens */
        @media (min-width: 1025px) and (max-width: 1400px) {
          .image-container {
            width: 55vh !important;
            height: 70vh !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;