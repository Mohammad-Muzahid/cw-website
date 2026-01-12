import React, { useEffect, useRef, useState } from 'react';
import { FaPhone, FaBars, FaTimes } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [titleWord, setTitleWord] = useState('Premium');
  const [animationComplete, setAnimationComplete] = useState(false);
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const taglineRef = useRef(null);
  const menuRef = useRef(null);
  const contentRef = useRef(null);
  const titleWordRef = useRef(null);

  // Updated color theme: light beige text on deep navy layers
  const theme = {
    textBeige: '#f8f5ed',          // Light beige for text
    navy: '#0d1b2a',               // Deep navy for backgrounds/layers
    accent: '#c9a86a',             // Warm gold accent
    lightAccent: '#e0cda9',        // Lighter gold
    white: '#ffffff',
    darkNavy: '#09111d'            // Darker navy for variations
  };

  // Font size variables - CHANGE THESE TO ADJUST FONT SIZES
  const fontSizes = {
    desktop: {
      title: '5rem',        // Changed from 5.5rem to 4rem
      tagline: '2rem',      // Changed from 2.5rem to 2rem
      menu: '1.2rem',
      phone: '1.1rem'
    },
    tablet: {
      title: '3rem',        // Changed from 4.5rem to 3rem
      tagline: '1.6rem',    // Changed from 2.2rem to 1.6rem
      menu: '1.1rem',
      phone: '1rem'
    },
    mobile: {
      title: '4.5rem',      // Changed from 3.5rem to 2.5rem
      tagline: '1.3rem',    // Changed from 1.8rem to 1.3rem
      menu: '1rem',
      phone: '2.9rem'
    },
    smallMobile: {
      title: '2rem',        // Changed from 2.8rem to 2rem
      tagline: '1.1rem',    // Changed from 1.5rem to 1.1rem
    }
  };

  // Transparency controls - Navigation is fully transparent
  const transparencyControls = {
    imageOverlayOpacity: 0.9,      // Reduced for more background visibility
    imageOverlayColor: theme.navy,
    desktopHeaderOpacity: 0,       // Fully transparent
    mobileHeaderOpacity: 0.1,      // Slightly visible on mobile
    menuHoverOpacity: 0.8,
    drawerBackgroundOpacity: 0.95,
    mobileOverlayOpacity: 0.4,
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Navigation handlers
  const handleServicesClick = () => {
    navigate('/services');
    setMobileOpen(false);
  };

  const handleAboutClick = () => {
    navigate('/about');
    setMobileOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  // Format phone number
  const phoneNumber = "+966 56 096 6096";
  const formattedPhone = phoneNumber.replace(/[\s\-()]/g, '');

  // Menu items - now with proper routing
  const menuItems = [
    { label: 'Services', onClick: handleServicesClick },
    { label: 'Projects', onClick: () => scrollToSection('projects') },
    { label: 'About', onClick: handleAboutClick },
    { label: 'Contact', onClick: () => scrollToSection('contact') }
  ];

  // Content for woodworks company
  const content = {
    companyName: "CW Woodworks",
    tagline: "Crafting Excellence in Wood",
    heroTitle: "Woodwork Solutions",
  };

  // Title words for animation
  const titleWords = ['Premium', 'Luxurious'];

  useEffect(() => {
    let wordIndex = 0;
    let animationInterval = null;
    
    // Function to animate to the next word with GSAP
    const animateToNextWord = () => {
      if (titleWordRef.current) {
        gsap.to(titleWordRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            wordIndex++;
            
            if (wordIndex >= titleWords.length) {
              setTitleWord('Comprehensive');
              setAnimationComplete(true);
              clearInterval(animationInterval);
              
              gsap.to(titleWordRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
              });
            } else {
              setTitleWord(titleWords[wordIndex]);
              
              gsap.to(titleWordRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
              });
            }
          }
        });
      }
    };
    
    const startAnimation = () => {
      if (titleWordRef.current) {
        gsap.fromTo(titleWordRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }
      
      animationInterval = setInterval(animateToNextWord, 2000);
    };
    
    const animationTimeout = setTimeout(startAnimation, 2500);
    
    // GSAP animations for other elements
    const tl = gsap.timeline();
    
    // Animate menu first
    tl.fromTo(menuRef.current, 
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(contentRef.current,
      { 
        opacity: 0, 
        x: -100,
      },
      { 
        opacity: 1, 
        x: 0,
        duration: 1.2,
        ease: "power3.out"
      },
      "-=0.5"
    )
    .fromTo(headingRef.current,
      { 
        opacity: 0, 
        x: -150,
      },
      { 
        opacity: 1, 
        x: 0,
        duration: 1.5,
        ease: "power3.out"
      },
      "-=0.8"
    )
    .fromTo(taglineRef.current,
      { 
        opacity: 0, 
        x: -120,
      },
      { 
        opacity: 1, 
        x: 0,
        duration: 1.2,
        ease: "power3.out"
      },
      "-=0.6"
    );

    // Cleanup on component unmount
    return () => {
      clearTimeout(animationTimeout);
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '0',
        backgroundColor: theme.navy,
        fontFamily: "'Cygre', serif", // Added Cygre font to entire section
      }}
    >
      {/* BACKGROUND IMAGE */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/hero1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
        }}
      />
      
      {/* Deep Navy Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(90deg, 
          ${theme.navy}${Math.round(transparencyControls.imageOverlayOpacity * 255).toString(16).padStart(2, '0')} 0%, 
          ${theme.darkNavy}${Math.round(transparencyControls.imageOverlayOpacity * 0.5 * 255).toString(16).padStart(2, '0')} 100%)`,
        zIndex: 2
      }} />

      {/* DESKTOP Navigation Bar - Transparent and Centered at Top */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'none',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '25px 40px',
          backgroundColor: `transparent`,
          backdropFilter: 'blur(0px)',
          fontFamily: "'Cygre', serif", // Cygre font for navigation
        }}
        className="desktop-nav-container"
      >
        {/* Logo - Left side with light beige color */}
        <div style={{ 
          position: 'absolute', 
          left: 40,
          top: '50%',
          transform: 'translateY(-50%)'
        }}>
          <img 
            src="/images/CW_logo.png" 
            alt="CW Woodworks" 
            style={{ 
              width: '200px',
              height: 'auto',
              filter: 'brightness(0) invert(1) sepia(1) saturate(0.5) hue-rotate(-10deg) brightness(1.2)',
            }} 
          />
        </div>

        {/* Centered Menu Items */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 60,
        }}>
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              style={{
                color: theme.textBeige,
                fontWeight: 300,
                fontSize: fontSizes.desktop.menu,
                position: 'relative',
                padding: '10px 0',
                minWidth: 'auto',
                textTransform: 'none',
                letterSpacing: '1.5px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Cygre', serif", // Cygre font for menu buttons
                transition: 'all 0.3s ease',
              }}
              className="desktop-menu-button"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Phone Number - Right side */}
        <div style={{ 
          position: 'absolute', 
          right: 40,
          top: '50%',
          transform: 'translateY(-50%)'
        }}>
          <a
            href={`tel:${formattedPhone}`}
            style={{
              color: theme.textBeige,
              fontWeight: 300,
              border: `1px solid ${theme.textBeige}`,
              padding: '12px 24px',
              fontSize: fontSizes.desktop.phone,
              textTransform: 'none',
              borderRadius: '4px',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s ease',
              backgroundColor: 'transparent',
              fontFamily: "'Cygre', serif", // Cygre font for phone number
              letterSpacing: '0.8px',
            }}
            className="desktop-contact-button"
          >
            <FaPhone style={{ transform: 'scaleX(-1)', fontSize: '1rem' }} /> 
            <span>{phoneNumber}</span>
          </a>
        </div>
      </div>

      {/* MOBILE Header - Slightly transparent */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          backgroundColor: `${theme.navy}${Math.round(transparencyControls.mobileHeaderOpacity * 255).toString(16).padStart(2, '0')}`,
          backdropFilter: 'blur(10px)',
          fontFamily: "'Cygre', serif", // Cygre font for mobile header
        }}
        className="mobile-header"
      >
        {/* Mobile Logo with light beige color */}
        <div>
          <img 
            src="/images/CW_logo.png" 
            alt="CW Woodworks" 
            style={{ 
              width: '150px',
              height: 'auto',
              filter: 'brightness(0) invert(1) sepia(1) saturate(0.5) hue-rotate(-10deg) brightness(1.2)',
            }} 
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={handleDrawerToggle}
          style={{
            color: theme.textBeige,
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            fontFamily: "'Cygre', serif", // Cygre font for menu button
          }}
          className="mobile-menu-button"
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '300px',
          backgroundColor: `${theme.navy}${Math.round(transparencyControls.drawerBackgroundOpacity * 255).toString(16).padStart(2, '0')}`,
          backdropFilter: 'blur(10px)',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          borderLeft: `1px solid ${theme.textBeige}20`,
          fontFamily: "'Cygre', serif", // Cygre font for drawer
        }}
        className="mobile-drawer"
        >
          {/* Drawer Header with Close Button */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '20px',
            borderBottom: `1px solid ${theme.textBeige}20`
          }}>
            <img 
              src="/images/CW_logo.png" 
              alt="CW Woodworks" 
              style={{ 
                width: '150px',
                height: 'auto',
                filter: 'brightness(0) invert(1) sepia(1) saturate(0.5) hue-rotate(-10deg) brightness(1.2)',
              }} 
            />
            <button 
              onClick={handleDrawerToggle}
              style={{ 
                color: theme.textBeige,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Cygre', serif", // Cygre font for close button
              }}
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          {/* Mobile Menu Items */}
          <div style={{ 
            flex: 1,
            paddingTop: '30px'
          }}>
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '18px 24px',
                  color: theme.textBeige,
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  fontWeight: 300,
                  fontSize: '1.3rem',
                  cursor: 'pointer',
                  borderBottom: `1px solid ${theme.textBeige}15`,
                  transition: 'all 0.3s ease',
                  fontFamily: "'Cygre', serif", // Cygre font for drawer menu items
                  letterSpacing: '1px',
                }}
                className="drawer-menu-button"
              >
                {item.label}
              </button>
            ))}
            
            {/* Phone Number in Mobile Menu */}
            <div style={{
              padding: '30px 24px',
              marginTop: '30px',
            }}>
              <a
                href={`tel:${formattedPhone}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '18px 24px',
                  color: theme.textBeige,
                  fontWeight: 300,
                  fontSize: '1.2rem',
                  textDecoration: 'none',
                  border: `1px solid ${theme.textBeige}`,
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Cygre', serif", // Cygre font for mobile phone button
                  letterSpacing: '0.8px',
                }}
                className="mobile-phone-button"
              >
                <FaPhone style={{ transform: 'scaleX(-1)', fontSize: '1rem' }} /> 
                {phoneNumber}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          onClick={handleDrawerToggle}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: `rgba(13, 27, 42, ${transparencyControls.mobileOverlayOpacity})`,
            zIndex: 1999,
            fontFamily: "'Cygre', serif", // Consistent font for overlay
          }}
          className="mobile-overlay"
        />
      )}

      {/* Left-corner aligned Content Container */}
      <div 
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          margin: '0',
          padding: '0 40px 0 80px', // More padding on left, less on right
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          minHeight: '100vh',
          maxWidth: 'none', // Remove maxWidth for corner alignment
          fontFamily: "'Cygre', serif", // Cygre font for content container
        }}
      >
        {/* Main Title with rotating word - Smaller font size */}
        <h1
          ref={headingRef}
          style={{
            fontWeight: 300,
            color: theme.textBeige,
            marginBottom: '10px',
            lineHeight: 1,
            fontSize: fontSizes.desktop.title, // Using font size variable
            fontFamily: "'Cygre', serif", // Cygre font for main title
            letterSpacing: '1.5px',
            maxWidth: '800px',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          }}
          className="hero-title"
        >
          <span 
            ref={titleWordRef}
            className="title-word"
            style={{ 
              color: theme.accent,
              display: 'inline-block',
              position: 'relative',
              opacity: 1,
              fontWeight: 400,
              fontStyle: 'normal',
              letterSpacing: '1.5px',
              textShadow: '0 2px 15px rgba(201, 168, 106, 0.5)',
              fontFamily: "'Cygre', serif", // Cygre font for rotating word
            }}
          >
            {titleWord}
          </span> {content.heroTitle}
        </h1>
        
        {/* Tagline - Smaller font size */}
        <div
          ref={taglineRef}
          style={{
            marginTop: '5px',
            fontFamily: "'Cygre', serif", // Cygre font for tagline container
          }}
        >
          <h2 style={{
            color: theme.textBeige,
            fontWeight: 300,
            lineHeight: 1.2,
            fontSize: fontSizes.desktop.tagline, // Using font size variable
            fontFamily: "'Cygre', serif", // Cygre font for tagline
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontStyle: 'normal',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            opacity: 0.9,
          }}
          className="hero-tagline"
          >
            {content.tagline}
          </h2>
        </div>
      </div>

      {/* CSS for responsive behavior and animations */}
      <style>{`
        /* Import Cygre font */
        @import url('https://fonts.cdnfonts.com/css/cygre');
        
        /* Apply Cygre font to all text elements */
        * {
          font-family: 'Cygre', serif;
        }
        
        /* Default: Show mobile, hide desktop */
        .desktop-nav-container {
          display: none !important;
        }
        
        .mobile-header {
          display: flex !important;
        }
        
        /* Desktop styles */
        @media (min-width: 768px) {
          .desktop-nav-container {
            display: flex !important;
          }
          
          .mobile-header {
            display: none !important;
          }
          
          .mobile-drawer {
            display: none !important;
          }
          
          .mobile-overlay {
            display: none !important;
          }
          
          /* Desktop menu button hover effects */
          .desktop-menu-button:hover {
            color: ${theme.accent} !important;
            opacity: ${transparencyControls.menuHoverOpacity} !important;
            transform: translateY(-2px) !important;
          }
          
          .desktop-menu-button::after {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 0;
            width: 0;
            height: 2px;
            background-color: ${theme.accent};
            transition: width 0.3s ease;
          }
          
          .desktop-menu-button:hover::after {
            width: 100%;
          }
          
          /* Desktop contact button hover */
          .desktop-contact-button:hover {
            background-color: ${theme.textBeige} !important;
            color: ${theme.navy} !important;
            border-color: ${theme.accent} !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 4px 20px rgba(201, 168, 106, 0.3) !important;
          }
          
          /* Responsive typography for desktop - USING FONT SIZE VARIABLES */
          .hero-title {
            font-size: ${fontSizes.desktop.title} !important;
            font-family: 'Cygre', serif !important;
          }
          
          .hero-tagline {
            font-size: ${fontSizes.desktop.tagline} !important;
            font-family: 'Cygre', serif !important;
          }
          
          .desktop-menu-button {
            font-family: 'Cygre', serif !important;
          }
          
          .desktop-contact-button {
            font-family: 'Cygre', serif !important;
          }
        }
        
        /* Large desktop */
        @media (min-width: 1024px) {
          .hero-title {
            font-size: ${fontSizes.desktop.title} !important;
            font-family: 'Cygre', serif !important;
          }
          
          .hero-tagline {
            font-size: ${fontSizes.desktop.tagline} !important;
            font-family: 'Cygre', serif !important;
          }
        }
        
        /* Tablet */
        @media (max-width: 1023px) and (min-width: 768px) {
          .hero-title {
            font-size: ${fontSizes.tablet.title} !important;
            font-family: 'Cygre', serif !important;
          }
          
          .hero-tagline {
            font-size: ${fontSizes.tablet.tagline} !important;
            font-family: 'Cygre', serif !important;
          }
          
          [ref="contentRef"] {
            padding: 0 40px 0 60px !important;
          }
          
          .desktop-menu-button {
            font-size: ${fontSizes.tablet.menu} !important;
            font-family: 'Cygre', serif !important;
          }
          
          .desktop-contact-button {
            font-size: ${fontSizes.tablet.phone} !important;
            padding: 10px 20px !important;
            font-family: 'Cygre', serif !important;
          }
        }
        
        /* Mobile styles */
        @media (max-width: 767px) {
          .hero-title {
            font-size: ${fontSizes.mobile.title} !important;
            margin-top: 100px !important;
            letter-spacing: 1.2px !important;
            font-family: 'Cygre', serif !important;
          }
          
          .hero-tagline {
            font-size: ${fontSizes.mobile.tagline} !important;
            letter-spacing: 1.5px !important;
            font-family: 'Cygre', serif !important;
          }
          
          /* Left-corner aligned content on mobile */
          [ref="contentRef"] {
            padding: 0 20px 0 30px !important;
          }
          
          /* Adjust menu items spacing for mobile */
          .desktop-menu-button {
            font-size: ${fontSizes.mobile.menu} !important;
            letter-spacing: 1px !important;
            font-family: 'Cygre', serif !important;
          }
          
          .desktop-contact-button {
            padding: 8px 16px !important;
            font-size: ${fontSizes.mobile.phone} !important;
            font-family: 'Cygre', serif !important;
          }
          
          .mobile-header {
            font-family: 'Cygre', serif !important;
          }
          
          .mobile-drawer {
            font-family: 'Cygre', serif !important;
          }
          
          .drawer-menu-button {
            font-family: 'Cygre', serif !important;
          }
          
          .mobile-phone-button {
            font-family: 'Cygre', serif !important;
          }
        }
        
        /* Small mobile */
        @media (max-width: 480px) {
          .hero-title {
            font-size: ${fontSizes.smallMobile.title} !important;
            font-family: 'Cygre', serif !important;
          }
          
          .hero-tagline {
            font-size: ${fontSizes.smallMobile.tagline} !important;
            font-family: 'Cygre', serif !important;
          }
          
          [ref="contentRef"] {
            padding: 0 15px 0 20px !important;
          }
        }
        
        /* Drawer button hover effects */
        .drawer-menu-button:hover {
          color: ${theme.accent} !important;
          background-color: ${theme.textBeige}10 !important;
          padding-left: 30px !important;
        }
        
        .mobile-menu-button:hover {
          color: ${theme.accent} !important;
        }
        
        /* Mobile phone button hover effect */
        .mobile-phone-button:hover {
          background-color: ${theme.textBeige} !important;
          color: ${theme.navy} !important;
          border-color: ${theme.accent} !important;
        }
        
        /* Animations */
        .mobile-overlay {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: ${transparencyControls.mobileOverlayOpacity};
          }
        }
        
        .mobile-drawer {
          animation: slideIn 0.3s ease-in-out;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        /* Smooth text animation for rotating word */
        .title-word {
          transition: opacity 0.5s ease, transform 0.5s ease;
          font-family: 'Cygre', serif !important;
        }
      `}</style>
    </section>
  );
};

export default Hero;