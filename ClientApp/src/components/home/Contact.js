import React, { useEffect, useRef, useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const infoRefs = useRef([]);
  const formRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: ''
  });

  const theme = {
    charcoal: '#1e252f',
    beige: '#e3e1d7',
    accent: '#8b7355',
    lightAccent: '#a89070',
    white: '#ffffff'
  };

  const content = {
    title: "Let's Create Together",
    subtitle: "Start your custom woodworking project with a free consultation. Share your vision and we'll bring it to life.",
    contactInfo: {
      phone: "+1 (555) 123-4567",
      email: "craft@woodworks.com",
      address: "123 Craftsmanship Ave, Woodville, WV 12345",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM"
    },
    form: {
      name: "Your Name",
      email: "Email Address",
      project: "Tell us about your project...",
      submit: "Start Your Project"
    }
  };

  const formattedPhone = content.contactInfo.phone.replace(/[\s\-()]/g, '');
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
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(infoRefs.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! We'll contact you at ${formData.email} about your project.`);
    setFormData({ name: '', email: '', project: '' });
  };

  const addToRefs = (el) => {
    if (el && !infoRefs.current.includes(el)) {
      infoRefs.current.push(el);
    }
  };

  const contactInfo = [
    { 
      icon: <FaPhone />, 
      title: "Call Us",
      text: content.contactInfo.phone,
      href: `tel:${formattedPhone}`,
      description: "Direct consultation"
    },
    { 
      icon: <FaEnvelope />, 
      title: "Email",
      text: content.contactInfo.email,
      href: `mailto:${content.contactInfo.email}`,
      description: "Detailed inquiries"
    },
    { 
      icon: <FaMapMarkerAlt />, 
      title: "Visit",
      text: content.contactInfo.address,
      href: `https://www.google.com/maps/search/?api=1&query=${mapsAddress}`,
      description: "Studio location"
    },
    { 
      icon: <FaClock />, 
      title: "Hours",
      text: content.contactInfo.hours,
      href: `tel:${formattedPhone}`,
      description: "Best time to call"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact"
      style={{ 
        padding: '100px 0',
        backgroundColor: theme.beige,
        color: theme.charcoal,
        position: 'relative'
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 40px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2
            ref={titleRef}
            style={{
              fontWeight: '700',
              color: theme.charcoal,
              marginBottom: '20px',
              fontSize: '3rem'
            }}
          >
            {content.title}
          </h2>
          <p
            ref={subtitleRef}
            style={{
              color: `${theme.charcoal}cc`,
              maxWidth: '800px',
              margin: '0 auto',
              fontSize: '1.2rem',
              lineHeight: '1.6'
            }}
          >
            {content.subtitle}
          </p>
        </div>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'start'
        }}>
          <div>
            <div style={{
              backgroundColor: theme.white,
              borderRadius: '20px',
              padding: '40px',
              border: `2px solid ${theme.charcoal}10`,
              boxShadow: '0 10px 30px rgba(30, 37, 47, 0.1)'
            }}>
              <h3 style={{
                color: theme.charcoal,
                fontSize: '1.5rem',
                marginBottom: '30px',
                textAlign: 'center'
              }}>
                Contact Information
              </h3>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '25px'
              }}>
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    ref={addToRefs}
                    style={{
                      opacity: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '20px',
                      borderRadius: '15px',
                      backgroundColor: `${theme.beige}`,
                      border: `2px solid ${theme.charcoal}10`,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => window.open(info.href, info.href.includes('maps') ? '_blank' : '_self')}
                  >
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: `${theme.accent}15`,
                      color: theme.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      marginBottom: '15px'
                    }}>
                      {info.icon}
                    </div>
                    
                    <h4 style={{
                      color: theme.charcoal,
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '8px',
                      textTransform: 'uppercase'
                    }}>
                      {info.title}
                    </h4>
                    
                    <p style={{
                      color: `${theme.charcoal}cc`,
                      fontSize: '0.9rem',
                      lineHeight: '1.5',
                      marginBottom: '8px'
                    }}>
                      {info.text}
                    </p>
                    
                    <span style={{
                      color: theme.accent,
                      fontSize: '0.8rem',
                      fontStyle: 'italic'
                    }}>
                      {info.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div 
              ref={formRef}
              style={{
                backgroundColor: theme.white,
                borderRadius: '20px',
                padding: '40px',
                border: `2px solid ${theme.charcoal}10`,
                boxShadow: '0 10px 30px rgba(30, 37, 47, 0.1)',
                opacity: 0
              }}
            >
              <h3 style={{
                color: theme.charcoal,
                fontSize: '1.5rem',
                marginBottom: '30px',
                textAlign: 'center'
              }}>
                Start Your Project
              </h3>
              
              <form 
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder={content.form.name}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '15px',
                      backgroundColor: `${theme.beige}`,
                      border: `2px solid ${theme.charcoal}20`,
                      borderRadius: '10px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder={content.form.email}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '15px',
                      backgroundColor: `${theme.beige}`,
                      border: `2px solid ${theme.charcoal}20`,
                      borderRadius: '10px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div>
                  <textarea
                    name="project"
                    placeholder={content.form.project}
                    value={formData.project}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '15px',
                      backgroundColor: `${theme.beige}`,
                      border: `2px solid ${theme.charcoal}20`,
                      borderRadius: '10px',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                </div>
                
                <button
                  type="submit"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.white,
                    padding: '15px 30px',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {content.form.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div {
            padding: 0 20px !important;
          }
          
          #contact > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;