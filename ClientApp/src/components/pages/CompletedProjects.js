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
        safeRequire('riyadhair4.JPEG'),
        safeRequire('riyadhair5.JPEG'),
        safeRequire('riyadhair6.JPEG'),
        safeRequire('riyadhair7.JPEG'),
        safeRequire('riyadhair8.JPEG'),
        safeRequire('riyadhair9.JPEG'),
        safeRequire('riyadhair10.JPEG'),
        safeRequire('riyadhair11.JPEG'),
        safeRequire('riyadhair12.JPEG'),
        safeRequire('riyadhair13.JPEG'),
        safeRequire('riyadhair14.JPEG'),
        safeRequire('riyadhair15.JPEG'),
        safeRequire('riyadhair16.JPEG'),
        safeRequire('riyadhair17.JPEG'),
        safeRequire('riyadhair18.JPEG'),
        safeRequire('riyadhair19.JPEG'),
        safeRequire('riyadhair20.JPEG'),
        safeRequire('riyadhair21.JPEG'),
        safeRequire('riyadhair22.JPEG'),
        safeRequire('riyadhair23.JPEG'),
        safeRequire('riyadhair24.JPEG'),
        safeRequire('riyadhair25.JPEG'),
        safeRequire('riyadhair26.JPEG'),
        safeRequire('riyadhair27.JPEG'),
        safeRequire('riyadhair28.JPEG'),
        safeRequire('riyadhair29.JPEG'),
        safeRequire('riyadhair30.JPEG'),
        safeRequire('riyadhair31.JPEG'),
        safeRequire('riyadhair32.JPEG'),
        safeRequire('riyadhair33.JPEG'),
        safeRequire('riyadhair34.JPEG'),
        safeRequire('riyadhair35.JPEG'),
        safeRequire('riyadhair36.JPEG'),
        safeRequire('riyadhair37.JPEG'),
        safeRequire('riyadhair38.JPEG'),
        safeRequire('riyadhair39.JPEG'),
        safeRequire('riyadhair40.JPEG'),
        safeRequire('riyadhair41.JPEG'), 
        safeRequire('riyadhair42.JPEG'),
        safeRequire('riyadhair43.JPEG'),
        safeRequire('riyadhair44.JPEG'),
        safeRequire('riyadhair45.JPEG'),
        safeRequire('riyadhair46.JPEG'),
        safeRequire('riyadhair47.JPEG'),
        safeRequire('riyadhair48.JPEG'),
        safeRequire('riyadhair49.JPEG'),
        safeRequire('riyadhair50.JPEG'),
        safeRequire('riyadhair51.JPEG'),
        safeRequire('riyadhair52.JPEG'),
        safeRequire('riyadhair53.JPEG'),
        safeRequire('riyadhair54.JPEG'),
        safeRequire('riyadhair55.JPEG'),
        safeRequire('riyadhair56.JPEG'),
        safeRequire('riyadhair57.JPEG'),
        safeRequire('riyadhair58.JPEG'),
        safeRequire('riyadhair59.JPEG'),
        safeRequire('riyadhair60.JPEG'),
        safeRequire('riyadhair61.JPEG'),
        safeRequire('riyadhair62.JPEG'),
        safeRequire('riyadhair63.JPEG'),
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
        safeRequire('p-breida3.jpg'),
        safeRequire('p-breida4.jpg'),
        safeRequire('p-breida5.jpg'),
        safeRequire('p-breida6.jpg'),
        safeRequire('p-breida7.jpg'),
        safeRequire('p-breida8.jpg'),
        safeRequire('p-breida9.jpg'),
        safeRequire('p-breida10.jpg'),
        safeRequire('p-breida11.jpg'),
        safeRequire('p-breida12.jpg'),
        safeRequire('p-breida13.jpg'),
        safeRequire('p-breida14.jpg'),
        safeRequire('p-breida15.jpg'),
        safeRequire('p-breida16.jpg'),
        safeRequire('p-breida17.jpg'),
        safeRequire('p-breida18.jpg'),
        safeRequire('p-breida19.jpg'),
        safeRequire('p-breida20.jpg'),
        safeRequire('p-breida21.jpg'),
        safeRequire('p-breida22.jpg'),
        safeRequire('p-breida23.jpg'),
        safeRequire('p-breida24.jpg'),
        safeRequire('p-breida25.jpg'),
        safeRequire('p-breida26.jpg'),
        safeRequire('p-breida27.jpg'),
        safeRequire('p-breida28.jpg'),
        safeRequire('p-breida29.jpg'),
        safeRequire('p-breida30.jpg'),
        safeRequire('p-breida31.jpg'),
        safeRequire('p-breida32.jpg'),
        safeRequire('p-breida33.jpg'),
        safeRequire('p-breida34.jpg'),
        safeRequire('p-breida35.jpg'),
        safeRequire('p-breida36.jpg'),
        safeRequire('p-breida37.jpg'),
        safeRequire('p-breida38.jpg'),
        safeRequire('p-breida39.jpg'),
        safeRequire('p-breida40.jpg'),
        safeRequire('p-breida41.jpg'),
        safeRequire('p-breida42.jpg'),
        safeRequire('p-breida43.jpg'),
        safeRequire('p-breida44.jpg'),
        safeRequire('p-breida45.jpg'),
        safeRequire('p-breida46.jpg'),
        safeRequire('p-breida47.jpg'),
        safeRequire('p-breida48.jpg'),
        safeRequire('p-breida49.jpg'),
        safeRequire('p-breida50.jpg'),
        safeRequire('p-breida51.jpg'),
        safeRequire('p-breida52.jpg'),
        safeRequire('p-breida53.jpg'),
        safeRequire('p-breida54.jpg'),
        safeRequire('p-breida55.jpg'),
        safeRequire('p-breida56.jpg'),
        safeRequire('p-breida57.jpg'),
        safeRequire('p-breida58.jpg'),
        safeRequire('p-breida59.jpg'),
        safeRequire('p-breida60.jpg'),
        safeRequire('p-breida61.jpg'),
        safeRequire('p-breida62.jpg'),
        safeRequire('p-breida63.jpg'),
        safeRequire('p-breida64.jpg'),
        safeRequire('p-breida65.jpg'),
        safeRequire('p-breida66.jpg'),
        safeRequire('p-breida67.jpg'),
        safeRequire('p-breida68.jpg'),
        safeRequire('p-breida69.jpg'),
        safeRequire('p-breida70.jpg'),
        safeRequire('p-breida71.jpg'),
        safeRequire('p-breida72.jpg'),
        safeRequire('p-breida73.jpg'),
        safeRequire('p-breida74.jpg'),
        safeRequire('p-breida75.jpg'),
        safeRequire('p-breida76.jpg'),
        safeRequire('p-breida77.jpg'),
        safeRequire('p-breida78.jpg'),
        safeRequire('p-breida79.jpg'),
        safeRequire('p-breida80.jpg'),
        safeRequire('p-breida81.jpg'),
        safeRequire('p-breida82.jpg'),
        safeRequire('p-breida83.jpg'),
        safeRequire('p-breida84.jpg'),
        safeRequire('p-breida85.jpg'),
        safeRequire('p-breida86.jpg'),
        safeRequire('p-breida87.jpg'),
        safeRequire('p-breida88.jpg'),
        safeRequire('p-breida89.jpg'),
        safeRequire('p-breida90.jpg'),
        safeRequire('p-breida91.jpg'),
        safeRequire('p-breida92.jpg'),
        safeRequire('p-prestige1.jpg'),
        safeRequire('p-prestige2.jpg'),
        safeRequire('p-prestige3.jpg'),
        safeRequire('p-prestige4.jpg'),
        safeRequire('p-prestige5.jpg'),
        safeRequire('p-prestige6.jpg'),
        safeRequire('p-prestige7.jpg'),
        safeRequire('p-prince1.jpg'),
        safeRequire('p-prince2.jpg'),
        safeRequire('p-prince3.jpg'),
        safeRequire('p-prince4.jpg'),
        safeRequire('p-prince5.jpg'),
        safeRequire('p-prince6.jpg'),
        safeRequire('p-prince7.jpg'),
        safeRequire('p-prince8.jpg'),
        safeRequire('p-prince9.jpg'),
        safeRequire('p-prince10.jpg'),
        safeRequire('p-prince11.jpg'),
        safeRequire('p-prince12.jpg'),
        safeRequire('p-prince13.jpg'),
        safeRequire('p-prince14.jpg'),
        safeRequire('p-prince15.jpg'),
        safeRequire('p-prince16.jpg'),
        safeRequire('p-prince17.jpg'),
        safeRequire('p-prince18.jpg'),
        safeRequire('p-prince19.jpg'),
        safeRequire('p-prince20.jpg'),
        safeRequire('p-park1.jpg'),
        safeRequire('p-park2.jpg'),
        safeRequire('p-park3.jpg'),
        safeRequire('p-park4.jpg'),
        safeRequire('p-park5.jpg'),
        safeRequire('p-park6.jpg'),
        safeRequire('p-park7.jpg'),
        safeRequire('p-park8.jpg'),
        safeRequire('p-park9.jpg'),
        safeRequire('p-park10.jpg'),
        safeRequire('p-park11.jpg'),
        safeRequire('p-park12.jpg'),
        safeRequire('p-park13.jpg'),
        safeRequire('p-park14.jpg'),
        safeRequire('p-touwaik1.jpg'),
        safeRequire('p-touwaik2.jpg'),
        safeRequire('p-touwaik3.jpg'),
        safeRequire('p-touwaik4.jpg'),
        safeRequire('p-touwaik5.jpg'),
        safeRequire('p-touwaik6.jpg'),
        safeRequire('p-touwaik7.jpg'),
        safeRequire('p-touwaik8.jpg'),
        safeRequire('p-touwaik9.jpg'),
        safeRequire('p-touwaik10.jpg'),
        safeRequire('p-touwaik11.jpg'),
        safeRequire('p-touwaik12.jpg'),
        safeRequire('p-touwaik13.jpg'),
        safeRequire('p-touwaik14.jpg'),
        safeRequire('p-touwaik15.jpg'),
        safeRequire('p-touwaik16.jpg'),
        safeRequire('p-touwaik17.jpg'),
        safeRequire('p-touwaik18.jpg'),
        safeRequire('p-touwaik19.jpg'),
        safeRequire('p-touwaik20.jpg'),
        safeRequire('p-touwaik21.jpg'),
        safeRequire('p-touwaik22.jpg'),
        safeRequire('p-touwaik23.jpg'),
        safeRequire('p-touwaik24.jpg'),
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
        safeRequire('bat3.JPEG'),
        safeRequire('bat4.JPEG'),
        safeRequire('bat5.JPEG'),
        safeRequire('bat6.JPEG'),
        safeRequire('bat7.JPEG'),
        safeRequire('bat8.JPEG'),
        safeRequire('bat9.JPEG'),
        safeRequire('bat10.JPEG'),
        safeRequire('bat11.JPEG'),
        safeRequire('bat12.JPEG'),
        safeRequire('bat13.JPEG'),
        safeRequire('bat14.JPEG'),
        safeRequire('bat15.JPEG'),
        safeRequire('bat16.JPEG'),
        safeRequire('bat17.JPEG'),
        safeRequire('bat18.JPEG'),
        safeRequire('bat19.JPEG'),
        safeRequire('bat20.JPEG'),
        safeRequire('bat21.JPEG'),
        safeRequire('bat22.JPEG'),
        safeRequire('bat23.JPEG'),
        safeRequire('bat24.JPEG'),
        safeRequire('bat25.JPEG'),
        safeRequire('bat26.JPEG'),
        safeRequire('bat27.JPEG'),
        safeRequire('bat28.JPEG'),
        safeRequire('bat29.JPEG'),
        safeRequire('bat30.JPEG'),
        safeRequire('bat31.JPEG'),
        safeRequire('bat32.JPEG'),
        safeRequire('bat33.JPEG'),
        safeRequire('bat34.JPEG'),
        safeRequire('bat35.JPEG'),
        safeRequire('bat36.JPEG'),
        safeRequire('bat37.JPEG'),
        safeRequire('bat38.JPEG'),
        safeRequire('bat39.JPEG'),
        safeRequire('bat40.JPEG'),
        safeRequire('bat41.JPEG'),
        safeRequire('bat42.JPEG'),
        safeRequire('bat43.JPEG'),
        safeRequire('bat44.JPEG'),
        safeRequire('bat45.JPEG'),
        safeRequire('bat46.JPEG'),
        safeRequire('bat47.JPEG'),
        safeRequire('bat48.JPEG'),
        safeRequire('bat49.JPEG'),
        safeRequire('bat50.JPEG'),
        safeRequire('bat51.JPEG'),
        safeRequire('bat52.JPEG'),
        safeRequire('bat53.JPEG'),
        safeRequire('bat54.JPEG'),
        safeRequire('bat55.JPEG'),
        safeRequire('bat56.JPEG'),
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
        safeRequire('bupa2.JPEG'),
        safeRequire('bupa3.JPEG'),
        safeRequire('bupa4.JPEG'),
        safeRequire('bupa5.JPEG'),
        safeRequire('bupa6.JPEG'),
        safeRequire('bupa7.JPEG'),
        safeRequire('bupa8.JPEG'),
        safeRequire('bupa9.JPEG'), 
        safeRequire('bupa10.JPEG'),
        safeRequire('bupa11.JPEG'),
        safeRequire('bupa12.JPEG'),
        safeRequire('bupa13.JPEG'),
        safeRequire('bupa14.JPEG'),
        safeRequire('bupa15.JPEG'),
        safeRequire('bupa16.JPEG'),
        safeRequire('bupa17.JPEG'),
        safeRequire('bupa18.JPEG'),
        safeRequire('bupa19.JPEG'),
        safeRequire('bupa20.JPEG'),
        safeRequire('bupa21.JPEG'),
        safeRequire('bupa22.JPEG'),
        safeRequire('bupa23.JPEG'),
        safeRequire('bupa24.JPEG'),
        safeRequire('bupa25.JPEG'),
        safeRequire('bupa26.JPEG'),
        safeRequire('bupa27.JPEG'),
        safeRequire('bupa28.JPEG'),
        safeRequire('bupa29.JPEG'),
        safeRequire('bupa30.JPEG'),
        safeRequire('bupa31.JPEG'),
        safeRequire('bupa32.JPEG'),
        safeRequire('bupa33.JPEG'),
        safeRequire('bupa34.JPEG'),
        safeRequire('bupa35.JPEG'),
        safeRequire('bupa36.JPEG'),
        safeRequire('bupa37.JPEG'),
        safeRequire('bupa38.JPEG'),
        safeRequire('bupa39.JPEG'),
        safeRequire('bupa40.JPEG'),
        safeRequire('bupa41.JPEG'),
        safeRequire('bupa42.JPEG'),
        safeRequire('bupa43.JPEG'),
        safeRequire('bupa44.JPEG'),
        safeRequire('bupa45.JPEG'),
        safeRequire('bupa46.JPEG'),
        safeRequire('bupa47.JPEG'),
        safeRequire('bupa48.JPEG'),
        safeRequire('bupa49.JPEG'),
        safeRequire('bupa50.JPEG'),
        safeRequire('bupa51.JPEG'),
        safeRequire('bupa52.JPEG'),
        safeRequire('bupa53.JPEG'),
        safeRequire('bupa54.JPEG'),
        safeRequire('bupa55.JPEG'),
        safeRequire('bupa56.JPEG'),
        safeRequire('bupa57.JPEG'),
        safeRequire('bupa58.JPEG'),
        safeRequire('bupa59.JPEG'),
        safeRequire('bupa60.JPEG'),
        safeRequire('bupa61.JPEG'),
        safeRequire('bupa62.JPEG'),
        safeRequire('bupa63.JPEG'),
        safeRequire('bupa64.JPEG'),
        safeRequire('bupa65.JPEG'),
        safeRequire('bupa66.JPEG'),
        safeRequire('bupa67.JPEG'),
        safeRequire('bupa68.JPEG'),
        safeRequire('bupa69.JPEG'),
        safeRequire('bupa70.JPEG'),
        safeRequire('bupa71.JPEG'),
        safeRequire('bupa72.JPEG'),
        safeRequire('bupa73.JPEG'),
        safeRequire('bupa74.JPEG'),
        safeRequire('bupa75.JPEG'),
        safeRequire('bupa76.JPEG'),
        safeRequire('bupa77.JPEG'),
        safeRequire('bupa78.JPEG'),
        safeRequire('bupa79.JPEG'),
        safeRequire('bupa80.JPEG'),
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
        safeRequire('ndmc3.JPEG'),
        safeRequire('ndmc4.JPEG'),
        safeRequire('ndmc5.JPEG'),
        safeRequire('ndmc6.JPEG'),
        safeRequire('ndmc7.JPEG'),
        safeRequire('ndmc8.JPEG'),
        safeRequire('ndmc9.JPEG'),
        safeRequire('ndmc10.JPEG'),
        safeRequire('ndmc11.JPEG'),
        safeRequire('ndmc12.JPEG'),
        safeRequire('ndmc13.JPEG'),
        safeRequire('ndmc14.JPEG'),
        safeRequire('ndmc15.JPEG'),
        safeRequire('ndmc16.JPEG'),
        safeRequire('ndmc17.JPEG'),
        safeRequire('ndmc18.JPEG'),
        safeRequire('ndmc19.JPEG'),
        safeRequire('ndmc20.JPEG'),
        safeRequire('ndmc21.JPEG'),
        safeRequire('ndmc22.JPEG'),
        safeRequire('ndmc23.JPEG'),
        safeRequire('ndmc24.JPEG'),
        safeRequire('ndmc25.JPEG'),
        safeRequire('ndmc26.JPEG'),
        safeRequire('ndmc27.JPEG'),
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
        safeRequire('jcd3.JPEG'),
        safeRequire('jcd4.JPEG'),
        safeRequire('jcd5.JPEG'),
        safeRequire('jcd6.JPEG'),
        safeRequire('jcd7.JPEG'),
        safeRequire('jcd8.JPEG'),
        safeRequire('jcd9.JPEG'),
        safeRequire('jcd10.JPEG'),
        safeRequire('jcd11.JPEG'),
        safeRequire('jcd12.JPEG'),
        safeRequire('jcd13.JPEG'),
        safeRequire('jcd14.JPEG'),
        safeRequire('jcd15.JPEG'),
        safeRequire('jcd16.JPEG'),
        safeRequire('jcd17.JPEG'),
        safeRequire('jcd18.JPEG'),
        safeRequire('jcd19.JPEG'),
        safeRequire('jcd20.JPEG'),
        safeRequire('jcd21.JPEG'),
        safeRequire('jcd22.JPEG'),
        safeRequire('jcd23.JPEG'),
        safeRequire('jcd24.JPEG'),
        safeRequire('jcd25.JPEG'),
        safeRequire('jcd26.JPEG'),
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
        safeRequire('madeo3.JPEG'),
        safeRequire('madeo4.JPEG'),
        safeRequire('madeo5.JPEG'),
        safeRequire('madeo6.JPEG'),
        safeRequire('madeo7.JPEG'),
        safeRequire('madeo8.JPEG'),
        safeRequire('madeo9.JPEG'),
        safeRequire('madeo10.JPEG'),
        safeRequire('madeo11.JPEG'),
        safeRequire('madeo12.JPEG'),
        safeRequire('madeo13.JPEG'),
        safeRequire('madeo14.JPEG'),
        safeRequire('madeo15.JPEG'),
        safeRequire('madeo16.JPEG'),
        safeRequire('madeo17.JPEG'),
        safeRequire('madeo18.JPEG'),
        safeRequire('madeo19.JPEG'),
        safeRequire('madeo20.JPEG'),
        safeRequire('madeo21.JPEG'),
        safeRequire('madeo22.JPEG'),
        safeRequire('madeo23.JPEG'),
        safeRequire('madeo24.JPEG'),
        safeRequire('madeo25.JPEG'),
        safeRequire('madeo26.JPEG'),
        safeRequire('madeo27.JPEG'),
        safeRequire('madeo28.JPEG'),
        safeRequire('madeo29.JPEG'),
        safeRequire('madeo30.JPEG'),
        safeRequire('madeo31.JPEG'),
        safeRequire('madeo32.JPEG'),
        safeRequire('madeo33.JPEG'),
        safeRequire('madeo34.JPEG'),
        safeRequire('madeo35.JPEG'),
        safeRequire('madeo36.JPEG'),
        safeRequire('madeo37.JPEG'),
        safeRequire('madeo38.JPEG'),
        safeRequire('madeo39.JPEG'),
        safeRequire('madeo40.JPEG'),
        safeRequire('madeo41.JPEG'),
        safeRequire('madeo42.JPEG'),
        safeRequire('madeo43.JPEG'), 
        safeRequire('madeo44.JPEG'),
        safeRequire('madeo45.JPEG'),
        safeRequire('madeo46.JPEG'),
        safeRequire('madeo47.JPEG'),
        safeRequire('madeo48.JPEG'),
        safeRequire('madeo49.JPEG'),
        safeRequire('madeo50.JPEG'),
        safeRequire('madeo51.JPEG'),
        safeRequire('madeo52.JPEG'),
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
        safeRequire('saja3.jpg'),
        safeRequire('saja4.jpg'),
        safeRequire('saja5.jpg'),
        safeRequire('saja6.jpg'),
        safeRequire('saja7.jpg'),
        safeRequire('saja8.jpg'),
        safeRequire('saja9.jpg'),
        safeRequire('saja10.jpg'),
        safeRequire('saja11.jpg'),
        safeRequire('saja12.jpg'),
        safeRequire('saja13.jpg'),
        safeRequire('saja14.jpg'),
        safeRequire('saja15.jpg'),
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
        safeRequire('ams3.jpg'),
        safeRequire('ams4.jpg'),
        safeRequire('ams5.jpg'),
        safeRequire('ams6.jpg'),
        safeRequire('ams7.jpg'),
        safeRequire('ams8.jpg'),
        safeRequire('ams9.jpg'),
        safeRequire('ams10.jpg'),
        safeRequire('ams11.jpg'),
        safeRequire('ams12.jpg'),
        safeRequire('ams13.jpg'),
        safeRequire('ams14.jpg'),
        safeRequire('ams15.jpg'),
        safeRequire('ams16.jpg'),
        safeRequire('ams17.jpg'),
        safeRequire('ams18.jpg'),
        safeRequire('ams19.jpg'),
        safeRequire('ams20.jpg'),
        safeRequire('ams21.jpg'),
        safeRequire('ams22.jpg'),
        safeRequire('ams23.jpg'),
        safeRequire('ams24.jpg'),
        safeRequire('ams25.jpg'),
        safeRequire('ams26.jpg'),
        safeRequire('ams27.jpg'),
        safeRequire('ams28.jpg'),
        safeRequire('ams29.jpg'),
        safeRequire('ams30.jpg'),
        safeRequire('ams31.jpg'),
        safeRequire('ams32.jpg'),
        safeRequire('ams33.jpg'),
        safeRequire('ams34.jpg'),
        safeRequire('ams35.jpg'),
        safeRequire('ams36.jpg'),
        safeRequire('ams37.jpg'),
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
        safeRequire('um_kareem3.jpg'),
        safeRequire('um_kareem4.jpg'),
        safeRequire('um_kareem5.jpg'),
        safeRequire('um_kareem6.jpg'),
        safeRequire('um_kareem7.jpg'),
        safeRequire('um_kareem8.jpg'),
        safeRequire('um_kareem9.jpg'),
        safeRequire('um_kareem10.jpg'),
        safeRequire('um_kareem11.jpg'),
        safeRequire('um_kareem12.jpg'),
        safeRequire('um_kareem13.jpg'),
        safeRequire('um_kareem14.jpg'),
        safeRequire('um_kareem15.jpg'),
        safeRequire('um_kareem16.jpg'),
        safeRequire('um_kareem17.jpg'),
        safeRequire('um_kareem18.jpg'),
        safeRequire('um_kareem19.jpg'),
        safeRequire('um_kareem20.jpg'),
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
        safeRequire('villa3.JPG'),
        safeRequire('villa4.JPG'),
        safeRequire('villa5.JPG'),
        safeRequire('villa6.JPG'),
        safeRequire('villa7.JPG'),
        safeRequire('villa8.JPG'),
        safeRequire('villa9.JPG'),
        safeRequire('villa10.JPG'),
        safeRequire('villa11.JPG'),
        safeRequire('villa12.JPG'),
        safeRequire('villa13.JPG'),
        safeRequire('villa14.JPG'),
        safeRequire('villa15.JPG'),
        safeRequire('villa16.JPG'),
        safeRequire('villa17.JPG'),
        safeRequire('villa18.JPG'),
        safeRequire('villa19.JPG'),
        safeRequire('villa20.JPG'),
        safeRequire('villa21.JPG'),
        safeRequire('villa22.JPG'),
        safeRequire('villa23.JPG'),
        safeRequire('villa24.JPG'),
        safeRequire('villa25.JPG'),
        safeRequire('villa26.JPG'),
        safeRequire('villa27.JPG'),
        safeRequire('villa28.JPG'),
        safeRequire('villa29.JPG'),
        safeRequire('villa30.JPG'),
        safeRequire('villa31.JPG'),
        safeRequire('villa32.JPG'),
        safeRequire('villa33.JPG'),
        safeRequire('villa34.JPG'),
        safeRequire('villa35.JPG'),
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
        safeRequire('villa_esnad3.jpg'),
        safeRequire('villa_esnad4.jpg'),
        safeRequire('villa_esnad5.jpg'),
        safeRequire('villa_esnad6.jpg'),
        safeRequire('villa_esnad7.jpg'),
        safeRequire('villa_esnad8.jpg'),
        safeRequire('villa_esnad9.jpg'),
        safeRequire('villa_esnad10.jpg'),
        safeRequire('villa_esnad11.jpg'),
        safeRequire('villa_esnad12.jpg'),
        safeRequire('villa_esnad13.jpg'),
        safeRequire('villa_esnad14.jpg'),
        safeRequire('villa_esnad15.jpg'),
        safeRequire('villa_esnad16.jpg'),
        safeRequire('villa_esnad17.jpg'),
        safeRequire('villa_esnad18.jpg'),
        safeRequire('villa_esnad19.jpg'),
        safeRequire('villa_esnad20.jpg'),
        safeRequire('villa_esnad21.jpg'),
        safeRequire('villa_esnad22.jpg'),
        safeRequire('villa_esnad23.jpg'),
        safeRequire('villa_esnad24.jpg'),
        safeRequire('villa_esnad25.jpg'),
        safeRequire('villa_esnad26.jpg'),
        safeRequire('villa_esnad27.jpg'),
        safeRequire('villa_esnad28.jpg'),
        safeRequire('villa_esnad29.jpg'),
        safeRequire('villa_esnad30.jpg'),
        safeRequire('villa_esnad31.jpg'),
        safeRequire('villa_esnad32.jpg'),
        safeRequire('villa_esnad33.jpg'),
        safeRequire('villa_esnad34.jpg'),
        safeRequire('villa_esnad35.jpg'),
        safeRequire('villa_esnad36.jpg'),
        safeRequire('villa_esnad37.jpg'),
        safeRequire('villa_esnad38.jpg'),
        safeRequire('villa_esnad39.jpg'),
        safeRequire('villa_esnad40.jpg'),
        safeRequire('villa_esnad41.jpg'),
        safeRequire('villa_esnad42.jpg'),
        safeRequire('villa_esnad43.jpg'),
        safeRequire('villa_esnad44.jpg'),
        safeRequire('villa_esnad45.jpg'),
        safeRequire('villa_esnad46.jpg'),
        safeRequire('villa_esnad47.jpg'),
        safeRequire('villa_esnad48.jpg'),
        safeRequire('villa_esnad49.jpg'),
        safeRequire('villa_esnad50.jpg'),
        safeRequire('villa_esnad51.jpg'),
        safeRequire('villa_esnad52.jpg'),
        safeRequire('villa_esnad53.jpg'),
        safeRequire('villa_esnad54.jpg'),
        safeRequire('villa_esnad55.jpg'),
        safeRequire('villa_esnad56.jpg'),
        safeRequire('villa_esnad57.jpg'),
        safeRequire('villa_esnad58.jpg'),
        safeRequire('villa_esnad59.jpg'),
        safeRequire('villa_esnad60.jpg'),
        safeRequire('villa_esnad61.jpg'),
        safeRequire('villa_esnad62.jpg'),
        safeRequire('villa_esnad63.jpg'),
        safeRequire('villa_esnad64.jpg'),
        safeRequire('villa_esnad65.jpg'),
        safeRequire('villa_esnad66.jpg'),
        safeRequire('villa_esnad67.jpg'),
        safeRequire('villa_esnad68.jpg'),
        safeRequire('villa_esnad69.jpg'),
        safeRequire('villa_esnad70.jpg'),
        safeRequire('villa_esnad71.jpg'),
        safeRequire('villa_esnad72.jpg'),
        safeRequire('villa_esnad73.jpg'),
        safeRequire('villa_esnad74.jpg'),
        safeRequire('villa_esnad75.jpg'),
        safeRequire('villa_esnad76.jpg'),
        safeRequire('villa_esnad77.jpg'),
        safeRequire('villa_esnad78.jpg'),
        safeRequire('villa_esnad79.jpg'),
        safeRequire('villa_esnad80.jpg'),
        safeRequire('villa_esnad81.jpg'),
        safeRequire('villa_esnad82.jpg'),
        safeRequire('villa_esnad83.jpg'),
        safeRequire('villa_esnad84.jpg'),
        safeRequire('villa_esnad85.jpg'),
        safeRequire('villa_esnad86.jpg'),
        safeRequire('villa_esnad87.jpg'),
        safeRequire('villa_esnad88.jpg'),
        safeRequire('villa_esnad89.jpg'),
        safeRequire('villa_esnad90.jpg'),
        safeRequire('villa_esnad91.jpg'),
        safeRequire('villa_esnad92.jpg'),
        safeRequire('villa_esnad93.jpg'),
        safeRequire('villa_esnad94.jpg'),
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
        safeRequire('muzna_villa3.jpg'),
        safeRequire('muzna_villa4.jpg'),
        safeRequire('muzna_villa5.jpg'),
        safeRequire('muzna_villa6.jpg'),
        safeRequire('muzna_villa7.jpg'),
        safeRequire('muzna_villa8.jpg'),
        safeRequire('muzna_villa9.jpg'),
        safeRequire('muzna_villa10.jpg'),
        safeRequire('muzna_villa11.jpg'),
        safeRequire('muzna_villa12.jpg'),
        safeRequire('muzna_villa13.jpg'),
        safeRequire('muzna_villa14.jpg'),
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
        safeRequire('nada_villa3.jpg'),
        safeRequire('nada_villa4.jpg'),
        safeRequire('nada_villa5.jpg'),
        safeRequire('nada_villa6.jpg'),
        safeRequire('nada_villa7.jpg'),
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
        safeRequire('kitchen3.jpg'),
        safeRequire('kitchen4.jpg'),
        safeRequire('kitchen5.jpg'),
        safeRequire('kitchen6.jpg'),
        safeRequire('kitchen7.jpg'),
        safeRequire('kitchen8.jpg'),
        safeRequire('kitchen9.jpg'),
        safeRequire('kitchen10.jpg'),
        safeRequire('kitchen11.jpg'),
        safeRequire('kitchen12.jpg'),
        safeRequire('kitchen13.jpg'),
        safeRequire('kitchen14.jpg'),
        safeRequire('kitchen15.jpg'),
        safeRequire('kitchen16.jpg'),
        safeRequire('kitchen17.jpg'),
        safeRequire('kitchen18.jpg'),
        safeRequire('kitchen19.jpg'),
        safeRequire('kitchen20.jpg'),
        safeRequire('kitchen21.jpg'),
        safeRequire('kitchen22.jpg'),
        safeRequire('kitchen23.jpg'),
        safeRequire('kitchen24.jpg'),
        safeRequire('kitchen25.jpg'),
        safeRequire('kitchen26.jpg'),
        safeRequire('kitchen27.jpg'),
        safeRequire('kitchen28.jpg'),
        safeRequire('kitchen29.jpg'),
        safeRequire('kitchen30.jpg'),
        safeRequire('kitchen31.jpg'),
        safeRequire('kitchen32.jpg'),
        safeRequire('kitchen33.jpg'),
        safeRequire('kitchen34.jpg'),
        safeRequire('kitchen35.jpg'),
        safeRequire('kitchen36.jpg'),
        safeRequire('kitchen37.jpg'),
        safeRequire('kitchen38.jpg'),
        safeRequire('kitchen39.jpg'),
        safeRequire('kitchen40.jpg'),
        safeRequire('kitchen41.jpg'),
        safeRequire('kitchen42.jpg'),
        safeRequire('kitchen43.jpg'),
        safeRequire('kitchen44.jpg'),
        safeRequire('kitchen45.jpg'),
        safeRequire('kitchen46.jpg'),
        safeRequire('kitchen47.jpg'),
        safeRequire('kitchen48.jpg'),
        safeRequire('kitchen49.jpg'),
        safeRequire('kitchen50.jpg'),
        safeRequire('kitchen51.jpg'),
        safeRequire('kitchen52.jpg'),
        safeRequire('kitchen53.jpg'),
        safeRequire('kitchen54.jpg'),
        safeRequire('kitchen55.jpg'),
        safeRequire('kitchen56.jpg'),
        safeRequire('kitchen57.jpg'),
        safeRequire('kitchen58.jpg'),
        safeRequire('kitchen59.jpg'),
        safeRequire('kitchen60.jpg'),
        safeRequire('kitchen61.jpg'),
        safeRequire('kitchen62.jpg'),
        safeRequire('kitchen63.jpg'),
        safeRequire('kitchen64.jpg'),
        safeRequire('kitchen65.jpg'),
        safeRequire('kitchen66.jpg'),
        safeRequire('kitchen67.jpg'),
        safeRequire('kitchen68.jpg'),
        safeRequire('kitchen69.jpg'),
        safeRequire('kitchen70.jpg'),
        safeRequire('kitchen71.jpg'),
        safeRequire('kitchen72.jpg'),
        safeRequire('kitchen73.jpg'),
        safeRequire('kitchen74.jpg'),
        safeRequire('kitchen75.jpg'),
        safeRequire('kitchen76.jpg'),
        safeRequire('kitchen77.jpg'),
        safeRequire('kitchen78.jpg'),
        safeRequire('kitchen79.jpg'),
        safeRequire('kitchen80.jpg'),
        safeRequire('kitchen81.jpg'),
        safeRequire('kitchen82.jpg'),
        safeRequire('kitchen83.jpg'),
        safeRequire('kitchen84.jpg'),
        safeRequire('kitchen85.jpg'),
        safeRequire('kitchen86.jpg'),
        safeRequire('kitchen87.jpg'),
        safeRequire('kitchen88.jpg'),
        safeRequire('kitchen89.jpg'),
        safeRequire('kitchen90.jpg'),
        safeRequire('kitchen91.jpg'),
        safeRequire('kitchen92.jpg'),
        safeRequire('kitchen93.jpg'),
        safeRequire('kitchen94.jpg'),
        safeRequire('kitchen95.jpg'),
        safeRequire('kitchen96.jpg'),
        safeRequire('kitchen97.jpg'),
        safeRequire('kitchen98.jpg'),
        safeRequire('kitchen99.jpg'),
        safeRequire('kitchen100.jpg'),
        safeRequire('kitchen101.jpg'),
        safeRequire('kitchen102.jpg'),
        safeRequire('kitchen103.jpg'),
        safeRequire('kitchen104.jpg'),
        safeRequire('kitchen105.jpg'),
        safeRequire('kitchen106.jpg'),
        safeRequire('kitchen107.jpg'),
        safeRequire('kitchen108.jpg'),
        safeRequire('kitchen109.jpg'),
        safeRequire('kitchen110.jpg'),
        safeRequire('kitchen111.jpg'),
        safeRequire('kitchen112.jpg'),
        safeRequire('kitchen113.jpg'),
        safeRequire('kitchen114.jpg'),
        safeRequire('kitchen115.jpg'),
        safeRequire('kitchen116.jpg'),
        safeRequire('kitchen117.jpg'),
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
        safeRequire('closets3.jpg'),
        safeRequire('closets4.jpg'),
        safeRequire('closets5.jpg'),
        safeRequire('closets6.jpg'),
        safeRequire('closets7.jpg'),
        safeRequire('closets8.jpg'),
        safeRequire('closets9.jpg'),
        safeRequire('closets10.jpg'),
        safeRequire('closets11.jpg'),
        safeRequire('closets12.jpg'),
        safeRequire('closets13.jpg'),
        safeRequire('closets14.jpg'),
        safeRequire('closets15.jpg'),
        safeRequire('closets16.jpg'),
        safeRequire('closets17.jpg'),
        safeRequire('closets18.jpg'),
        safeRequire('closets19.jpg'),
        safeRequire('closets20.jpg'),
        safeRequire('closets21.jpg'),
        safeRequire('closets22.jpg'),
        safeRequire('closets23.jpg'),
        safeRequire('closets24.jpg'),
        safeRequire('closets25.jpg'),
        safeRequire('closets26.jpg'),
        safeRequire('closets27.jpg'),
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
        safeRequire('door3.jpg'),
        safeRequire('door4.jpg'),
        safeRequire('door5.jpg'),
        safeRequire('door6.jpg'),
        safeRequire('door7.jpg'),
        safeRequire('door8.jpg'),
        safeRequire('door9.jpg'),
        safeRequire('door10.jpg'),
        safeRequire('door11.jpg'),
        safeRequire('door12.jpg'),
        safeRequire('door13.jpg'),
        safeRequire('door14.jpg'),
        safeRequire('door15.jpg'),
        safeRequire('door16.jpg'),
        safeRequire('door17.jpg'),
        safeRequire('door18.jpg'),
        safeRequire('door19.jpg'),
        safeRequire('door20.jpg'),
        safeRequire('door21.jpg'),
        safeRequire('door22.jpg'),
        safeRequire('door23.jpg'),
        safeRequire('door24.jpg'),
        safeRequire('door25.jpg'),
        safeRequire('door26.jpg'),
        safeRequire('door27.jpg'),
        safeRequire('door28.jpg'),
        safeRequire('door29.jpg'),
        safeRequire('door30.jpg'),
        safeRequire('door31.jpg'),
        safeRequire('door32.jpg'),
        safeRequire('door33.jpg'),
        safeRequire('door34.jpg'),
        safeRequire('door35.jpg'),
        safeRequire('door36.jpg'),
        safeRequire('door37.jpg'),
        safeRequire('door38.jpg'),
        safeRequire('door39.jpg'),
        safeRequire('door40.jpg'),
        safeRequire('door41.jpg'),
        safeRequire('door42.jpg'),
        safeRequire('door43.jpg'),
        safeRequire('door44.jpg'),
        safeRequire('door45.jpg'),
        safeRequire('door46.jpg'),
        safeRequire('door47.jpg'),
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
        safeRequire('outdoor3.JPG'),
        safeRequire('outdoor4.JPG'),
        safeRequire('outdoor5.JPG'),
        safeRequire('outdoor6.JPG'),
        safeRequire('outdoor7.JPG'),
        safeRequire('outdoor8.JPG'),
        safeRequire('outdoor9.JPG'),
        safeRequire('outdoor10.JPG'),
        safeRequire('outdoor11.JPG'),
        safeRequire('outdoor12.JPG'),
        safeRequire('outdoor13.JPG'),
        safeRequire('outdoor14.JPG'),
        safeRequire('outdoor15.JPG'),
        safeRequire('outdoor16.JPG'),
        safeRequire('outdoor17.JPG'),
        safeRequire('outdoor18.JPG'),
        safeRequire('outdoor19.JPG'),
        safeRequire('outdoor20.JPG'),
        safeRequire('outdoor21.JPG'),
        safeRequire('outdoor22.JPG'),
        safeRequire('outdoor23.JPG'),
        safeRequire('outdoor24.JPG'),
        safeRequire('outdoor25.JPG'),
        safeRequire('outdoor26.JPG'),
        safeRequire('outdoor27.JPG'),
        safeRequire('outdoor28.JPG'),
        safeRequire('outdoor29.JPG'),
        safeRequire('outdoor30.JPG'),
        safeRequire('outdoor31.JPG'),
        safeRequire('outdoor32.JPG'),
        safeRequire('outdoor33.JPG'),
        safeRequire('outdoor34.JPG'),
        safeRequire('outdoor35.JPG'),
        safeRequire('outdoor36.JPG'),
        safeRequire('outdoor37.JPG'),
        safeRequire('outdoor38.JPG'),
        safeRequire('outdoor39.JPG'),
        safeRequire('outdoor40.JPG'),
        safeRequire('outdoor41.JPG'),
        safeRequire('outdoor42.JPG'),
        safeRequire('outdoor43.JPG'),
        safeRequire('outdoor44.JPG'),
        safeRequire('outdoor45.JPG'),
        safeRequire('outdoor46.JPG'),
        safeRequire('outdoor47.JPG'),
        safeRequire('outdoor48.JPG'),
        safeRequire('outdoor49.JPG'),
        safeRequire('outdoor50.JPG'),
        safeRequire('outdoor51.JPG'),
        safeRequire('outdoor52.JPG'),
        safeRequire('outdoor53.JPG'),
        safeRequire('outdoor54.JPG'),
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
      `}</style>
    </div>
  );
};

export default CompletedProjects;