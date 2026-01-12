import React, { useEffect, useRef, useState } from 'react';
import { FaTimes, FaArrowLeft, FaArrowRight, FaExternalLinkAlt, FaExpand } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const safeRequire = (path) => {
  try {
    return require(`../../assets/${path}`);
  } catch (error) {
    console.warn(`Image not found: ${path}`);
    return null;
  }
};

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const OngoingProjects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  // Updated color theme
  const theme = {
    charcoal: '#1e252f',
    beige: '#e3e1d7',
    accent: '#8b7355',
    lightAccent: '#a89070',
    white: '#ffffff'
  };

  // Ongoing projects data
  const projects = [
    {
      id: 1,
      title: "Al-Salama Hospital Expansion",
      client: "Ministry of Health",
      description: "We are currently delivering the complete joinery and woodwork package for the new expansion wing of Al-Salama Hospital. The project includes custom patient room cabinets, nurse stations, reception areas, and specialized medical storage units.",
      fullDescription: "We are currently delivering the complete joinery and woodwork package for the new expansion wing of Al-Salama Hospital. The scope includes:\n\n• Custom patient room cabinets with antimicrobial finishes\n• Nurse stations with integrated technology panels\n• Reception and waiting area furniture\n• Specialized medical storage units with precise compartmentalization\n• Doctor's offices and consultation rooms\n• Corridor wall claddings and directional signage\n\nAll works are being fabricated using moisture-resistant materials with hospital-grade finishes that meet strict hygiene standards.",
      image: safeRequire('ams1.jpg'),
      gallery: [
        safeRequire('ams1.jpg'),
        safeRequire('ams2.jpg'),
        safeRequire('ams3.jpg'),
        safeRequire('ams4.jpg'),
        safeRequire('ams5.jpg')
      ],
      services: [
        "Custom medical joinery fabrication",
        "Antimicrobial finishes application",
        "Precision installation",
        "Coordination with MEP contractors",
        "Hospital-grade material sourcing"
      ],
      category: "Healthcare",
      status: "In Progress",
      completion: "85%",
      expectedCompletion: "Q2 2024"
    },
    {
      id: 2,
      title: "King Fahd Cultural Center",
      client: "Ministry of Culture",
      description: "We are executing the premium woodwork package for the main auditorium and VIP lounges at the King Fahd Cultural Center. The project features intricate arabesque patterns, custom acoustic wall panels, and luxury seating integration.",
      fullDescription: "We are executing the premium woodwork package for the main auditorium and VIP lounges at the King Fahd Cultural Center. Key features include:\n\n• Intricate arabesque patterns using CNC routing technology\n• Custom acoustic wall panels for optimal sound quality\n• Luxury seating integration with hidden storage compartments\n• VIP lounge areas with bespoke furniture\n• Reception desks with integrated lighting\n• Decorative ceiling elements with traditional Islamic geometry\n\nThis project represents a blend of traditional craftsmanship with modern fabrication techniques.",
      image: safeRequire('bat12.JPEG'),
      gallery: [
        safeRequire('bat12.JPEG'),
        safeRequire('bat13.JPEG'),
        safeRequire('bat14.JPEG'),
        safeRequire('bat15.JPEG'),
        safeRequire('bat16.JPEG')
      ],
      services: [
        "CNC routing for intricate patterns",
        "Acoustic panel fabrication",
        "Luxury furniture production",
        "Traditional Islamic geometry implementation",
        "Precision installation"
      ],
      category: "Cultural",
      status: "In Progress",
      completion: "70%",
      expectedCompletion: "Q3 2024"
    },
    {
      id: 3,
      title: "Corporate Headquarters - FinTech Company",
      client: "Saudi FinTech Solutions",
      description: "Modern office fit-out for a leading financial technology company featuring smart storage solutions, collaborative workspaces, and executive areas with premium finishes.",
      fullDescription: "We are delivering a complete modern office fit-out for a leading financial technology company. The project includes:\n\n• Smart storage solutions with integrated technology charging\n• Collaborative workspace pods with acoustic privacy features\n• Executive areas with premium walnut veneer finishes\n• Reception area featuring custom-designed reception desk\n• Meeting rooms with advanced presentation systems\n• Breakout areas and coffee stations\n• Executive boardroom with integrated multimedia systems\n\nAll elements are designed to promote productivity while maintaining a luxurious corporate aesthetic.",
      image: safeRequire('bupa1.JPEG'),
      gallery: [
        safeRequire('bupa1.JPEG'),
        safeRequire('bupa2.JPEG'),
        safeRequire('bupa3.JPEG'),
        safeRequire('bupa4.JPEG'),
        safeRequire('bupa5.JPEG')
      ],
      services: [
        "Complete office fit-out",
        "Smart storage solutions",
        "Acoustic workspace pods",
        "Premium veneer finishes",
        "Technology integration"
      ],
      category: "Corporate",
      status: "In Progress",
      completion: "90%",
      expectedCompletion: "Q1 2024"
    }
  ];

  // Use setTimeout to avoid synchronous state update
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Main title animation
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Subtitle animation
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMounted]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setActiveGalleryImage(0);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setFullscreenImage(null);
    document.body.style.overflow = 'auto';
  };

  const handleOpenGallery = () => {
    setGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setGalleryOpen(false);
    setFullscreenImage(null);
  };

  const navigateGallery = (direction) => {
    if (!selectedProject) return;
    
    const totalImages = selectedProject.gallery.length;
    if (direction === 'next') {
      setActiveGalleryImage((prev) => (prev + 1) % totalImages);
    } else {
      setActiveGalleryImage((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  const handleOpenFullscreen = (imageSrc, index) => {
    setFullscreenImage({ src: imageSrc, index });
    setActiveGalleryImage(index);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  const navigateFullscreen = (direction) => {
    if (!selectedProject || !fullscreenImage) return;
    
    const totalImages = selectedProject.gallery.length;
    if (direction === 'next') {
      const nextIndex = (fullscreenImage.index + 1) % totalImages;
      setFullscreenImage({ src: selectedProject.gallery[nextIndex], index: nextIndex });
      setActiveGalleryImage(nextIndex);
    } else {
      const prevIndex = (fullscreenImage.index - 1 + totalImages) % totalImages;
      setFullscreenImage({ src: selectedProject.gallery[prevIndex], index: prevIndex });
      setActiveGalleryImage(prevIndex);
    }
  };

  const handleBackClick = () => {
    window.location.href = '/';
  };

  // Function to render description with line breaks
  const renderDescription = (description) => {
    return description.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < description.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  if (!isMounted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: theme.beige,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.charcoal
      }}>
        <p>Loading Ongoing Projects...</p>
      </div>
    );
  }

  return (
    <div 
      ref={sectionRef}
      id="ongoing-projects"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: theme.beige,
        color: theme.charcoal,
        padding: '0 20px'
      }}
    >
      {/* Background Image with Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/images/projects-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.8,
        zIndex: 1
      }}>
        {/* Gradient overlay */}
        <div style={{
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

      {/* Main Container */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        padding: '40px 0'
      }}>
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          style={{
            color: theme.accent,
            marginBottom: '40px',
            fontWeight: '600',
            border: `2px solid ${theme.accent}40`,
            backgroundColor: theme.beige,
            padding: '12px 24px',
            borderRadius: '25px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: "'Cygre', sans-serif",
            transition: 'all 0.3s ease',
            boxShadow: `0 5px 15px ${theme.charcoal}10`,
            fontSize: '1rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.accent;
            e.currentTarget.style.color = theme.beige;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 8px 20px ${theme.accent}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.beige;
            e.currentTarget.style.color = theme.accent;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 5px 15px ${theme.charcoal}10`;
          }}
        >
          <FaArrowLeft /> Back to Home
        </button>

        {/* Main Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1
            ref={titleRef}
            style={{
              fontWeight: '900',
              color: theme.charcoal,
              marginBottom: '20px',
              fontSize: '3.5rem',
              fontFamily: "'Cygre', sans-serif",
              letterSpacing: '-0.03em',
              lineHeight: '1.1',
              textTransform: 'uppercase'
            }}
          >
            CURRENT <span style={{ color: theme.accent }}>PROJECTS</span>
          </h1>
          <p
            ref={subtitleRef}
            style={{
              color: `${theme.charcoal}cc`,
              maxWidth: '600px',
              margin: '0 auto',
              fontSize: '1.2rem',
              lineHeight: '1.6',
              fontFamily: "'Cygre', sans-serif",
              fontWeight: '300'
            }}
          >
            Projects currently in progress - showcasing our ongoing craftsmanship and dedication
          </p>
        </div>

        {/* Projects Grid - 3 squares per row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px',
          marginBottom: '80px'
        }}>
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                position: 'relative',
                aspectRatio: '1/1',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `0 10px 30px ${theme.charcoal}15`,
                border: `2px solid ${theme.accent}20`
              }}
              onClick={() => handleProjectClick(project)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${theme.accent}30`;
                e.currentTarget.style.border = `2px solid ${theme.accent}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 10px 30px ${theme.charcoal}15`;
                e.currentTarget.style.border = `2px solid ${theme.accent}20`;
              }}
            >
              {/* Project Image */}
              <div
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

              {/* Hover Overlay with Title and Button */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(0deg, rgba(30, 37, 47, 0.9) 0%, rgba(30, 37, 47, 0.7) 40%, transparent 100%)`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '30px',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
              >
                <h3
                  style={{
                    color: theme.beige,
                    fontWeight: '700',
                    fontSize: '1.5rem',
                    marginBottom: '15px',
                    fontFamily: "'Cygre', sans-serif",
                    lineHeight: '1.2'
                  }}
                >
                  {project.title}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '10px'
                  }}
                >
                  <span
                    style={{
                      color: theme.accent,
                      fontWeight: '600',
                      fontSize: '0.85rem',
                      fontFamily: "'Cygre', sans-serif",
                      padding: '8px 16px',
                      backgroundColor: `${theme.beige}20`,
                      borderRadius: '20px',
                      border: `1px solid ${theme.accent}40`
                    }}
                  >
                    {project.category}
                  </span>
                  <span
                    style={{
                      color: theme.lightAccent,
                      fontWeight: '600',
                      fontSize: '0.85rem',
                      fontFamily: "'Cygre', sans-serif",
                      padding: '8px 16px',
                      backgroundColor: `${theme.lightAccent}20`,
                      borderRadius: '20px',
                      border: `1px solid ${theme.lightAccent}40`
                    }}
                  >
                    {project.completion} Complete
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '20px',
                    color: theme.beige,
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    fontFamily: "'Cygre', sans-serif",
                    opacity: 0.9,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <FaExternalLinkAlt />
                  <span>View Project Details</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div style={{
          textAlign: 'center',
          padding: '40px 0',
          borderTop: `2px solid ${theme.accent}20`,
          marginTop: '40px'
        }}>
          <p style={{
            color: `${theme.charcoal}cc`,
            fontSize: '1rem',
            fontFamily: "'Cygre', sans-serif",
            fontWeight: '300',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            We are committed to delivering exceptional quality on all our ongoing projects. Each project receives our dedicated attention from start to completion.
          </p>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(30, 37, 47, 0.95)',
            zIndex: 1000,
            overflowY: 'auto',
            padding: '40px 20px'
          }}
        >
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            background: theme.beige,
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: `0 30px 60px rgba(0,0,0,0.4)`,
            position: 'relative'
          }}>
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '25px',
                right: '25px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: theme.accent,
                color: theme.beige,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                transition: 'all 0.3s ease',
                fontSize: '1.2rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme.charcoal;
                e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = theme.accent;
                e.currentTarget.style.transform = 'rotate(0) scale(1)';
              }}
            >
              <FaTimes />
            </button>

            {/* Modal Content */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              minHeight: '80vh'
            }}>
              {/* Left Column - Gallery */}
              <div style={{
                position: 'relative',
                minHeight: '600px',
                backgroundImage: `url(${selectedProject.gallery[activeGalleryImage]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}>
                {/* Gallery Navigation */}
                <button
                  onClick={() => navigateGallery('prev')}
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: `${theme.beige}dd`,
                    color: theme.accent,
                    border: `2px solid ${theme.accent}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    fontSize: '1.1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme.accent;
                    e.currentTarget.style.color = theme.beige;
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${theme.beige}dd`;
                    e.currentTarget.style.color = theme.accent;
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                  }}
                >
                  <FaArrowLeft />
                </button>

                <button
                  onClick={() => navigateGallery('next')}
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: `${theme.beige}dd`,
                    color: theme.accent,
                    border: `2px solid ${theme.accent}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    fontSize: '1.1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme.accent;
                    e.currentTarget.style.color = theme.beige;
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${theme.beige}dd`;
                    e.currentTarget.style.color = theme.accent;
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                  }}
                >
                  <FaArrowRight />
                </button>

                {/* Gallery Indicator */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: `${theme.charcoal}dd`,
                  color: theme.beige,
                  padding: '8px 20px',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  fontFamily: "'Cygre', sans-serif"
                }}>
                  {activeGalleryImage + 1} / {selectedProject.gallery.length}
                </div>

                {/* View Gallery Button */}
                <button
                  onClick={handleOpenGallery}
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    background: theme.accent,
                    color: theme.beige,
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontFamily: "'Cygre', sans-serif",
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme.charcoal;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = theme.accent;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  View Full Gallery
                </button>
              </div>

              {/* Right Column - Project Details */}
              <div style={{
                padding: '50px',
                overflowY: 'auto'
              }}>
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{
                    color: theme.accent,
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    letterSpacing: '0.1em',
                    marginBottom: '10px',
                    fontFamily: "'Cygre', sans-serif",
                    textTransform: 'uppercase'
                  }}>
                    PROJECT DETAILS
                  </h3>
                  <h2 style={{
                    fontWeight: '900',
                    color: theme.charcoal,
                    fontSize: '2.5rem',
                    fontFamily: "'Cygre', sans-serif",
                    lineHeight: '1.1',
                    marginBottom: '15px',
                    textTransform: 'uppercase'
                  }}>
                    {selectedProject.title}
                  </h2>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    flexWrap: 'wrap',
                    marginBottom: '25px'
                  }}>
                    <span style={{
                      background: `${theme.accent}20`,
                      color: theme.accent,
                      padding: '8px 20px',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      fontFamily: "'Cygre', sans-serif",
                      border: `1px solid ${theme.accent}40`
                    }}>
                      {selectedProject.category}
                    </span>
                    <span style={{
                      background: `${theme.lightAccent}20`,
                      color: theme.lightAccent,
                      padding: '8px 20px',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      fontFamily: "'Cygre', sans-serif",
                      border: `1px solid ${theme.lightAccent}40`
                    }}>
                      {selectedProject.status} - {selectedProject.completion}
                    </span>
                    <span style={{
                      color: `${theme.charcoal}cc`,
                      fontSize: '1rem',
                      fontFamily: "'Cygre', sans-serif"
                    }}>
                      Expected: {selectedProject.expectedCompletion}
                    </span>
                  </div>
                </div>

                <div style={{ marginBottom: '40px' }}>
                  <h4 style={{
                    color: theme.accent,
                    fontWeight: '700',
                    fontSize: '1rem',
                    marginBottom: '15px',
                    fontFamily: "'Cygre', sans-serif"
                  }}>
                    CLIENT
                  </h4>
                  <p style={{
                    color: theme.charcoal,
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    fontFamily: "'Cygre', sans-serif",
                    marginBottom: '30px'
                  }}>
                    {selectedProject.client}
                  </p>

                  <h4 style={{
                    color: theme.accent,
                    fontWeight: '700',
                    fontSize: '1rem',
                    marginBottom: '15px',
                    fontFamily: "'Cygre', sans-serif"
                  }}>
                    PROJECT DESCRIPTION
                  </h4>
                  <p style={{
                    color: `${theme.charcoal}cc`,
                    lineHeight: '1.8',
                    fontSize: '1rem',
                    fontFamily: "'Cygre', sans-serif",
                    fontWeight: '300',
                    marginBottom: '30px'
                  }}>
                    {renderDescription(selectedProject.fullDescription)}
                  </p>

                  <h4 style={{
                    color: theme.accent,
                    fontWeight: '700',
                    fontSize: '1rem',
                    marginBottom: '15px',
                    fontFamily: "'Cygre', sans-serif"
                  }}>
                    SERVICES PROVIDED
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '15px',
                    marginBottom: '40px'
                  }}>
                    {selectedProject.services.map((service, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: theme.accent
                        }} />
                        <span style={{
                          color: `${theme.charcoal}cc`,
                          fontSize: '0.9rem',
                          fontFamily: "'Cygre', sans-serif",
                          fontWeight: '300'
                        }}>
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <h4 style={{
                    color: theme.accent,
                    fontWeight: '700',
                    fontSize: '1rem',
                    marginBottom: '15px',
                    fontFamily: "'Cygre', sans-serif"
                  }}>
                    PROJECT PROGRESS
                  </h4>
                  <div style={{
                    width: '100%',
                    backgroundColor: `${theme.charcoal}20`,
                    borderRadius: '10px',
                    height: '10px',
                    marginBottom: '10px'
                  }}>
                    <div style={{
                      width: selectedProject.completion,
                      backgroundColor: theme.accent,
                      height: '100%',
                      borderRadius: '10px',
                      transition: 'width 1s ease-in-out'
                    }} />
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: `${theme.charcoal}cc`,
                    fontSize: '0.9rem',
                    fontFamily: "'Cygre', sans-serif"
                  }}>
                    <span>Progress: {selectedProject.completion}</span>
                    <span>Target: {selectedProject.expectedCompletion}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Gallery Modal - PROPER LAYOUT */}
      {galleryOpen && selectedProject && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(30, 37, 47, 0.98)',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            padding: '40px',
            overflow: 'hidden'
          }}
        >
          {/* Gallery Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            flexShrink: 0
          }}>
            <h2 style={{
              color: theme.beige,
              fontWeight: '900',
              fontSize: '2rem',
              fontFamily: "'Cygre', sans-serif",
              margin: 0
            }}>
              {selectedProject.title} - Gallery
            </h2>
            <button
              onClick={handleCloseGallery}
              style={{
                background: theme.accent,
                color: theme.beige,
                border: 'none',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.2rem',
                transition: 'all 0.3s ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme.beige;
                e.currentTarget.style.color = theme.accent;
                e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = theme.accent;
                e.currentTarget.style.color = theme.beige;
                e.currentTarget.style.transform = 'rotate(0) scale(1)';
              }}
            >
              <FaTimes />
            </button>
          </div>

          {/* Gallery Container with Fixed Grid */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            paddingBottom: '20px'
          }}>
            {/* Gallery Grid - PROPER SEPARATED ROWS */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)', // 4 images per row
              gridAutoRows: 'minmax(200px, auto)', // Fixed row height
              gap: '15px',
              width: '100%'
            }}>
              {selectedProject.gallery.map((image, index) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '200px', // Fixed height for all images
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    transition: 'all 0.3s ease',
                    border: `2px solid ${index === activeGalleryImage ? theme.accent : 'transparent'}`
                  }}
                  onClick={() => handleOpenFullscreen(image, index)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.querySelector('.expand-overlay').style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.querySelector('.expand-overlay').style.opacity = '0';
                  }}
                >
                  {/* Expand Icon Overlay */}
                  <div
                    className="expand-overlay"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(30, 37, 47, 0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    <FaExpand style={{ color: theme.beige, fontSize: '2rem' }} />
                  </div>
                  
                  {/* Image Number Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: theme.accent,
                    color: theme.beige,
                    width: '25px',
                    height: '25px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    fontFamily: "'Cygre', sans-serif"
                  }}>
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseFullscreen}
            style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: theme.accent,
              color: theme.beige,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease',
              zIndex: 3001
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.beige;
              e.currentTarget.style.color = theme.accent;
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.accent;
              e.currentTarget.style.color = theme.beige;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FaTimes />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigateFullscreen('prev')}
            style={{
              position: 'absolute',
              left: '30px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: `${theme.beige}dd`,
              color: theme.accent,
              border: `2px solid ${theme.accent}`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease',
              zIndex: 3001
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.accent;
              e.currentTarget.style.color = theme.beige;
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${theme.beige}dd`;
              e.currentTarget.style.color = theme.accent;
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <FaArrowLeft />
          </button>

          <button
            onClick={() => navigateFullscreen('next')}
            style={{
              position: 'absolute',
              right: '30px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: `${theme.beige}dd`,
              color: theme.accent,
              border: `2px solid ${theme.accent}`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease',
              zIndex: 3001
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.accent;
              e.currentTarget.style.color = theme.beige;
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${theme.beige}dd`;
              e.currentTarget.style.color = theme.accent;
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <FaArrowRight />
          </button>

          {/* Image Counter */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: `${theme.charcoal}dd`,
            color: theme.beige,
            padding: '10px 25px',
            borderRadius: '25px',
            fontSize: '1rem',
            fontWeight: '600',
            fontFamily: "'Cygre', sans-serif",
            zIndex: 3001
          }}>
            {fullscreenImage.index + 1} / {selectedProject.gallery.length}
          </div>

          {/* Fullscreen Image */}
          <img
            src={fullscreenImage.src}
            alt="Fullscreen"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: '10px',
              boxShadow: `0 20px 40px rgba(0,0,0,0.5)`
            }}
          />
        </div>
      )}

      {/* Custom CSS */}
      <style>{`
        /* Import Cygre font */
        @import url('https://fonts.cdnfonts.com/css/cygre');
        
        /* Responsive styles for Gallery Section */
        @media (max-width: 1400px) {
          /* Gallery Grid for large desktops */
          div[style*="z-index: 2000"] > div:last-child > div {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        
        @media (max-width: 1200px) {
          #ongoing-projects > div:last-child {
            max-width: 1000px;
          }
          
          #ongoing-projects h1 {
            font-size: 3rem !important;
          }
          
          /* Gallery Grid for medium desktop */
          div[style*="z-index: 2000"] > div:last-child > div {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 12px !important;
          }
          
          div[style*="z-index: 2000"] > div:last-child > div > div {
            height: 180px !important;
          }
          
          /* Project grid */
          #ongoing-projects > div:last-child > div:nth-child(3) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 992px) {
          #ongoing-projects > div:last-child {
            max-width: 800px;
          }
          
          #ongoing-projects h1 {
            font-size: 2.5rem !important;
          }
          
          /* Modal responsive */
          div[style*="position: fixed"][style*="z-index: 1000"] > div {
            grid-template-columns: 1fr !important;
          }
          
          /* Gallery Grid for tablets */
          div[style*="z-index: 2000"] > div:last-child > div {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 15px !important;
          }
          
          div[style*="z-index: 2000"] > div:last-child > div > div {
            height: 200px !important;
          }
        }
        
        @media (max-width: 768px) {
          #ongoing-projects {
            padding: 0 15px !important;
          }
          
          #ongoing-projects > div:last-child {
            padding: 20px 0 !important;
          }
          
          #ongoing-projects h1 {
            font-size: 2.2rem !important;
          }
          
          #ongoing-projects > div:last-child > div:nth-child(3) {
            gap: 20px !important;
          }
          
          button[style*="Back to Home"] {
            margin-bottom: 30px !important;
            padding: 10px 20px !important;
            font-size: 0.9rem !important;
          }
          
          /* Gallery modal for small tablets */
          div[style*="z-index: 2000"] {
            padding: 20px !important;
          }
          
          div[style*="z-index: 2000"] > div:last-child > div {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          
          div[style*="z-index: 2000"] > div:last-child > div > div {
            height: 160px !important;
          }
          
          /* Fullscreen modal responsive */
          div[style*="z-index: 3000"] {
            padding: 20px !important;
          }
          
          button[style*="z-index: 3001"][style*="left: 30px"] {
            left: 15px !important;
          }
          
          button[style*="z-index: 3001"][style*="right: 30px"] {
            right: 15px !important;
          }
        }
        
        @media (max-width: 576px) {
          #ongoing-projects h1 {
            font-size: 2rem !important;
          }
          
          #ongoing-projects > div:last-child > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
          
          #ongoing-projects p {
            font-size: 1rem !important;
            padding: 0 10px !important;
          }
          
          /* Modal responsive */
          div[style*="position: fixed"][style*="z-index: 1000"] > div {
            border-radius: 15px !important;
          }
          
          div[style*="position: fixed"][style*="z-index: 1000"] > div > div {
            padding: 30px 20px !important;
          }
          
          div[style*="position: fixed"][style*="z-index: 1000"] > div > div:first-child {
            min-height: 400px !important;
          }
          
          /* Gallery modal for mobile */
          div[style*="z-index: 2000"] {
            padding: 15px !important;
          }
          
          div[style*="z-index: 2000"] > div:last-child > div {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
          
          div[style*="z-index: 2000"] > div:last-child > div > div {
            height: 220px !important;
          }
          
          div[style*="z-index: 2000"] h2 {
            font-size: 1.5rem !important;
          }
          
          /* Fullscreen modal for mobile */
          div[style*="z-index: 3000"] {
            padding: 10px !important;
          }
          
          img[style*="max-width: 90%"] {
            max-width: 95% !important;
            max-height: 85% !important;
          }
          
          button[style*="z-index: 3001"][style*="left: 30px"],
          button[style*="z-index: 3001"][style*="right: 30px"] {
            width: 40px !important;
            height: 40px !important;
            font-size: 1rem !important;
          }
          
          div[style*="z-index: 3001"][style*="bottom: 30px"] {
            font-size: 0.9rem !important;
            padding: 8px 20px !important;
          }
        }
        
        @media (max-width: 400px) {
          /* Extra small devices */
          div[style*="z-index: 2000"] > div:last-child > div > div {
            height: 180px !important;
          }
          
          div[style*="z-index: 2000"] h2 {
            font-size: 1.3rem !important;
          }
          
          /* Project status badges */
          #ongoing-projects > div:last-child > div:nth-child(3) > div > div:nth-child(2) > div {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${theme.beige};
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${theme.accent}80;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${theme.accent};
        }
        
        /* Performance optimizations */
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Fix for iOS Safari */
        @supports (-webkit-touch-callout: none) {
          #ongoing-projects {
            min-height: -webkit-fill-available;
          }
          
          div[style*="z-index: 2000"] > div:last-child > div > div {
            height: 150px !important;
          }
        }
        
        /* Reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OngoingProjects;