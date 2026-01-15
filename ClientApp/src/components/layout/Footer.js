import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaWhatsapp, 
  FaLinkedin, 
  FaInstagram, 
  FaTiktok,
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaArrowRight 
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Updated color theme
  const theme = {
    charcoal: '#1e252f',       // Charcoal / deep navy
    beige: '#e3e1d7',          // Light beige / off-white
    accent: '#8b7355',         // Warm bronze accent color
    lightAccent: '#a89070',    // Lighter bronze for highlights
    white: '#ffffff'           // Pure white for contrast
  };

  // Content data - Updated for Comprehensive Woodwork
  const content = {
    companyName: "Comprehensive Woodwork",
    tagline: "Premium woodwork contracting and interior solutions since 2010",
    contact: {
      phone: "+966 56 096 6096",
      email: "wissam@comprehensivework.com",
      address: "Jeddah, Saudi Arabia"
    }
  };

  // Social media links - Updated with WhatsApp and TikTok
  const socialMedia = [
    { 
      icon: <FaFacebook />, 
      name: 'Facebook',
      href: 'https://facebook.com/comprehensivewoodwork',
      color: '#1877F2'
    },
    { 
      icon: <FaWhatsapp />, 
      name: 'WhatsApp',
      href: 'https://wa.me/966560966096',
      color: '#25D366'
    },
    { 
      icon: <FaInstagram />, 
      name: 'Instagram',
      href: 'https://instagram.com/comprehensivewoodwork',
      color: '#E4405F'
    },
    { 
      icon: <FaTiktok />, 
      name: 'TikTok',
      href: 'https://tiktok.com/@comprehensivewoodwork',
      color: '#000000'
    },
    { 
      icon: <FaLinkedin />, 
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/comprehensive-woodwork',
      color: '#0A66C2'
    }
  ];

  // Format for links
  const formattedPhone = content.contact.phone.replace(/[\s\-()]/g, '');
  const mapsAddress = encodeURIComponent(content.contact.address);

  return (
    <footer style={{
      backgroundColor: theme.charcoal,
      color: theme.beige,
      padding: '80px 0 30px',
      position: 'relative',
      zIndex: 1000,
      width: '100%',
      borderTop: `3px solid ${theme.accent}`
    }}>
      {/* Top decorative border */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: `linear-gradient(90deg, ${theme.accent}, ${theme.lightAccent}, ${theme.accent})`
      }} />

      {/* Subtle pattern overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e3e1d7' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        opacity: 0.5,
        zIndex: 0
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 40px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '50px',
          marginBottom: '60px'
        }}>
          {/* Company Info */}
          <div>
            <div style={{ marginBottom: '25px' }}>
              <img 
                src="/images/CW_logo.png" 
                alt="Comprehensive Woodwork" 
                style={{ 
                  width: '200px', 
                  height: 'auto',
                  filter: 'brightness(0) invert(1)'
                }} 
              />
            </div>
            <p style={{
              color: `${theme.beige}cc`,
              lineHeight: 1.7,
              marginBottom: '30px',
              fontSize: '1.05rem',
              fontFamily: "'Cygre', sans-serif",
              fontWeight: 300
            }}>
              {content.tagline}
            </p>
            
            {/* Social Media Icons - Updated with WhatsApp and TikTok */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {socialMedia.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.name}`}
                  style={{
                    backgroundColor: `${theme.beige}15`,
                    color: theme.beige,
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: `1px solid ${theme.beige}30`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = social.color;
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                    e.currentTarget.style.borderColor = social.color;
                    e.currentTarget.style.boxShadow = `0 10px 20px ${social.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${theme.beige}15`;
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = `${theme.beige}30`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {social.icon}
                  
                  {/* Tooltip */}
                  <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: theme.charcoal,
                    color: theme.beige,
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                    opacity: 0,
                    visibility: 'hidden',
                    transition: 'all 0.3s ease',
                    marginBottom: '8px',
                    border: `1px solid ${theme.accent}`,
                    fontFamily: "'Cygre', sans-serif",
                    fontWeight: 300,
                    zIndex: 100
                  }}>
                    {social.name}
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '0',
                      height: '0',
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderTop: `6px solid ${theme.accent}`
                    }} />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              color: theme.beige,
              marginBottom: '30px',
              fontSize: '1.4rem',
              position: 'relative',
              paddingBottom: '15px',
              fontFamily: "'Cygre', sans-serif",
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Quick Links
              <span style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '50px',
                height: '3px',
                backgroundColor: theme.accent,
                borderRadius: '2px'
              }} />
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Projects', path: '/projects' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  style={{
                    color: `${theme.beige}cc`,
                    textDecoration: 'none',
                    fontSize: '1.05rem',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: "'Cygre', sans-serif",
                    fontWeight: 300,
                    position: 'relative',
                    paddingLeft: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.accent;
                    e.currentTarget.style.transform = 'translateX(10px)';
                    e.currentTarget.style.fontWeight = '500';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = `${theme.beige}cc`;
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.fontWeight = '300';
                  }}
                >
                  <FaArrowRight style={{ 
                    fontSize: '0.8rem',
                    transition: 'all 0.3s ease',
                    opacity: 0.7
                  }} />
                  {link.name}
                  
                  {/* Hover line effect */}
                  <span style={{
                    position: 'absolute',
                    bottom: '-3px',
                    left: '0',
                    width: '0',
                    height: '2px',
                    backgroundColor: theme.accent,
                    transition: 'width 0.3s ease',
                    borderRadius: '1px'
                  }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{
              color: theme.beige,
              marginBottom: '30px',
              fontSize: '1.4rem',
              position: 'relative',
              paddingBottom: '15px',
              fontFamily: "'Cygre', sans-serif",
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Contact Info
              <span style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '50px',
                height: '3px',
                backgroundColor: theme.accent,
                borderRadius: '2px'
              }} />
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Phone */}
              <a 
                href={`tel:${formattedPhone}`}
                style={{
                  color: `${theme.beige}cc`,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '15px',
                  fontSize: '1.05rem',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Cygre', sans-serif",
                  fontWeight: 300
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.accent;
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = `${theme.beige}cc`;
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: `${theme.accent}20`,
                  color: theme.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}>
                  <FaPhone style={{ transform: 'scaleX(-1)', fontSize: '1rem' }} />
                </div>
                <span style={{ lineHeight: 1.5 }}>
                  <strong style={{ color: theme.beige, fontWeight: 600 }}>Phone:</strong><br />
                  {content.contact.phone}
                </span>
              </a>

              {/* Email */}
              <a 
                href={`mailto:${content.contact.email}`}
                style={{
                  color: `${theme.beige}cc`,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '15px',
                  fontSize: '1.05rem',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Cygre', sans-serif",
                  fontWeight: 300
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.accent;
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = `${theme.beige}cc`;
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: `${theme.accent}20`,
                  color: theme.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}>
                  <FaEnvelope />
                </div>
                <span style={{ lineHeight: 1.5 }}>
                  <strong style={{ color: theme.beige, fontWeight: 600 }}>Email:</strong><br />
                  {content.contact.email}
                </span>
              </a>

              {/* Address */}
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${mapsAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: `${theme.beige}cc`,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '15px',
                  fontSize: '1.05rem',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Cygre', sans-serif",
                  fontWeight: 300
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.accent;
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = `${theme.beige}cc`;
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: `${theme.accent}20`,
                  color: theme.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}>
                  <FaMapMarkerAlt />
                </div>
                <span style={{ lineHeight: 1.5 }}>
                  <strong style={{ color: theme.beige, fontWeight: 600 }}>Address:</strong><br />
                  {content.contact.address}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: `1px solid ${theme.beige}20`,
          paddingTop: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{
            color: `${theme.beige}99`,
            fontSize: '0.95rem',
            fontFamily: "'Cygre', sans-serif",
            fontWeight: 300
          }}>
            © {currentYear} {content.companyName}. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '25px' }}>
            <button 
              onClick={() => window.location.href = '/privacy'}
              style={{
                color: `${theme.beige}99`,
                fontSize: '0.95rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
                fontFamily: "'Cygre', sans-serif",
                fontWeight: 300
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.accent;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = `${theme.beige}99`;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => window.location.href = '/terms'}
              style={{
                color: `${theme.beige}99`,
                fontSize: '0.95rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
                fontFamily: "'Cygre', sans-serif",
                fontWeight: 300
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.accent;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = `${theme.beige}99`;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
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

        /* Social icon hover tooltip */
        a[aria-label]:hover > div {
          opacity: 1 !important;
          visibility: visible !important;
        }

        /* Quick link hover line effect */
        a:hover span:last-child {
          width: 100% !important;
        }

        /* Responsive styles */
        @media (max-width: 1200px) {
          footer > div {
            padding: 0 30px !important;
          }
          
          footer > div > div:first-child {
            gap: 40px !important;
          }
        }
        
        @media (max-width: 992px) {
          footer {
            padding: 70px 0 25px !important;
          }
          
          footer > div {
            padding: 0 25px !important;
          }
          
          footer > div > div:first-child {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 50px !important;
          }
          
          footer img {
            width: 180px !important;
          }
        }
        
        @media (max-width: 768px) {
          footer {
            padding: 60px 0 25px !important;
          }
          
          footer > div {
            padding: 0 20px !important;
          }
          
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            margin-bottom: 40px !important;
          }
          
          footer img {
            width: 180px !important;
          }
          
          footer h3 {
            font-size: 1.3rem !important;
            margin-bottom: 25px !important;
          }
          
          footer > div > div:last-child {
            flex-direction: column !important;
            text-align: center !important;
            gap: 15px !important;
          }
          
          /* Social icons responsive */
          a[aria-label] {
            width: 44px !important;
            height: 44px !important;
            font-size: 1.1rem !important;
          }
        }
        
        @media (max-width: 576px) {
          footer {
            padding: 50px 0 20px !important;
          }
          
          footer > div {
            padding: 0 15px !important;
          }
          
          footer img {
            width: 160px !important;
          }
          
          p, a, button {
            font-size: 0.95rem !important;
          }
          
          a[aria-label] {
            width: 42px !important;
            height: 42px !important;
            font-size: 1rem !important;
          }
          
          .contact-icon {
            width: 36px !important;
            height: 36px !important;
            font-size: 0.9rem !important;
          }
        }

        @media (max-width: 480px) {
          footer {
            padding: 40px 0 20px !important;
          }
          
          a[aria-label] {
            width: 40px !important;
            height: 40px !important;
            font-size: 0.9rem !important;
          }
          
          .contact-icon {
            width: 34px !important;
            height: 34px !important;
          }
        }

        @media (max-width: 380px) {
          a[aria-label] {
            width: 38px !important;
            height: 38px !important;
            font-size: 0.85rem !important;
          }
          
          /* Stack social icons on very small screens */
          div[style*="gap: '12px'"] {
            justify-content: center !important;
          }
        }

        /* Fix for iOS Safari button styling */
        button {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background: transparent;
        }
        
        /* Ensure links are clickable on mobile */
        a, button {
          touch-action: manipulation;
        }
        
        /* Improve hover effects for mobile */
        @media (hover: hover) {
          a:hover, button:hover {
            cursor: pointer;
          }
        }
        
        @media (hover: none) {
          a:active, button:active {
            opacity: 0.8;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;