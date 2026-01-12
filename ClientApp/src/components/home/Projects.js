import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const projectsRef = useRef([]);
  const bgImageRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  const theme = {
    charcoal: '#1e252f',
    beige: '#e3e1d7',
    accent: '#8b7355',
    lightAccent: '#a89070',
    white: '#ffffff'
  };

  const content = {
    title: "Our Portfolio",
    subtitle: "Showcasing excellence in custom woodwork and craftsmanship",
    projects: [
      {
        id: 1,
        title: "Completed Projects",
        category: "Finished Works",
        image: "/images/outdoor6.JPG",
        description: "Explore our portfolio of successfully delivered custom woodwork projects including furniture, cabinetry, and architectural elements.",
        stats: {
          completed: "50+",
          clients: "100+",
          rating: "4.9/5"
        },
        features: [
          "Custom furniture & cabinetry",
          "Architectural woodwork",
          "Commercial installations",
          "Residential renovations"
        ],
        link: "/projects/completed",
        status: "completed"
      },
      {
        id: 2,
        title: "Ongoing Projects", 
        category: "In Progress",
        image: "/images/ongoing-projects.jpg",
        description: "Discover our current works in progress and upcoming woodwork installations across residential and commercial projects.",
        stats: {
          active: "15+",
          timeline: "2-6 months",
          team: "Expert Craftsmen"
        },
        features: [
          "Luxury residential projects",
          "Commercial fit-outs",
          "Custom joinery works",
          "Restoration projects"
        ],
        link: "/projects/ongoing",
        status: "ongoing"
      }
    ]
  };

  useEffect(() => {
    setIsMounted(true);
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleProjectHover = useCallback((index) => {
    setHoveredProject(index);
    const project = projectsRef.current[index];
    if (project) {
      gsap.to(project, {
        scale: 1.02,
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, []);

  const handleProjectLeave = useCallback((index) => {
    setHoveredProject(null);
    const project = projectsRef.current[index];
    if (project) {
      gsap.to(project, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, []);

  useEffect(() => {
    if (!isMounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Simplified ScrollTrigger for background
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          gsap.to(bgImageRef.current, {
            opacity: 0.7,
            duration: 1,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          gsap.to(bgImageRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.in"
          });
        }
      });

      // Main animations
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
          y: 40
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }
      )
      .fromTo(subtitleRef.current,
        { 
          opacity: 0, 
          y: 20
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.6,
          ease: "power3.out"
        },
        "-=0.5"
      );

      // Animate projects
      projectsRef.current.forEach((project, index) => {
        if (project) {
          gsap.fromTo(project,
            { 
              opacity: 0, 
              y: 40
            },
            { 
              opacity: 1, 
              y: 0,
              duration: 0.8,
              delay: 0.1 * index,
              ease: "power3.out",
              scrollTrigger: {
                trigger: project,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                once: true
              }
            }
          );
        }
      });

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isMounted]);

  const addToRefs = useCallback((el) => {
    if (el && !projectsRef.current.includes(el)) {
      projectsRef.current.push(el);
    }
  }, []);

  if (!isMounted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: theme.beige,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{ color: theme.charcoal }}>Loading Projects...</p>
      </div>
    );
  }

  return (
    <section 
      ref={sectionRef}
      id="projects"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: theme.beige,
        padding: '100px 0',
        color: theme.charcoal
      }}
    >
      <div 
        ref={bgImageRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/projects.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${theme.beige} 0%, ${theme.beige}cc 50%, ${theme.beige}88 100%)`,
          zIndex: 1
        }} />
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 40px',
        width: '100%',
        position: 'relative',
        zIndex: 3
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2
            ref={titleRef}
            style={{
              fontWeight: '700',
              color: theme.charcoal,
              marginBottom: '20px',
              fontSize: '3rem',
              fontFamily: "'Cygre', sans-serif"
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
              lineHeight: '1.6',
              fontFamily: "'Cygre', sans-serif"
            }}
          >
            {content.subtitle}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '40px',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          {content.projects.map((project, index) => (
            <div
              key={project.id}
              ref={addToRefs}
              onMouseEnter={() => handleProjectHover(index)}
              onMouseLeave={() => handleProjectLeave(index)}
              style={{
                background: theme.beige,
                borderRadius: '20px',
                overflow: 'hidden',
                border: `2px solid ${theme.charcoal}20`,
                boxShadow: '0 10px 30px rgba(30, 37, 47, 0.1)',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 4
              }}
              onClick={() => window.location.href = project.link}
            >
              <div style={{
                padding: '30px',
                position: 'relative',
                borderBottom: `2px solid ${theme.charcoal}10`
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '15px'
                }}>
                  <div>
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{
                        color: theme.charcoal,
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        fontFamily: "'Cygre', sans-serif",
                        textTransform: 'uppercase'
                      }}>
                        {project.category}
                      </span>
                    </div>
                    <h3 style={{
                      color: theme.charcoal,
                      fontWeight: '700',
                      fontSize: '2rem',
                      margin: 0,
                      fontFamily: "'Cygre', sans-serif"
                    }}>
                      {project.title}
                    </h3>
                  </div>
                  
                  <div style={{
                    backgroundColor: project.status === 'completed' ? 
                      `${theme.accent}20` : `${theme.lightAccent}20`,
                    border: `2px solid ${project.status === 'completed' ? theme.accent : theme.lightAccent}`,
                    borderRadius: '20px',
                    padding: '8px 20px'
                  }}>
                    <span style={{
                      color: project.status === 'completed' ? theme.accent : theme.lightAccent,
                      fontWeight: '600',
                      fontSize: '0.85rem',
                      fontFamily: "'Cygre', sans-serif"
                    }}>
                      {project.status === 'completed' ? 'COMPLETED' : 'IN PROGRESS'}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{
                height: '250px',
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: `linear-gradient(to top, ${theme.charcoal}dd, transparent)`,
                  padding: '20px 30px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} style={{ textAlign: 'center' }}>
                      <div style={{
                        color: theme.beige,
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        marginBottom: '5px'
                      }}>
                        {value}
                      </div>
                      <div style={{
                        color: `${theme.beige}cc`,
                        fontSize: '0.8rem',
                        textTransform: 'uppercase'
                      }}>
                        {key}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '30px' }}>
                <p style={{
                  color: `${theme.charcoal}cc`,
                  marginBottom: '25px',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>
                  {project.description}
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  marginBottom: '30px'
                }}>
                  {project.features.map((feature, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px'
                    }}>
                      <div style={{ color: theme.accent }}>•</div>
                      <span style={{
                        color: theme.charcoal,
                        fontSize: '0.9rem'
                      }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '20px',
                  borderTop: `1px solid ${theme.charcoal}10`
                }}>
                  <Link
                    to={project.link}
                    style={{
                      backgroundColor: theme.accent,
                      color: theme.beige,
                      borderRadius: '20px',
                      fontWeight: '600',
                      textDecoration: 'none',
                      padding: '12px 30px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme.lightAccent;
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme.accent;
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    View Projects →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;