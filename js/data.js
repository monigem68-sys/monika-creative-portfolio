/**
 * MONIKA // PORTFOLIO DATA ARCHITECTURE
 * Structured case studies, skills taxonomy, and competition milestones.
 */

window.PORTFOLIO_DATA = {
  projects: [
    {
      id: "uniind",
      number: "01",
      title: "UNIIND CONNECT",
      subtitle: "AI-Powered Societal Challenge & Collaboration Platform",
      category: "AI & Fullstack Engineering",
      tech: ["AI", "Flask", "Python", "UI/UX Design", "REST APIs"],
      image: "assets/images/mockup-uniind.svg",
      summary: "An intelligent platform uniting academic minds, domain mentors, and community stakeholders to tackle complex societal challenges through algorithmic clustering and structured problem-solving pipelines.",
      challenge: "Societal problem-solving initiatives often suffer from fragmented communication, redundant efforts, and lack of technical mentorship. Innovators struggle to connect with verified mentors, while actionable challenges remain unaddressed due to poor discovery channels.",
      solution: "Engineered a centralized platform featuring an AI clustering engine that maps submitted civic challenges against registered mentor skill matrices. Built with Flask and Python backend with a high-contrast, accessible UI/UX interface optimized for rapid collaboration and milestone verification.",
      architecture: [
        { label: "Backend Core", value: "Python 3.11 / Flask RESTful API" },
        { label: "AI Engine", value: "Custom Semantic Clustering & NLP Pipeline" },
        { label: "Frontend", value: "Modern Responsive Modular UI / CSS Grid" },
        { label: "Data Store", value: "Relational Schema with Role-Based ACL" }
      ],
      metrics: [
        { label: "Resolution Efficiency", value: "+42%" },
        { label: "Mentor Match Latency", value: "< 1.5s" },
        { label: "Active Nodes", value: "1,800+" }
      ],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: "complaint-system",
      number: "02",
      title: "ONLINE COMPLAINT MANAGEMENT SYSTEM",
      subtitle: "Digital Grievance Resolution Platform with Role-Based Workflows",
      category: "Fullstack Web Development",
      tech: ["Flask", "SQLite", "HTML5", "CSS3", "JavaScript"],
      image: "assets/images/mockup-complaint.svg",
      summary: "A transparent grievance tracking portal that streamlines citizen issue reporting, departmental dispatching, and resolution auditing through strict role-based access control.",
      challenge: "Legacy paper-based and siloed digital grievance systems lacked transparency, resulting in lost complaints, unclear escalation paths, and zero accountability for departmental SLAs.",
      solution: "Developed an end-to-end digital lifecycle system with distinct portals for Citizens, Field Officers, Department Supervisors, and Admins. Features automated escalation timers, immutable ticket logs, and real-time status dashboards.",
      architecture: [
        { label: "Server Architecture", value: "Flask Microframework (WSGI)" },
        { label: "Database Layer", value: "SQLite with Normalized Relational Models" },
        { label: "Authentication", value: "Session Cryptography & RBAC Middleware" },
        { label: "Interface", value: "Modern Glassmorphic Dark UI & Data Tables" }
      ],
      metrics: [
        { label: "Ticket Lifecycle", value: "-65% Duration" },
        { label: "Audit Accuracy", value: "100% Immutable" },
        { label: "Citizen Satisfaction", value: "4.8 / 5.0" }
      ],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: "creative-exp",
      number: "03",
      title: "CREATIVE WEB EXPERIENCE",
      subtitle: "Experimental Spatial Interface Focused on Interaction & Storytelling",
      category: "Creative Technology & WebGL",
      tech: ["Three.js", "WebGL", "Creative Code", "UI/UX", "GLSL"],
      image: "assets/images/mockup-creative.svg",
      summary: "A boundary-pushing digital product concept exploring real-time kinetic typography, GPU particle physics, and audio-reactive visual storytelling for modern web browsers.",
      challenge: "Bridging the gap between high-performance 60FPS WebGL graphics and accessible web design without causing browser memory leaks or sluggish interactions on low-powered devices.",
      solution: "Architected a modular rendering engine leveraging Three.js and custom vertex/fragment shaders with adaptive DPR (device pixel ratio) throttling, combined with seamless page transitions and magnetic micro-interactions.",
      architecture: [
        { label: "Graphics Pipeline", value: "Three.js r128 / Custom GLSL Shaders" },
        { label: "Physics Engine", value: "Kinetic Spring Lerp & Vector Calculations" },
        { label: "Performance", value: "Adaptive 60 FPS Throttling" },
        { label: "Audio Synthesis", value: "Web Audio API Harmonic Oscillators" }
      ],
      metrics: [
        { label: "Target Frame Rate", value: "60 FPS Constant" },
        { label: "Bundle Overhead", value: "< 95KB Gzip" },
        { label: "Interaction Delight", value: "100%" }
      ],
      demoUrl: "#",
      githubUrl: "#"
    }
  ],

  achievements: [
    {
      title: "BEXO Template Wars Finalist",
      category: "COMPETITION",
      date: "2026",
      desc: "Selected for standout innovation in futuristic editorial web design and creative-technology UI architecture.",
      icon: "trophy"
    },
    {
      title: "National Civic Hackathon",
      category: "HACKATHONS",
      date: "2025",
      desc: "Architected the core AI-driven problem-solving model for community empowerment platforms.",
      icon: "code"
    },
    {
      title: "Fullstack Engineering Certification",
      category: "CERTIFICATIONS",
      date: "2025",
      desc: "Demonstrated advanced mastery in Python backend frameworks, REST APIs, and database normalization.",
      icon: "award"
    },
    {
      title: "UI/UX Design Systems Mastery",
      category: "MILESTONES",
      date: "2024",
      desc: "Engineered scalable design tokens, micro-interaction models, and accessible digital agency component libraries.",
      icon: "sparkles"
    }
  ]
};
