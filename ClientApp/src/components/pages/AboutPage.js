import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Move theme outside component to prevent recreation
const theme = {
  dark: '#1e252f',
  light: '#e3e1d7',
  medium: '#8b7355',
  accent: '#a89070'
};

// Static company data - move outside component
const companyData = {
  name: "Comprehensive Woodwork",
  arabicName: "مؤسسة العمل الشامل للمقاولات",
  
  horizontalStats: [
    { number: 2010, label: "Year Established", suffix: "" },
    { number: 2000, label: "Factory Size", suffix: "m²" },
    { number: 43, label: "Expert Team", suffix: "+" },
    { number: 4, label: "Certifications", suffix: "" }
  ],
  
  history: "Founded in 2010 in Jeddah, Comprehensive Woodwork has evolved into a premier provider of high-quality woodwork contracting and interior solutions. With our fully equipped 2000 m² factory, we deliver precision craftsmanship for residential, commercial, and institutional projects across Saudi Arabia.",
  
  overview: "Comprehensive Woodwork (CW) is a specialized woodwork contracting company established in 2010 in Jeddah, Saudi Arabia. Operating from a fully equipped 2000 m² factory, CW delivers tailored woodwork solutions for residential, commercial, hospitality, and institutional projects.\n\nWith ISO-certified quality management systems, advanced production capabilities, and a skilled workforce of over 40 professionals, we ensure exceptional craftsmanship and reliable project execution.\n\nOur expertise spans design, fabrication, finishing, and installation, supported by state-of-the-art machinery including CNC routers, panel saws, and professional finishing equipment.",
  
  certifications: [
    { 
      id: 1,
      name: "ISO 9001:2015", 
      scope: "Quality Management System",
      image: "/images/iso9001.jpg",
      fullImage: "/images/iso9001.jpg"
    },
    { 
      id: 2,
      name: "ISO 14001:2015", 
      scope: "Environmental Management System",
      image: "/images/iso14001.jpg",
      fullImage: "/images/iso14001.jpg"
    },
    { 
      id: 3,
      name: "ISO 45001:2018", 
      scope: "Occupational Health & Safety",
      image: "/images/iso45001.jpg",
      fullImage: "/images/iso45001.jpg"
    },
  ],
  
  expertTeam: [
    {
      id: 1,
      name: "Wissam Ayche",
      position: "General Manager",
      experience: "15+ Years",
      description: "With over 15 years of experience in woodwork fabrication, Ahmed oversees our entire production process ensuring precision and quality in every project. Expert in CNC programming and advanced joinery techniques.",
      skills: ["Woodwork Expertise", "Quality Control", "Team Leadership"],
      color: theme.medium
    },
    {
      id: 2,
      name: "Naif Alharbi",
      position: "Company President",
      experience: "12+ Years",
      description: "Master craftsman specializing in custom furniture and intricate woodwork. Mohammed brings traditional craftsmanship combined with modern techniques to create exceptional pieces.",
      skills: ["Custom Furniture", "Intricate Woodwork", "Traditional Techniques"],
      color: theme.accent
    },
    {
      id: 3,
      name: "Amin Zain",
      position: "Technical Manager",
      experience: "10+ Years",
      description: "Specialist in high-end finishes including lacquers, stains, and protective coatings. Karim ensures every piece meets our stringent quality standards before delivery.",
      skills: ["Finishing Techniques", "Quality Standards", "Surface Treatment"],
      color: theme.medium
    },
    {
      id: 4,
      name: "Mohamad Agha",
      position: "Sales Manager",
      experience: "8+ Years",
      description: "Omar coordinates all project phases from design to installation. His expertise in project management ensures timely delivery and client satisfaction.",
      skills: ["Project Management", "Client Relations", "Team Coordination"],
      color: theme.accent
    },
    {
      id: 5,
      name: "Abdullah Antar",
      position: "Administration Manager",
      experience: "7+ Years",
      description: "ISO-certified quality control specialist who ensures all our work meets international standards and client specifications.",
      skills: ["Quality Control", "ISO Standards", "Client Specifications"],
      color: theme.medium
    },
    {
      id: 6,
      name: "Alaa Mariam",
      position: "Site Officer",
      experience: "7+ Years",
      description: "ISO-certified quality control specialist who ensures all our work meets international standards and client specifications.",
      skills: ["Quality Control", "ISO Standards", "Client Specifications"],
      color: theme.medium
    }
  ]
};

