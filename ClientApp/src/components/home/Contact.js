import React, { useEffect, useRef, useState } from 'react';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaWhatsapp,
  FaTiktok
} from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const socialRef = useRef(null);
  
  const [hoveredCard, setHoveredCard] = useState(null);

  const theme = {
    darkNavy: '#0a192f',
    navy: '#172a45',
    lightNavy: '#303c55',
    beige: '#e3e1d7',
    lightBeige: '#f5f4f0',
    accent: '#8b7355',
    lightAccent: '#a89070'
  };

  const content = {
    title: "Connect With Us",
    subtitle: "Reach out for custom woodworking consultations, project inquiries, or to visit our workshop",
    contactInfo: {
      phone: "+966 56 096 6096",
      email: "wissam@comprehensivework.com",
      address: "Jeddah, Saudi Arabia"
    },
    socialMedia: {
      facebook: "https://facebook.com/woodcraft",
      instagram: "https://instagram.com/woodcraft",
      linkedin: "https://linkedin.com/company/woodcraft",
      whatsapp: "https://wa.me/966501234567",
      tiktok: "https://tiktok.com/@woodcraft"
    }
  };

  const formattedPhone = content.contactInfo.phone.replace(/\s+/g, '');
  const mapsAddress = encodeURIComponent(content.contactInfo.address);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          once: true
        }
      });

      tl.fromTo(titleRef.current,
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
          ease: "power3.out"
        }
      )
      .fromTo(subtitleRef.current,
        { 
          opacity: 0, 
          y: 40
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        },
        "-=0.5"
      )
      .fromTo(cardsRef.current,
        { 
          opacity: 0, 
          y: 50,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out"
        },
        "-=0.3"
      )
      .fromTo(socialRef.current,
        { 
          opacity: 0, 
          y: 30
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.5,
          ease: "power3.out"
        },
        "-=0.2"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCardsRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const contactInfo = [
    { 
      icon: <FaPhone style={{ transform: 'scaleX(-1)', fontSize: '2rem' }} />, 
      title: "Phone",
      text: content.contactInfo.phone,
      href: `tel:${formattedPhone}`,
      description: "Call us directly",
      color: theme.accent
    },
    { 
      icon: <FaEnvelope />, 
      title: "Email",
      text: content.contactInfo.email,
      href: `mailto:${content.contactInfo.email}`,
      description: "Send us a message",
      color: theme.lightAccent
    },
    { 
      icon: <FaMapMarkerAlt />, 
      title: "Location",
      text: content.contactInfo.address,
      href: `https://www.google.com/maps/search/?api=1&query=${mapsAddress}`,
      description: "Visit our workshop",
      color: theme.accent
    }
  ];

  const socialMedia = [
    { 
      icon: <FaFacebook />, 
      name: "Facebook",
      href: content.socialMedia.facebook,
      color: theme.accent
    },
    { 
      icon: <FaInstagram />, 
      name: "Instagram",
      href: content.socialMedia.instagram,
      color: theme.lightAccent
    },
    { 
      icon: <FaLinkedin />, 
      name: "LinkedIn",
      href: content.socialMedia.linkedin,
      color: theme.accent
    },
    { 
      icon: <FaWhatsapp />, 
      name: "WhatsApp",
      href: content.socialMedia.whatsapp,
      color: theme.lightAccent
    },
    { 
      icon: <FaTiktok />, 
      name: "TikTok",
      href: content.socialMedia.tiktok,
      color: theme.accent
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact"
      style={{ 
        padding: '120px 0 150px',
        backgroundColor: theme.beige,
        color: theme.navy,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          radial-gradient(circle at 20% 80%, ${theme.lightAccent}10 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, ${theme.accent}05 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }} />
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '80%',
        backgroundImage: `linear-gradient(${theme.darkNavy}05 1px, transparent 1px),
                         linear-gradient(90deg, ${theme.darkNavy}05 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        opacity: 0.3,
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 40px',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Header Section */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '80px',
          padding: '0 20px'
        }}>
          <h2
            ref={titleRef}
            style={{
              fontWeight: '700',
              color: theme.darkNavy,
              marginBottom: '24px',
              fontSize: '3.5rem',
              fontFamily: "'Cygre', sans-serif",
              letterSpacing: '-0.02em',
              lineHeight: '1.1'
            }}
          >
            {content.title}
          </h2>
          <p
            ref={subtitleRef}
            style={{
              color: theme.lightNavy,
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

        {/* Contact Cards */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px',
          marginBottom: '80px'
        }}>
          {contactInfo.map((info, index) => (
            <div
              key={index}
              ref={addToCardsRefs}
              style={{
                opacity: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '40px 30px',
                borderRadius: '15px',
                backgroundColor: theme.lightBeige,
                border: `2px solid ${theme.darkNavy}15`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => window.open(info.href, info.href.includes('maps') ? '_blank' : '_self')}
            >
              {/* Hover Background */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: hoveredCard === index ? theme.darkNavy : 'transparent',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 1
              }} />
              
              {/* Icon Container */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: hoveredCard === index ? theme.beige : `${info.color}15`,
                color: hoveredCard === index ? theme.darkNavy : info.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                marginBottom: '25px',
                position: 'relative',
                zIndex: 2,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                border: hoveredCard === index ? `2px solid ${theme.beige}40` : `2px solid ${info.color}20`
              }}>
                {info.icon}
              </div>
              
              {/* Title */}
              <h3 style={{
                color: hoveredCard === index ? theme.beige : theme.darkNavy,
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                position: 'relative',
                zIndex: 2,
                transition: 'color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: "'Cygre', sans-serif"
              }}>
                {info.title}
              </h3>
              
              {/* Main Text */}
              <p style={{
                color: hoveredCard === index ? `${theme.beige}cc` : theme.lightNavy,
                fontSize: '1.3rem',
                fontWeight: '500',
                lineHeight: '1.5',
                marginBottom: '15px',
                position: 'relative',
                zIndex: 2,
                transition: 'color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: "'Cygre', sans-serif"
              }}>
                {info.text}
              </p>
              
              {/* Description */}
              <span style={{
                color: hoveredCard === index ? `${theme.beige}99` : info.color,
                fontSize: '0.9rem',
                fontStyle: 'italic',
                position: 'relative',
                zIndex: 2,
                transition: 'color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: "'Cygre', sans-serif"
              }}>
                {info.description}
              </span>
              
              {/* Hover Border Effect */}
              <div style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                right: '8px',
                bottom: '8px',
                borderRadius: '12px',
                border: `2px solid ${hoveredCard === index ? theme.accent : 'transparent'}`,
                pointerEvents: 'none',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 2
              }} />
            </div>
          ))}
        </div>

        {/* Social Media Section */}
        <div 
          ref={socialRef}
          style={{
            opacity: 0,
            textAlign: 'center'
          }}
        >
          <h3 style={{
            color: theme.darkNavy,
            fontSize: '1.5rem',
            marginBottom: '30px',
            fontFamily: "'Cygre', sans-serif",
            fontWeight: '600',
            letterSpacing: '0.05em'
          }}>
            Follow Our Journey
          </h3>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  padding: '20px',
                  borderRadius: '12px',
                  backgroundColor: theme.lightBeige,
                  border: `2px solid ${theme.darkNavy}15`,
                  transition: 'all 0.3s ease',
                  width: '120px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.darkNavy;
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme.lightBeige;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: `${social.color}15`,
                  color: social.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '12px',
                  transition: 'all 0.3s ease'
                }}>
                  {social.icon}
                </div>
                
                <span style={{
                  color: theme.lightNavy,
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'color 0.3s ease',
                  fontFamily: "'Cygre', sans-serif"
                }}>
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Animations and Responsive CSS */}
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/cygre');
        
        /* Mobile Responsiveness */
        @media (max-width: 1024px) {
          #contact {
            padding: 100px 0 120px !important;
          }
          
          #contact > div > div:first-child {
            margin-bottom: 60px !important;
          }
          
          #contact h2 {
            font-size: 2.8rem !important;
          }
          
          #contact p[style*="subtitle"] {
            font-size: 1.1rem !important;
            padding: 0 10px !important;
          }
          
          div[style*="gridTemplateColumns: 'repeat(3, 1fr)'"] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 25px !important;
            padding: 0 20px !important;
          }
          
          div[style*="display: 'flex'"] {
            gap: 15px !important;
          }
          
          a[style*="width: '120px'"] {
            width: 110px !important;
            padding: 18px !important;
          }
        }
        
        @media (max-width: 768px) {
          #contact {
            padding: 80px 0 100px !important;
          }
          
          #contact h2 {
            font-size: 2.4rem !important;
            padding: 0 20px !important;
          }
          
          #contact p[style*="subtitle"] {
            font-size: 1rem !important;
            padding: 0 20px !important;
          }
          
          div[style*="maxWidth: '1200px'"] {
            padding: 0 20px !important;
          }
          
          div[style*="gridTemplateColumns: 'repeat(3, 1fr)'"] {
            grid-template-columns: 1fr !important;
            max-width: 500px;
            margin: 0 auto 60px !important;
            gap: 20px !important;
          }
          
          div[style*="display: 'flex'"] {
            gap: 12px !important;
          }
          
          a[style*="width: '120px'"] {
            width: 100px !important;
            padding: 15px !important;
          }
          
          div[style*="width: '80px'"] {
            width: 70px !important;
            height: 70px !important;
            font-size: 1.8rem !important;
          }
          
          p[style*="fontSize: '1.3rem'"] {
            font-size: 1.2rem !important;
          }
        }
        
        @media (max-width: 576px) {
          #contact {
            padding: 60px 0 80px !important;
          }
          
          #contact h2 {
            font-size: 2rem !important;
          }
          
          #contact p[style*="subtitle"] {
            font-size: 0.9rem !important;
          }
          
          div[style*="gridTemplateColumns: 'repeat(3, 1fr)'"] {
            gap: 15px !important;
            padding: 0 10px !important;
          }
          
          div[style*="padding: '40px 30px'"] {
            padding: 30px 20px !important;
          }
          
          div[style*="display: 'flex'"] {
            gap: 10px !important;
          }
          
          a[style*="width: '120px'"] {
            width: 85px !important;
            padding: 12px !important;
          }
          
          div[style*="width: '50px'"] {
            width: 40px !important;
            height: 40px !important;
            font-size: 1.2rem !important;
          }
          
          span[style*="fontSize: '0.9rem'"] {
            font-size: 0.8rem !important;
          }
          
          h3[style*="fontSize: '1.5rem'"] {
            font-size: 1.3rem !important;
          }
        }
        
        @media (max-width: 400px) {
          div[style*="display: 'flex'"] {
            justify-content: space-around !important;
          }
          
          a[style*="width: '120px'"] {
            width: 75px !important;
            padding: 10px !important;
          }
          
          div[style*="width: '50px'"] {
            width: 35px !important;
            height: 35px !important;
            font-size: 1rem !important;
          }
          
          span[style*="fontSize: '0.9rem'"] {
            font-size: 0.75rem !important;
          }
        }
        
        /* Performance optimizations */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
        
        /* Fix for iOS Safari */
        @supports (-webkit-touch-callout: none) {
          #contact {
            min-height: -webkit-fill-available;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;