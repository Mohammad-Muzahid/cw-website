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

const CompletedProjects = () => {
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

  // Completed projects data - FIXED IMAGE PATHS
  const projects = [
    {
      id: 1,
      title: "Riyadh Airport T3",
      client: "Riyadh Airport Authority",
      description: "At Riyadh Airport Duty Free, Terminal 3, we delivered a fully customized package of high quality display cabinets tailored to the operational needs of the space. The scope included precision-built units featuring smart electric railing systems, customizable display units, specialized lighting systems, and magnetic compartments with card access storage drawers.",
      fullDescription: "At Riyadh Airport Duty Free, Terminal 3, we had the privilege of delivering a fully customized package of high quality display cabinets tailored to the operational needs of the space. The scope included precision-built units featuring:\n\n• A smart electric railing system integrated inside the cabinet structure, allowing shelves to be repositioned easily without adjusting or rewiring electrical connections.\n• Customizable middle display units designed to adapt to various product layouts.\n• A specialized lighting system engineered to enhance product visibility and presentation.\n• Magnetic compartments supported by card access storage drawers.\n\nThis project highlights our capability to produce technical, functional, and aesthetically refined woodwork solutions for high-traffic commercial environments.",
      image: safeRequire('riyadhair64.JPEG'),
      gallery: [
        safeRequire('riyadhair1.JPEG'),
        safeRequire('riyadhair2.JPEG'),
        safeRequire('riyadhair3.JPEG'),
        safeRequire('riyadhair64.JPEG'),
        safeRequire('riyadhair65.JPEG')
      ],
      services: [
        "Sourcing of built in Technology",
        "Custom made units",
        "Installation",
        "Shop Drawings & Submittals"
      ],
      category: "Commercial",
      status: "Completed"
    },
    {
      id: 2,
      title: "Patchi Boutique",
      client: "Patchi Chocolate",
      description: "We executed more than 8 Patchi projects across the Kingdom, delivering a wide range of services from detailed woodwork fabrication and installation to complete fit-out works including lighting, electrical, and MEP.",
      fullDescription: "We had the privilege of executing more than 8 Patchi projects across the Kingdom, delivering a wide range of services — from detailed woodwork fabrication and installation to complete fit-out works including lighting, electrical, and MEP. Our consistent coordination, high-quality finishes, and adherence to brand standards have allowed us to support Patchi's expansion with reliable and timely project delivery.",
      image: safeRequire('p-breida1.jpg'),
      gallery: [
        safeRequire('p-breida1.jpg'),
        safeRequire('p-breida2.jpg'),
        safeRequire('p-touwaik22.jpg'),
        safeRequire('p-touwaik25.jpg')
      ],
      services: [
        "Customized Fabrication",
        "Installation",
        "MEP",
        "Shop drawings",
        "Submittals"
      ],
      category: "Retail",
      status: "Completed"
    },
    {
      id: 3,
      title: "BAT Corporate Offices",
      client: "British American Tobacco",
      description: "We successfully delivered the complete woodwork and joinery package for BAT Head Offices, fully aligned with the approved control book, including premium ALPI veneer from Italy and Consort (UK) door hardware.",
      fullDescription: "We successfully delivered the complete woodwork and joinery package for BAT (British American Tobacco) Head Offices project, fully aligned with the approved control book. The works included sourcing premium ALPI veneer from Italy, supplying Consort (UK) door hardware, and completing all related upholstery with high-quality finishes. Throughout the project, we maintained close coordination with the glass contractor to ensure precise alignment between partitions and doors, resulting in a seamless and refined final outcome.",
      image: safeRequire('bat20.JPEG'),
      gallery: [
        safeRequire('bat1.JPEG'),
        safeRequire('bat2.JPEG'),
        safeRequire('bat57.JPEG')
      ],
      services: [
        "Complete woodwork and joinery fabrication and installation",
        "Supply and installation of ALPI veneer imported from Italy",
        "Supply and installation of all door hardware from Consort (UK)",
        "Custom upholstery works integrated with joinery elements",
        "Coordination with glass contractor for alignment of partitions and doors",
        "Shop drawings, technical detailing, and site measurements",
        "Final finishing, quality control, and project handover"
      ],
      category: "Corporate",
      status: "Completed"
    },
    {
      id: 4,
      title: "Bupa Healthcare Center",
      client: "Bupa Arabia",
      description: "We executed the full woodwork package for Bupa with a design approach centered on durability, modern aesthetics, and cost efficiency using MDF MR panels fully cladded with High Pressure Laminate.",
      fullDescription: "We executed the full woodwork package for Bupa with a design approach centered on durability, modern aesthetics, and cost efficiency. The majority of the works were fabricated using MDF MR (Moisture Resistant) panels fully cladded on both sides with High Pressure Laminate (HPL). This eliminated the need for veneer or paint finishes while achieving a clean, contemporary look that aligns with the client's design intent. Our solution provided a high-quality, long-lasting finish with optimized cost, ensuring the project met both technical and budget requirements.",
      image: safeRequire('bupa77.JPEG'),
      gallery: [
        safeRequire('bupa1.JPEG'),
        safeRequire('bupa81.JPEG'),
        safeRequire('bupa82.JPEG')
      ],
      services: [
        "MDF MR + HPL joinery fabrication",
        "Installation of cabinets, counters, ceiling and wall claddings",
        "Coordination on colors and finishes",
        "Value-engineered material selection",
        "Site measurements and adjustments",
        "Delivery and protection of all items"
      ],
      category: "Healthcare",
      status: "Completed"
    },
    {
      id: 5,
      title: "NDMC Headquarters",
      client: "National Debt Management Co",
      description: "We executed the complete joinery package for NDMC, combining natural walnut veneer strip claddings with premium white duco PU finishes across all executive areas including CEO, Manager, and VIP offices.",
      fullDescription: "We executed the complete joinery package for NDMC, combining natural walnut veneer strip claddings with premium white duco PU finishes. This material mix was used across all executive areas, including the CEO, Manager, and VIP offices. A key challenge was the precise fabrication and installation of the column claddings, which required inclined and stripped patterns using both finishes. The scope also included selected upholstery works, such as the stepped seating in the multipurpose room.",
      image: safeRequire('ndmc16.JPEG'),
      gallery: [
        safeRequire('ndmc1.JPEG'),
        safeRequire('ndmc2.JPEG'),
        safeRequire('ndmc21.JPEG'),
        safeRequire('ndmc22.JPEG'),
        safeRequire('ndmc23.JPEG'),
        safeRequire('ndmc28.JPEG'),
        safeRequire('ndmc29.JPEG')
      ],
      services: [
        "Shop drawings & coordination",
        "Site measurements",
        "Installation & alignment",
        "Decorative elements",
        "Protection & handover"
      ],
      category: "Government",
      status: "Completed"
    },
    {
      id: 6,
      title: "JCD Offices",
      client: "JCD Group",
      description: "We delivered the full joinery and woodwork package for their main HQ office at Zahran Business Center, covering modern kitchenette areas, seating zones, main reception, and complete canteen fit-out.",
      fullDescription: "We delivered the full joinery and woodwork package for their main HQ office at Zahran Business Center, covering modern kitchenette areas, two-one-two seating zones, the main reception, and the complete canteen fit-out. The project included decorative feature walls combining solid wood, mirrors, rattan, and leather for a high-end finish. A key highlight was the fabrication of more than nine Chief Officers' cabinets designed with waved triangular wood fronts, integrated hidden storage, and orange open shelves, creating a modern, functional, and visually distinctive workspace.",
      image: safeRequire('jcd15.JPEG'),
      gallery: [
        safeRequire('jcd1.JPEG'),
        safeRequire('jcd2.JPEG'),
        safeRequire('jcd27.JPEG')
      ],
      services: [
        "Shop drawings & coordination",
        "Site measurements",
        "Joinery fabrication",
        "Installation & alignment",
        "Decorative elements",
        "Protection & handover"
      ],
      category: "Corporate",
      status: "Completed"
    },
    {
      id: 7,
      title: "Le Vesuvio & Madeo Restaurants",
      client: "Fine Dining Group",
      description: "We executed the full fit-out for Le Vesuvio & Madeo Restaurants at JYC, covering all MEP, joinery, and finishing works with specially ordered materials including real brass elements and premium leather.",
      fullDescription: "We executed the full fit-out for Le Vesuvio & Madeo Restaurants at JYC, covering all MEP, joinery, and finishing works. Most materials were specially ordered as per the control book, including real brass elements and premium leather and fabric finishes. The project required continuous coordination and obtaining consultant approvals to ensure compliance with the design and material standards. A key challenge was delivering the bar area exactly as detailed in the drawings, along with the precise fabrication and installation of a fire-rated wooden ceiling.",
      image: safeRequire('madeo10.JPEG'),
      gallery: [
        safeRequire('madeo1.JPEG'),
        safeRequire('madeo2.JPEG'),
        safeRequire('madeo53.JPEG')
      ],
      services: [
        "Shop drawings, coordination & consultant approvals",
        "Site measurements",
        "Full MEP & fit-out works",
        "Joinery fabrication & installation",
        "Brass, leather & special finishes",
        "Protection & handover"
      ],
      category: "Hospitality",
      status: "Completed"
    },
    {
      id: 8,
      title: "SAJA Offices",
      client: "SAJA Holding",
      description: "We executed the complete joinery package for SAJA Offices, including wooden partitions, wall claddings, file cabinets, doors, and ceiling elements with integrated stretch-light features.",
      fullDescription: "We executed the complete joinery package for SAJA Offices, including wooden partitions, wall claddings, file cabinets, doors, and ceiling elements with integrated stretch-light features. All items were fabricated using MDF laminated boards with no paint works, giving a clean and unified modern finish. A key highlight of the project was preparing the wood partitions to receive glass panels embedded directly inside the wood without aluminum profiles, achieving a seamless and high-end appearance.",
      image: safeRequire('saja2.jpg'),
      gallery: [
        safeRequire('saja1.jpg'),
        safeRequire('saja2.jpg'),
        safeRequire('saja16.jpg')
      ],
      services: [
        "Shop drawings & coordination",
        "Site measurements",
        "Laminated MDF joinery fabrication",
        "Partitions, cabinets, cladding & doors",
        "Embedded glass provisions (seamless look)",
        "Installation, protection & handover"
      ],
      category: "Corporate",
      status: "Completed"
    },
    {
      id: 9,
      title: "AMS & W2 Investments Office",
      client: "Various",
      description: "We completed the full fit-out works for the AMS & W2 Head Office, featuring premium micro-cement flooring, classical joinery elements, and several hidden access points between offices.",
      fullDescription: "We completed the full fit-out works for the AMS & W2 Head Office, starting from the sensitive coordination with the Landlord at the Head Quarter Business Park Tower up to the final handover. The project featured premium micro-cement flooring, classical joinery elements, and several hidden access points between offices executed with precise coordination between our team, the designer, and the client to achieve a seamless functional flow.",
      image: safeRequire('ams5.jpg'),
      gallery: [
        safeRequire('ams1.jpg'),
        safeRequire('ams2.jpg'),
        safeRequire('ams38.jpg')
      ],
      services: [
        "Full fit-out execution",
        "Joinery & classical woodworks",
        "Micro-cement flooring works",
        "Landlord & design coordination",
        "Hidden access installations"
      ],
      category: "Corporate",
      status: "Completed"
    },
    {
      id: 10,
      title: "Umm Kareem Villa / Palace",
      client: "Various",
      description: "We handle complete joinery and woodwork packages for private villas, starting from detailed shop drawings and providing full design support when required.",
      fullDescription: "We handle complete joinery and woodwork packages for private villas, starting from the preparation of detailed shop drawings and, when required, providing full design support. Our scope covers fabrication and installation of all joinery elements with high craftsmanship and full project coordination until handover. All works are delivered with long-term quality assurance, including warranties of up to 10 years.",
      image: safeRequire('um_kareem9.JPG'),
      gallery: [
        safeRequire('um_kareem1.jpg'),
        safeRequire('um_kareem2.jpg'),
        safeRequire('um_kareem21.jpg')
      ],
      services: [
        "Shop drawings & design support",
        "Full joinery fabrication",
        "Installation & coordination"
      ],
      category: "Residential",
      status: "Completed"
    },
    {
      id: 11,
      title: "General Private Villas / Palaces",
      client: "Various",
      description: "We handle complete joinery and woodwork packages for private villas, starting from detailed shop drawings and providing full design support when required.",
      fullDescription: "We handle complete joinery and woodwork packages for private villas, starting from the preparation of detailed shop drawings and, when required, providing full design support. Our scope covers fabrication and installation of all joinery elements with high craftsmanship and full project coordination until handover. All works are delivered with long-term quality assurance, including warranties of up to 10 years.",
      image: safeRequire('villa20.JPG'),
      gallery: [
        safeRequire('villa1.JPG'),
        safeRequire('villa2.JPG'),
        safeRequire('villa36.JPG')
      ],
      services: [
        "Shop drawings & design support",
        "Full joinery fabrication",
        "Installation & coordination"
      ],
      category: "Residential",
      status: "Completed"
    },
    {
      id: 12,
      title: "Esnad Villas / Palace",
      client: "Various",
      description: "We handle complete joinery and woodwork packages for private villas, starting from detailed shop drawings and providing full design support when required.",
      fullDescription: "We handle complete joinery and woodwork packages for private villas, starting from the preparation of detailed shop drawings and, when required, providing full design support. Our scope covers fabrication and installation of all joinery elements with high craftsmanship and full project coordination until handover. All works are delivered with long-term quality assurance, including warranties of up to 10 years.",
      image: safeRequire('villa_esnad55.jpg'),
      gallery: [
        safeRequire('villa_esnad1.jpg'),
        safeRequire('villa_esnad2.jpg'),
        safeRequire('villa_esnad95.jpg'),
        safeRequire('villa_esnad96.jpg')
      ],
      services: [
        "Shop drawings & design support",
        "Full joinery fabrication",
        "Installation & coordination"
      ],
      category: "Residential",
      status: "Completed"
    },
    {
      id: 13,
      title: "Muzna Villa / Palace",
      client: "Various",
      description: "We handle complete joinery and woodwork packages for private villas, starting from detailed shop drawings and providing full design support when required.",
      fullDescription: "We handle complete joinery and woodwork packages for private villas, starting from the preparation of detailed shop drawings and, when required, providing full design support. Our scope covers fabrication and installation of all joinery elements with high craftsmanship and full project coordination until handover. All works are delivered with long-term quality assurance, including warranties of up to 10 years.",
      image: safeRequire('muzna_villa1.jpg'),
      gallery: [
        safeRequire('muzna_villa1.jpg'),
        safeRequire('muzna_villa2.jpg'),
        safeRequire('muzna_villa12.jpg'),
        safeRequire('muzna_villa15.jpg'),
        safeRequire('muzna_villa16.jpg')
      ],
      services: [
        "Shop drawings & design support",
        "Full joinery fabrication",
        "Installation & coordination"
      ],
      category: "Residential",
      status: "Completed"
    },
    {
      id: 14,
      title: "Nada Darwish Villa / Palace",
      client: "Various",
      description: "We handle complete joinery and woodwork packages for private villas, starting from detailed shop drawings and providing full design support when required.",
      fullDescription: "We handle complete joinery and woodwork packages for private villas, starting from the preparation of detailed shop drawings and, when required, providing full design support. Our scope covers fabrication and installation of all joinery elements with high craftsmanship and full project coordination until handover. All works are delivered with long-term quality assurance, including warranties of up to 10 years.",
      image: safeRequire('nada_villa3.jpg'),
      gallery: [
        safeRequire('nada_villa1.jpg'),
        safeRequire('nada_villa2.jpg'),
        safeRequire('nada_villa8.jpg')
      ],
      services: [
        "Shop drawings & design support",
        "Full joinery fabrication",
        "Installation & coordination"
      ],
      category: "Residential",
      status: "Completed"
    },
    {
      id: 15,
      title: "Kitchens",
      client: "Various",
      description: "We deliver fully customized kitchen and closet solutions tailored to each client's lifestyle and needs, integrating top-quality European accessories and advanced electrical hinge systems.",
      fullDescription: "With extensive experience in designing and producing kitchens and closet cabinets, we deliver fully customized solutions tailored to each client's lifestyle and needs. We support clients in selecting modern colors, practical layouts, and high-end finishes using moisture-resistant laminated boards or solid wood depending on the design intent. Our work integrates top-quality European accessories such as Blum, Hafele, and Salice, and can include advanced electrical hinge systems for smooth opening and closing. Every kitchen or closet is crafted with precision to ensure functionality, durability, and a refined modern look.",
      image: safeRequire('kitchen69.jpg'),
      gallery: [
        safeRequire('kitchen1.jpg'),
        safeRequire('kitchen2.jpg'),
        safeRequire('kitchen118.jpg')
      ],
      services: [
        "Custom kitchens & closets design",
        "Fabrication using MR boards or solid wood",
        "High-end European accessories",
        "Full installation & customization"
      ],
      category: "Residential",
      status: "Completed"
    },
    {
      id: 16,
      title: "Closets",
      client: "Various",
      description: "We handle complete joinery and woodwork packages for private villas, starting from detailed shop drawings and providing full design support when required.",
      fullDescription: "We handle complete joinery and woodwork packages for private villas, starting from the preparation of detailed shop drawings and, when required, providing full design support. Our scope covers fabrication and installation of all joinery elements with high craftsmanship and full project coordination until handover. All works are delivered with long-term quality assurance, including warranties of up to 10 years.",
      image: safeRequire('closets23.jpg'),
      gallery: [
        safeRequire('closets1.jpg'),
        safeRequire('closets2.jpg'),
        safeRequire('closets28.jpg'),
        safeRequire('closets29.jpg')
      ],
      services: [
        "Shop drawings & design support",
        "Full joinery fabrication",
        "Installation & coordination"
      ],
      category: "Residential",
      status: "Completed"
    },
    {
      id: 16,
      title: "Doors",
      client: "Various",
      description: "We specialize in fabricating and installing internal and external doors, pergolas, and gazebos using premium kiln-dried teak with high-performance treatments resistant to sun and humidity.",
      fullDescription: "We specialize in fabricating and installing a full range of internal and external doors, including solid teak wood doors with optional metal inner structures for added strength. All doors are crafted from premium kiln-dried (KD) teak and finished with high-performance treatments resistant to sun and humidity. The same grade of timber and finishing system is used across our outdoor products such as pergolas, gazebos, and other exterior woodwork, ensuring durability, stability, and long-lasting appearance.",
      image: safeRequire('door36.jpg'),
      gallery: [
        safeRequire('door1.jpg'),
        safeRequire('door2.jpg'),
        safeRequire('door48.jpg')
      ],
      services: [
        "Internal & external teak wood doors",
        "Metal-reinforced structures (when required)",
        "Outdoor pergolas & gazebos",
        "Solar & humidity-resistant finishing"
      ],
      category: "Outdoor",
      status: "Completed"
    },
    {
      id: 17,
      title: "Outdoors",
      client: "Various",
      description: "We specialize in fabricating and installing internal and external doors, pergolas, and gazebos using premium kiln-dried teak with high-performance treatments resistant to sun and humidity.",
      fullDescription: "We specialize in fabricating and installing a full range of internal and external doors, including solid teak wood doors with optional metal inner structures for added strength. All doors are crafted from premium kiln-dried (KD) teak and finished with high-performance treatments resistant to sun and humidity. The same grade of timber and finishing system is used across our outdoor products such as pergolas, gazebos, and other exterior woodwork, ensuring durability, stability, and long-lasting appearance.",
      image: safeRequire('outdoor6.JPG'),
      gallery: [
        safeRequire('outdoor1.JPG'),
        safeRequire('outdoor2.JPG'),
        safeRequire('outdoor55.JPG'),
        safeRequire('outdoor56.JPG')
      ],
      services: [
        "Internal & external teak wood doors",
        "Metal-reinforced structures (when required)",
        "Outdoor pergolas & gazebos",
        "Solar & humidity-resistant finishing"
      ],
      category: "Outdoor",
      status: "Completed"
    },
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
        <p>Loading Projects...</p>
      </div>
    );
  }

  return (
    <div 
      ref={sectionRef}
      id="completed-projects"
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
            OUR <span style={{ color: theme.accent }}>PORTFOLIO</span>
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
            Showcasing our finest woodwork projects across Saudi Arabia
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
                boxShadow: `0 10px 30px ${theme.charcoal}15`,
                border: `2px solid ${theme.accent}20`
              }}
              onClick={() => handleProjectClick(project)}
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector('.project-overlay');
                const details = e.currentTarget.querySelector('.project-details');
                const hoverText = e.currentTarget.querySelector('.hover-text');
                
                overlay.style.opacity = '1';
                details.style.opacity = '0';
                hoverText.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = `0 15px 40px ${theme.charcoal}25`;
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector('.project-overlay');
                const details = e.currentTarget.querySelector('.project-details');
                const hoverText = e.currentTarget.querySelector('.hover-text');
                
                overlay.style.opacity = '0';
                details.style.opacity = '1';
                hoverText.style.opacity = '0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 10px 30px ${theme.charcoal}15`;
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
                }}
              />

              {/* Default Project Details (Visible when not hovering) */}
              <div
                className="project-details"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(180deg, transparent 40%, ${theme.charcoal}dd)`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '30px',
                  transition: 'opacity 0.3s ease',
                  opacity: 1
                }}
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
                    gap: '12px'
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
                  }}
                >
                  <FaExternalLinkAlt />
                  <span>View Project Details</span>
                </div>
              </div>

              {/* Hover Overlay (Visible only on hover) */}
              <div
                className="project-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${theme.charcoal}cc 0%, ${theme.charcoal}dd 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '40px',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none'
                }}
              >
                <div
                  className="hover-text"
                  style={{
                    textAlign: 'center',
                    color: theme.beige,
                    opacity: 0,
                    transition: 'opacity 0.3s ease 0.1s',
                    pointerEvents: 'none'
                  }}
                >
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: theme.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 25px',
                    boxShadow: `0 10px 25px rgba(0,0,0,0.3)`
                  }}>
                    <FaExternalLinkAlt style={{
                      fontSize: '1.8rem',
                      fontWeight: 'bold'
                    }} />
                  </div>
                  <h3 style={{
                    color: theme.beige,
                    fontWeight: '800',
                    fontSize: '1.8rem',
                    marginBottom: '15px',
                    fontFamily: "'Cygre', sans-serif",
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Click for more details
                  </h3>
                  <p style={{
                    color: `${theme.beige}cc`,
                    fontSize: '1rem',
                    fontFamily: "'Cygre', sans-serif",
                    fontWeight: '300',
                    maxWidth: '300px',
                    margin: '0 auto',
                    lineHeight: '1.5'
                  }}>
                    View complete project information, gallery images, and service details
                  </p>
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
            We take pride in delivering exceptional woodwork solutions. Each project represents our commitment to quality, craftsmanship, and client satisfaction.
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
                    gap: '20px',
                    marginBottom: '30px'
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
                      color: `${theme.charcoal}cc`,
                      fontSize: '1rem',
                      fontFamily: "'Cygre', sans-serif"
                    }}>
                      {selectedProject.status}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Gallery Modal - FIXED PROPER LAYOUT */}
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

      {/* Custom CSS - FIXED FOR RESPONSIVE ROWS */}
      <style>{`
        /* Import Cygre font */
        @import url('https://fonts.cdnfonts.com/css/cygre');
        
        /* Hover text responsive styles */
        @media (max-width: 1200px) {
          /* For project hover text on large desktop */
          .hover-text h3 {
            font-size: 1.5rem !important;
          }
          
          .hover-text p {
            font-size: 0.9rem !important;
            max-width: 250px !important;
          }
        }
        
        @media (max-width: 992px) {
          /* For project hover text on tablets */
          .hover-text h3 {
            font-size: 1.3rem !important;
          }
          
          .hover-text p {
            font-size: 0.85rem !important;
            max-width: 220px !important;
          }
          
          div[style*="width: '70px'"] {
            width: 60px !important;
            height: 60px !important;
          }
          
          svg[style*="font-size: '1.8rem'"] {
            font-size: 1.5rem !important;
          }
        }
        
        @media (max-width: 768px) {
          /* For project hover text on small tablets */
          .hover-text h3 {
            font-size: 1.1rem !important;
            margin-bottom: 10px !important;
          }
          
          .hover-text p {
            display: none !important;
          }
          
          div[style*="width: '70px'"] {
            width: 50px !important;
            height: 50px !important;
            margin-bottom: 15px !important;
          }
          
          svg[style*="font-size: '1.8rem'"] {
            font-size: 1.3rem !important;
          }
        }
        
        @media (max-width: 576px) {
          /* For project hover text on mobile */
          .hover-text h3 {
            font-size: 1rem !important;
            font-weight: 700 !important;
            margin-bottom: 8px !important;
          }
          
          .hover-text p {
            display: none !important;
          }
          
          div[style*="width: '70px'"] {
            width: 45px !important;
            height: 45px !important;
            margin-bottom: 12px !important;
          }
          
          svg[style*="font-size: '1.8rem'"] {
            font-size: 1.2rem !important;
          }
        }
        
        /* Responsive styles for Gallery Section */
        @media (max-width: 1400px) {
          /* Gallery Grid for large desktops */
          div[style*="z-index: 2000"] > div:last-child > div {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        
        @media (max-width: 1200px) {
          #completed-projects > div:last-child {
            max-width: 1000px;
          }
          
          #completed-projects h1 {
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
        }
        
        @media (max-width: 992px) {
          #completed-projects > div:last-child {
            max-width: 800px;
          }
          
          #completed-projects > div:last-child > div:nth-child(3) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          #completed-projects h1 {
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
          #completed-projects {
            padding: 0 15px !important;
          }
          
          #completed-projects > div:last-child {
            padding: 20px 0 !important;
          }
          
          #completed-projects h1 {
            font-size: 2.2rem !important;
          }
          
          #completed-projects > div:last-child > div:nth-child(3) {
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
          #completed-projects h1 {
            font-size: 2rem !important;
          }
          
          #completed-projects > div:last-child > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
          
          #completed-projects p {
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
          
          /* For project hover text on very small mobile */
          .hover-text h3 {
            font-size: 0.9rem !important;
          }
          
          div[style*="width: '70px'"] {
            width: 40px !important;
            height: 40px !important;
            margin-bottom: 10px !important;
          }
          
          svg[style*="font-size: '1.8rem'"] {
            font-size: 1rem !important;
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
          #completed-projects {
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
        
        /* Gallery row fixing */
        .gallery-grid {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
          grid-auto-rows: minmax(200px, auto) !important;
          gap: 15px !important;
        }
        
        .gallery-item {
          width: 100% !important;
          height: 200px !important;
          position: relative !important;
        }
        
        /* Touch devices - always show some hover effect */
        @media (hover: none) and (pointer: coarse) {
          .project-overlay {
            opacity: 0.3 !important;
          }
          
          .hover-text {
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CompletedProjects;