const AboutPage = () => {
  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const [activeTeamMember, setActiveTeamMember] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentGalleryImageIndex, setCurrentGalleryImageIndex] = useState(0);
  
  const statsContainerRef = useRef(null);
  const teamCardRef = useRef(null);
  const sectionsRef = useRef([]);
  const numberElementsRef = useRef([]);
  
  // Use refs for GSAP animations to prevent re-creation
  const animationsInitialized = useRef(false);
  const autoSlideInterval = useRef(null);
  const scrollTriggersRef = useRef([]);
  const numberAnimations = useRef([]);

  // Check for mobile screen size - with debouncing
  useEffect(() => {
    let timeoutId;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 100);
    };
    
    checkMobile();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Cleanup all animations on unmount
  useEffect(() => {
    return () => {
      // Cleanup all GSAP animations
      gsap.killTweensOf("*");
      
      // Cleanup ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      scrollTriggersRef.current.forEach(trigger => {
        if (trigger && trigger.kill) trigger.kill();
      });
      
      // Cleanup auto slide interval
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
      
      // Cleanup number animations
      numberAnimations.current.forEach(anim => {
        if (anim && anim.kill) anim.kill();
      });
      
      // Reset body overflow
      document.body.style.overflow = '';
    };
  }, []);

  // FIXED: Optimized animations initialization
  useEffect(() => {
    if (animationsInitialized.current) return;
    
    const initAnimations = () => {
      // Main title animation
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 80, scale: 0.9 },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out"
          }
        );
      }

      // Section animations with better performance
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const trigger = ScrollTrigger.create({
            trigger: section,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.fromTo(section,
                { opacity: 0, y: 40 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "power2.out"
                }
              );
            }
          });
          
          scrollTriggersRef.current.push(trigger);
        }
      });

      // Horizontal stats animations - FIXED
      if (statsContainerRef.current) {
        const trigger = ScrollTrigger.create({
          trigger: statsContainerRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const statNumbers = statsContainerRef.current.querySelectorAll('.stat-number');
            
            statNumbers.forEach((element, index) => {
              const stat = companyData.horizontalStats[index];
              const targetNumber = stat.number;
              const suffix = stat.suffix;
              
              // Use GSAP counter animation
              const obj = { value: 0 };
              
              const animation = gsap.to(obj, {
                value: targetNumber,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                  const currentValue = Math.floor(obj.value);
                  element.textContent = currentValue + suffix;
                },
                onComplete: () => {
                  // Ensure final value is set
                  element.textContent = targetNumber + suffix;
                }
              });
              
              numberAnimations.current.push(animation);
            });
          }
        });
        
        scrollTriggersRef.current.push(trigger);
      }
    };

    // Use RAF for smoother initialization
    const rafId = requestAnimationFrame(() => {
      initAnimations();
      animationsInitialized.current = true;
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Team auto swipe animation - optimized
  useEffect(() => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }

    if (isMobile) return; // Disable auto-slide on mobile

    const performSwipe = () => {
      if (!teamCardRef.current) return;
      
      gsap.killTweensOf(teamCardRef.current);
      
      gsap.to(teamCardRef.current, {
        x: '-100%',
        opacity: 0,
        rotationY: -30,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          setActiveTeamMember(prev => (prev + 1) % companyData.expertTeam.length);
          
          gsap.set(teamCardRef.current, {
            x: '100%',
            opacity: 0,
            rotationY: 30
          });
          
          gsap.to(teamCardRef.current, {
            x: '0%',
            opacity: 1,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.inOut"
          });
        }
      });
    };

    autoSlideInterval.current = setInterval(performSwipe, 3000);

    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
        autoSlideInterval.current = null;
      }
    };
  }, [isMobile]);

  // Manual team navigation
  const navigateTeamMember = useCallback((direction) => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
      autoSlideInterval.current = null;
    }

    const nextIndex = direction === 'next' 
      ? (activeTeamMember + 1) % companyData.expertTeam.length
      : (activeTeamMember - 1 + companyData.expertTeam.length) % companyData.expertTeam.length;

    if (teamCardRef.current) {
      gsap.killTweensOf(teamCardRef.current);
      
      gsap.to(teamCardRef.current, {
        x: direction === 'next' ? '-100%' : '100%',
        opacity: 0,
        rotationY: direction === 'next' ? -30 : 30,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          setActiveTeamMember(nextIndex);
          
          gsap.set(teamCardRef.current, {
            x: direction === 'next' ? '100%' : '-100%',
            opacity: 0,
            rotationY: direction === 'next' ? 30 : -30
          });
          
          gsap.to(teamCardRef.current, {
            x: '0%',
            opacity: 1,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.inOut"
          });
        }
      });
    } else {
      setActiveTeamMember(nextIndex);
    }
  }, [activeTeamMember]);

  const handleCertificateClick = useCallback((certificate) => {
    setSelectedCertificate(certificate);
    setCurrentGalleryImageIndex(0); // Reset to first image
  }, []);

  const closeFullImage = useCallback(() => {
    setSelectedCertificate(null);
    setCurrentGalleryImageIndex(0);
  }, []);

  const nextGalleryImage = useCallback(() => {
    if (selectedCertificate && selectedCertificate.gallery) {
      setCurrentGalleryImageIndex(prev => 
        prev === selectedCertificate.gallery.length - 1 ? 0 : prev + 1
      );
    }
  }, [selectedCertificate]);

  const prevGalleryImage = useCallback(() => {
    if (selectedCertificate && selectedCertificate.gallery) {
      setCurrentGalleryImageIndex(prev => 
        prev === 0 ? selectedCertificate.gallery.length - 1 : prev - 1
      );
    }
  }, [selectedCertificate]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedCertificate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedCertificate]);

  // Helper function to add section refs
  const addToSectionsRefs = useCallback((el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  }, []);

  return (
    <div 
      ref={pageRef} 
      className="about-page"
      style={{ 
        backgroundColor: theme.light, 
        color: theme.dark, 
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden'
      }}
    >
      {/* Background Pattern - CSS gradient instead of image */}
      <div 
        className="background-pattern"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(45deg, 
            ${theme.light} 0%, 
            transparent 20%, 
            transparent 80%, 
            ${theme.light} 100%),
            repeating-linear-gradient(45deg, 
              transparent 0px, 
              transparent 10px, 
              ${theme.medium}05 10px, 
              ${theme.medium}05 20px)`,
          opacity: 0.05,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        {/* Hero Section */}
        <section className="hero-section" style={{
          padding: isMobile ? '80px 20px 40px' : '120px 20px 80px',
          textAlign: 'center'
        }}>
          <div className="hero-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="hero-content" style={{ marginBottom: isMobile ? '30px' : '50px' }}>
              {/* Logo instead of Arabic name - Centered and larger */}
              <div className="logo-container" style={{
                marginBottom: isMobile ? '30px' : '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img 
                  src="/images/cw-logo2.png" 
                  alt="CW Woodworks" 
                  style={{ 
                    width: isMobile ? '450px' : '650px', // INCREASED SIZE HERE - You can change these values
                    height: 'auto',
                  }} 
                />
              </div>
              
              <div className="title-divider" style={{
                height: '3px',
                width: isMobile ? '100px' : '150px',
                background: `linear-gradient(90deg, transparent, ${theme.medium}, transparent)`,
                margin: isMobile ? '20px auto' : '30px auto',
                borderRadius: '2px'
              }} />
              
              <p className="history-text" style={{
                fontSize: isMobile ? '1rem' : '1.4rem',
                color: `${theme.dark}cc`,
                maxWidth: '800px',
                margin: `0 auto ${isMobile ? '30px' : '50px'}`,
                lineHeight: 1.6,
                fontFamily: "'Cygre', sans-serif",
                fontWeight: 300
              }}>
                {companyData.history}
              </p>
            </div>
          </div>
        </section>

        {/* Company Overview & Portrait Image Section */}
        <section ref={addToSectionsRefs} className="overview-section" style={{ padding: isMobile ? '30px 20px' : '60px 20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="overview-grid" style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '30px' : '60px',
              alignItems: 'center'
            }}>
              {/* Left Column: Company Overview */}
              <div className="overview-content">
                <h2 className="section-title" style={{
                  fontSize: isMobile ? '1.8rem' : '2.5rem',
                  fontWeight: '800',
                  color: theme.dark,
                  marginBottom: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontFamily: "'Cygre', sans-serif",
                  textAlign: 'left' // Align to left as requested
                }}>
                  <span style={{ color: theme.medium }}>Company</span> Overview
                </h2>
                
                <div className="overview-text" style={{
                  color: `${theme.dark}cc`,
                  fontSize: isMobile ? '0.9rem' : '1.1rem',
                  lineHeight: 1.7,
                  marginBottom: '30px',
                  fontFamily: "'Cygre', sans-serif",
                  fontWeight: 300
                }}>
                  {companyData.overview.split('\n\n').map((paragraph, index) => (
                    <p key={index} style={{ marginBottom: '20px' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right Column: Large Portrait Image */}
              <div className="portrait-container" style={{
                position: 'relative',
                height: isMobile ? '500px' : '600px'
              }}>
                <div className="portrait-frame" style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: `4px solid ${theme.medium}40`,
                  boxShadow: `0 30px 60px ${theme.dark}15`
                }}>
                  <div className="portrait-image" style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/images/aboutus.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'sepia(0.3) brightness(1.1) contrast(1.05)'
                  }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal Stats Section */}
        <section 
          ref={addToSectionsRefs}
          className="stats-section"
          style={{ 
            padding: isMobile ? '70px 20px' : '100px 20px',
            background: theme.dark
          }}
        >
          <div 
            ref={statsContainerRef}
            className="stats-container"
            style={{ 
              maxWidth: '1200px', 
              margin: '0 auto'
            }}
          >
            <div className="stats-grid" style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: isMobile ? '40px 20px' : '20px',
              alignItems: 'center'
            }}>
              {companyData.horizontalStats.map((stat, index) => (
                <div 
                  key={index}
                  className="stat-item"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  <div 
                    className="stat-number"
                    data-value={stat.number}
                    style={{
                      fontSize: isMobile ? '3.5rem' : '5rem',
                      fontWeight: '900',
                      color: theme.medium,
                      marginBottom: '10px',
                      fontFamily: "'Cygre', sans-serif",
                      textShadow: `0 0 30px ${theme.medium}40`,
                      lineHeight: 1,
                      minHeight: isMobile ? '70px' : '90px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {stat.number}
                    {stat.suffix && (
                      <span style={{ 
                        fontSize: isMobile ? '2rem' : '2.5rem',
                        marginLeft: '5px'
                      }}>
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  
                  <div className="stat-label" style={{
                    fontSize: isMobile ? '1rem' : '1.2rem',
                    color: theme.light,
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontFamily: "'Cygre', sans-serif",
                    position: 'relative',
                    padding: '10px 0'
                  }}>
                    {stat.label}
                    <div className="stat-underline" style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '40px',
                      height: '3px',
                      background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
                      borderRadius: '2px'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expert Team Section */}
        <section 
          ref={addToSectionsRefs}
          className="team-section"
          style={{ 
            padding: isMobile ? '40px 20px' : '80px 20px',
            background: `${theme.dark}08`
          }}
        >
          <div className="team-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="team-header" style={{
              textAlign: 'center',
              marginBottom: isMobile ? '40px' : '60px'
            }}>
              <h2 className="section-title" style={{
                fontSize: isMobile ? '1.8rem' : '2.5rem',
                fontWeight: '800',
                color: theme.dark,
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: "'Cygre', sans-serif"
              }}>
                Our <span style={{ color: theme.medium }}>Expert Team</span>
              </h2>
              <p className="team-subtitle" style={{
                fontSize: isMobile ? '1rem' : '1.2rem',
                color: `${theme.dark}cc`,
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.6,
                fontFamily: "'Cygre', sans-serif",
                fontWeight: 300
              }}>
                Meet the skilled professionals behind our exceptional craftsmanship
              </p>
            </div>

            <div className="team-grid" style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '30px' : '50px',
              alignItems: 'center'
            }}>
              {/* Left Column: Single Card with Auto Swipe */}
              <div className="team-card-container" style={{
                position: 'relative',
                height: isMobile ? '400px' : '500px',
                overflow: 'hidden'
              }}>
                <div 
                  ref={teamCardRef}
                  className="team-card"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    maxWidth: isMobile ? '320px' : '420px',
                    height: isMobile ? '350px' : '450px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: `3px solid ${theme.medium}`,
                    backgroundColor: theme.light,
                    boxShadow: `0 25px 50px ${theme.dark}30`,
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="team-card-image" style={{
                    width: '100%',
                    height: '70%',
                    background: `linear-gradient(135deg, ${theme.medium}25, ${theme.light})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isMobile ? '5rem' : '7rem',
                    color: theme.medium,
                    fontWeight: 'bold',
                    fontFamily: "'Cygre', sans-serif"
                  }}>
                    {companyData.expertTeam[activeTeamMember].name.charAt(0)}
                  </div>
                  
                  <div className="team-card-content" style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: theme.light,
                    padding: isMobile ? '20px' : '30px',
                    textAlign: 'center',
                    borderTop: `3px solid ${theme.medium}30`
                  }}>
                    <div className="team-card-name" style={{
                      fontSize: isMobile ? '1.4rem' : '1.8rem',
                      fontWeight: '700',
                      color: theme.dark,
                      marginBottom: '8px',
                      fontFamily: "'Cygre', sans-serif"
                    }}>
                      {companyData.expertTeam[activeTeamMember].name}
                    </div>
                    <div className="team-card-position" style={{
                      fontSize: isMobile ? '1rem' : '1.2rem',
                      color: theme.medium,
                      fontWeight: '600',
                      fontFamily: "'Cygre', sans-serif"
                    }}>
                      {companyData.expertTeam[activeTeamMember].position}
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="team-navigation" style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '20px',
                  zIndex: 10
                }}>
                  <button
                    onClick={() => navigateTeamMember('prev')}
                    className="nav-button"
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      border: `2px solid ${theme.medium}`,
                      backgroundColor: theme.light,
                      color: theme.medium,
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      boxShadow: `0 5px 15px ${theme.dark}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                  >
                    ←
                  </button>
                  
                  <button
                    onClick={() => navigateTeamMember('next')}
                    className="nav-button"
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      border: `2px solid ${theme.medium}`,
                      backgroundColor: theme.light,
                      color: theme.medium,
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      boxShadow: `0 5px 15px ${theme.dark}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Right Column: Team Member Details */}
              <div className="team-details" style={{
                backgroundColor: theme.light,
                padding: isMobile ? '25px' : '40px',
                borderRadius: '20px',
                border: `3px solid ${theme.medium}30`,
                minHeight: isMobile ? '400px' : '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: `0 20px 40px ${theme.dark}10`
              }}>
                <div className="team-member-header" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '15px' : '25px',
                  marginBottom: isMobile ? '20px' : '30px'
                }}>
                  <div className="team-avatar" style={{
                    width: isMobile ? '70px' : '90px',
                    height: isMobile ? '70px' : '90px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${theme.medium}, ${theme.accent})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isMobile ? '2rem' : '2.5rem',
                    color: theme.light,
                    fontWeight: 'bold',
                    fontFamily: "'Cygre', sans-serif",
                    flexShrink: 0,
                    boxShadow: `0 15px 30px ${theme.medium}30`
                  }}>
                    {companyData.expertTeam[activeTeamMember].name.charAt(0)}
                  </div>
                  <div className="team-member-info">
                    <h3 className="team-member-name" style={{
                      fontSize: isMobile ? '1.5rem' : '2rem',
                      fontWeight: '800',
                      color: theme.dark,
                      marginBottom: '8px',
                      fontFamily: "'Cygre', sans-serif"
                    }}>
                      {companyData.expertTeam[activeTeamMember].name}
                    </h3>
                    <div className="team-member-meta" style={{
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: isMobile ? 'flex-start' : 'center',
                      gap: isMobile ? '10px' : '25px'
                    }}>
                      <div className="team-member-position" style={{
                        fontSize: isMobile ? '1rem' : '1.3rem',
                        color: theme.medium,
                        fontWeight: '700',
                        fontFamily: "'Cygre', sans-serif"
                      }}>
                        {companyData.expertTeam[activeTeamMember].position}
                      </div>
                      <div className="team-member-experience" style={{
                        padding: isMobile ? '8px 15px' : '10px 20px',
                        backgroundColor: `${theme.medium}25`,
                        color: theme.medium,
                        borderRadius: '25px',
                        fontSize: isMobile ? '0.9rem' : '1.1rem',
                        fontWeight: '600',
                        fontFamily: "'Cygre', sans-serif",
                        alignSelf: 'flex-start',
                        border: `2px solid ${theme.medium}40`
                      }}>
                        {companyData.expertTeam[activeTeamMember].experience}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="team-member-description" style={{
                  fontSize: isMobile ? '1rem' : '1.3rem',
                  lineHeight: 1.7,
                  color: `${theme.dark}cc`,
                  marginBottom: isMobile ? '25px' : '35px',
                  fontFamily: "'Cygre', sans-serif",
                  fontWeight: 300
                }}>
                  {companyData.expertTeam[activeTeamMember].description}
                </p>

                <div className="team-skills" style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  {companyData.expertTeam[activeTeamMember].skills.map((skill, index) => (
                    <div
                      key={index}
                      className="skill-tag"
                      style={{
                        padding: isMobile ? '8px 16px' : '10px 20px',
                        backgroundColor: `${theme.medium}20`,
                        color: theme.medium,
                        borderRadius: '25px',
                        fontSize: isMobile ? '0.85rem' : '1rem',
                        fontWeight: '600',
                        fontFamily: "'Cygre', sans-serif",
                        border: `2px solid ${theme.medium}35`
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section ref={addToSectionsRefs} className="certifications-section" style={{ padding: isMobile ? '40px 20px' : '60px 20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="certifications-header" style={{
              textAlign: 'center',
              marginBottom: isMobile ? '40px' : '60px'
            }}>
              <h2 className="section-title" style={{
                fontSize: isMobile ? '1.8rem' : '2.5rem',
                fontWeight: '800',
                color: theme.dark,
                marginBottom: isMobile ? '12px' : '20px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: "'Cygre', sans-serif"
              }}>
                Certifications & <span style={{ color: theme.medium }}>Standards</span>
              </h2>
              <p className="certifications-subtitle" style={{
                fontSize: isMobile ? '0.9rem' : '1.2rem',
                color: `${theme.dark}cc`,
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.6,
                fontFamily: "'Cygre', sans-serif",
                fontWeight: 300
              }}>
                {companyData.certifications.length} Certifications | Click on any certificate to view
              </p>
            </div>

            <div className="certifications-grid" style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px'
            }}>
              {companyData.certifications.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => handleCertificateClick(cert)}
                  className="certification-card"
                  style={{
                    backgroundColor: theme.light,
                    borderRadius: '15px',
                    border: `2px solid ${theme.medium}20`,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: `0 10px 25px ${theme.dark}05`,
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div className="certification-image" style={{
                    height: '200px',
                    background: `linear-gradient(135deg, ${theme.medium}15, ${theme.light})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={cert.image} 
                      alt={cert.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.9
                      }}
                    />
                    <div className="cert-badge" style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      padding: '6px 12px',
                      backgroundColor: `${theme.medium}90`,
                      color: theme.light,
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      fontFamily: "'Cygre', sans-serif",
                      backdropFilter: 'blur(5px)'
                    }}>
                      {cert.gallery ? 'Gallery View' : 'Click to View'}
                    </div>
                  </div>

                  <div className="certification-content" style={{ 
                    padding: isMobile ? '20px' : '25px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <h3 className="certification-name" style={{
                      fontSize: isMobile ? '1.1rem' : '1.4rem',
                      fontWeight: '700',
                      color: theme.dark,
                      marginBottom: '12px',
                      lineHeight: 1.3,
                      fontFamily: "'Cygre', sans-serif",
                      flex: 1
                    }}>
                      {cert.name}
                    </h3>
                    
                    {cert.scope && (
                      <p className="certification-scope" style={{
                        color: `${theme.dark}cc`,
                        fontSize: isMobile ? '0.85rem' : '1rem',
                        lineHeight: 1.5,
                        marginBottom: '15px',
                        fontFamily: "'Cygre', sans-serif",
                        fontWeight: 300
                      }}>
                        {cert.scope}
                      </p>
                    )}
                    
                    {cert.authority && (
                      <div className="certification-authority" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 15px',
                        backgroundColor: `${theme.medium}10`,
                        borderRadius: '10px',
                        marginTop: 'auto'
                      }}>
                        <div className="authority-dot" style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: theme.medium
                        }} />
                        <span className="authority-text" style={{
                          color: theme.medium,
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          fontFamily: "'Cygre', sans-serif"
                        }}>
                          Issued by: {cert.authority}
                        </span>
                      </div>
                    )}
                    
                    {cert.gallery && (
                      <div className="gallery-indicator" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        marginTop: '15px'
                      }}>
                        {[1, 2].map((_, index) => (
                          <div 
                            key={index}
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: index === 0 ? theme.medium : `${theme.medium}40`
                            }}
                          />
                        ))}
                        <span style={{
                          marginLeft: '8px',
                          fontSize: '0.8rem',
                          color: theme.medium,
                          fontWeight: '600',
                          fontFamily: "'Cygre', sans-serif"
                        }}>
                          {cert.gallery.length} pages
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Certificate Modal with Gallery Support */}
      {selectedCertificate && (
        <div 
          className="certificate-modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(30, 37, 47, 0.98)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div className="modal-container" style={{
            position: 'relative',
            maxWidth: '90%',
            maxHeight: '90%',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Close Button */}
            <button
              onClick={closeFullImage}
              className="modal-close"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: theme.light,
                fontSize: '2rem',
                cursor: 'pointer',
                padding: '10px',
                zIndex: 10000,
                backgroundColor: 'rgba(30, 37, 47, 0.7)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>

            {/* Gallery Navigation Buttons */}
            {selectedCertificate.gallery && selectedCertificate.gallery.length > 1 && (
              <>
                <button
                  onClick={prevGalleryImage}
                  className="gallery-nav prev"
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: theme.light,
                    fontSize: '2rem',
                    cursor: 'pointer',
                    padding: '10px',
                    zIndex: 10000,
                    backgroundColor: 'rgba(30, 37, 47, 0.7)',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ←
                </button>
                <button
                  onClick={nextGalleryImage}
                  className="gallery-nav next"
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: theme.light,
                    fontSize: '2rem',
                    cursor: 'pointer',
                    padding: '10px',
                    zIndex: 10000,
                    backgroundColor: 'rgba(30, 37, 47, 0.7)',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  →
                </button>
                
                {/* Gallery Indicator */}
                <div className="gallery-indicator" style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '10px',
                  zIndex: 10000
                }}>
                  {selectedCertificate.gallery.map((_, index) => (
                    <div 
                      key={index}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: index === currentGalleryImageIndex ? theme.medium : theme.light,
                        opacity: index === currentGalleryImageIndex ? 1 : 0.5,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => setCurrentGalleryImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Modal Content */}
            <div className="modal-content" style={{
              backgroundColor: theme.light,
              padding: '20px',
              borderRadius: '10px',
              maxWidth: '100%',
              maxHeight: '100%',
              overflow: 'auto',
              border: `2px solid ${theme.medium}30`,
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Certificate Image */}
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto'
              }}>
                <img
                  src={selectedCertificate.gallery 
                    ? selectedCertificate.gallery[currentGalleryImageIndex] 
                    : selectedCertificate.fullImage || selectedCertificate.image
                  }
                  alt={selectedCertificate.name}
                  className="certificate-image"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    height: 'auto',
                    borderRadius: '5px',
                    border: `1px solid ${theme.dark}10`,
                    objectFit: 'contain'
                  }}
                />
              </div>
              
              {/* Certificate Info */}
              <div className="certificate-info" style={{ 
                textAlign: 'center', 
                marginTop: '20px',
                color: theme.dark,
                padding: '20px',
                backgroundColor: `${theme.medium}10`,
                borderRadius: '8px'
              }}>
                <h3 className="certificate-title" style={{ 
                  fontSize: isMobile ? '1.2rem' : '1.5rem', 
                  fontWeight: '700',
                  marginBottom: '10px',
                  fontFamily: "'Cygre', sans-serif"
                }}>
                  {selectedCertificate.name}
                </h3>
                {selectedCertificate.scope && (
                  <p className="certificate-description" style={{ 
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    color: `${theme.dark}cc`,
                    marginBottom: '10px',
                    fontFamily: "'Cygre', sans-serif"
                  }}>
                    {selectedCertificate.scope}
                  </p>
                )}
                {selectedCertificate.authority && (
                  <p className="certificate-authority" style={{ 
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    color: theme.medium,
                    fontWeight: '600',
                    fontFamily: "'Cygre', sans-serif"
                  }}>
                    Issued by: {selectedCertificate.authority}
                  </p>
                )}
                {selectedCertificate.gallery && (
                  <p className="gallery-info" style={{ 
                    fontSize: '0.9rem',
                    color: `${theme.dark}cc`,
                    marginTop: '10px',
                    fontFamily: "'Cygre', sans-serif"
                  }}>
                    Page {currentGalleryImageIndex + 1} of {selectedCertificate.gallery.length}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS */}
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/cygre');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }
        
        body {
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Performance optimizations */
        .about-page {
          contain: layout style paint;
        }
        
        section {
          contain: layout style paint;
          will-change: transform;
        }
        
        /* Stats number animation fix */
        .stat-number {
          will-change: contents;
        }
        
        /* Button hover effects */
        .nav-button:hover {
          background-color: ${theme.medium} !important;
          color: ${theme.light} !important;
          transform: scale(1.1);
        }
        
        .certification-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 20px 40px ${theme.dark}15 !important;
          border-color: ${theme.medium}40 !important;
        }
        
        .modal-close:hover,
        .gallery-nav:hover {
          background-color: ${theme.medium} !important;
          transform: scale(1.1);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${theme.light};
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${theme.medium}50;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${theme.medium}70;
        }
        
        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          .main-title {
            font-size: 2rem !important;
          }
          
          .section-title {
            font-size: 1.8rem !important;
          }
          
          .portrait-container {
            height: 400px !important;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 30px 20px !important;
          }
          
          .stat-number {
            font-size: 3rem !important;
            min-height: 60px !important;
          }
          
          .team-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          .team-card {
            max-width: 280px !important;
            height: 300px !important;
          }
          
          .team-details {
            min-height: 350px !important;
            padding: 20px !important;
          }
          
          .certifications-grid {
            grid-template-columns: 1fr !important;
          }
          
          .certification-image {
            height: 180px !important;
          }
          
          .modal-close,
          .gallery-nav {
            width: 40px !important;
            height: 40px !important;
            font-size: 1.5rem !important;
          }
          
          .gallery-nav.prev {
            left: 10px !important;
          }
          
          .gallery-nav.next {
            right: 10px !important;
          }
        }
        
        @media (max-width: 480px) {
          .main-title {
            font-size: 1.6rem !important;
          }
          
          .section-title {
            font-size: 1.4rem !important;
          }
          
          .portrait-container {
            height: 300px !important;
          }
          
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          .stat-number {
            font-size: 2.5rem !important;
          }
          
          .team-card {
            max-width: 250px !important;
            height: 280px !important;
          }
        }
        
        /* Fix for iOS Safari */
        @supports (-webkit-touch-callout: none) {
          .about-page {
            min-height: -webkit-fill-available;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;