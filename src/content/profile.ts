export type Experience = {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bulletPoints: string[];
};

export type ProjectAttributes = {
  ml: number;
  fullStack: number;
  realTime: number;
  impact: number;
  research: number;
};

export type Project = {
  id: string;
  title: string;
  stack: string[];
  links: { github: string | 'TODO'; live: string | 'TODO' };
  bulletPoints: string[];
  attributes: ProjectAttributes;
  slug?: string;
};

export type SkillGroup = {
  category: string;
  skills: string[];
};

export type Achievement = {
  title: string;
  status: 'FINALIST' | 'CERTIFIED' | 'WAITLIST' | string;
  link?: string | 'TODO';
  issuer?: string;
};

export type ProfileData = {
  name: string;
  email: string;
  phone: {
    number: string;
    hiddenByDefault: boolean;
  };
  links: {
    linkedin: string | 'TODO';
    github: string | 'TODO';
    leetcode: string | 'TODO';
  };
  about: {
    headline: string;
    summary: string;
  };
  experience: Experience[];
  leadership: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  education: {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  };
  achievements: Achievement[];
  contactInfo?: {
    openTo?: string;
    basedIn?: string;
    typicalReplyTime?: string;
  };
};

export const profile: ProfileData = {
  name: "Subhojeet Chanda",
  email: "subhojeetchanda18@gmail.com",
  phone: {
    number: "+91 9835194489",
    hiddenByDefault: true
  },
  links: {
    linkedin: "https://linkedin.com/in/subhojeet-chanda",
    github: "https://github.com/subhojeetchanda",
    leetcode: "https://leetcode.com/u/subhojeetchanda18/"
  },
  about: {
    headline: "Forged in Bokaro. Built to hold up in the real world.",
    summary: "Born in India's Steel City and shaped by deploying ML models on the floor of the SAIL Bokaro Steel Plant. I build explainable, safety-oriented AI systems engineered for real-world impact, prioritizing reliability over hype."
  },
  experience: [
    {
      role: "SDE Intern",
      company: "SecPen Labs",
      location: "Remote",
      startDate: "Apr 2025",
      endDate: "Jul 2025",
      bulletPoints: [
        "Optimized Next.js frontend performance using code-splitting, asset compression, and Tailwind CSS, reducing page-load time by 20%.",
        "Architected a JSON-driven content pipeline with dynamic chapter routing, achieving 100% data consistency across all pages.",
        "Improved technical SEO through structured metadata and sitemap optimization, increasing organic traffic by 15%."
      ]
    },
    {
      role: "Project Trainee",
      company: "SAIL (Steel Authority of India Limited) Bokaro Steel Plant",
      location: "Bokaro",
      startDate: "Jun 2025",
      endDate: "Jul 2025",
      bulletPoints: [
        "Developed and evaluated predictive ML models in Python across 5 industrial datasets, identifying operational patterns that informed 3 process-efficiency recommendations.",
        "Validated model performance against real-world plant data and refined fault-detection logic, improving detection reliability by 12%.",
        "Applied supervised learning and feature-engineering techniques to 4 plant-floor problems, balancing predictive accuracy with deployment scalability."
      ]
    }
  ],
  leadership: [
    {
      role: "AI/ML and Data Analytics Core Team",
      company: "Google Developer Groups (GDG) VIT-AP",
      location: "Amaravati",
      startDate: "Aug 2024",
      endDate: "Jul 2025",
      bulletPoints: [
        "Contributed to AI/ML research initiatives within an 8-member cross-functional core team, evaluating emerging technologies through technical discussions.",
        "Organized 4 technical workshops, hackathons, and coding sessions reaching 150+ students on Google technologies for the student developer community."
      ]
    }
  ],
  projects: [
    {
      id: "text-sensor-fusion",
      slug: "text-sensor-fusion",
      title: "Confidence-Weighted Text-Sensor Fusion for Urban Routing",
      stack: ["Python", "XGBoost", "FastAPI"],
      links: { github: "https://github.com/subhojeetchanda/Confidence-Weighted-Text-Sensor-Fusion-for-Urban-Routing", live: "https://confidence-weighted-text-sensor-fusion-for-urban-production.up.railway.app/" },
      bulletPoints: [
        "Engineered a confidence-weighted multimodal fusion framework in Python, XGBoost, and FastAPI, upweighting text-based hazard signals (municipal advisories, news) over sensor data in proportion to their disagreement with sensor trends.",
        "Designed a dose-based exposure model (concentration × time × activity-adjusted breathing rate) to rank candidate routes by estimated inhaled PM2.5 exposure instead of coarse AQI category.",
        "Benchmarked sensor-only, text-only, naive-fusion, and confidence-weighted XGBoost models, lifting route-safety accuracy by 9%, confirmed via paired Wilcoxon significance testing."
      ],
      attributes: {
        ml: 0.95,
        fullStack: 0.5,
        realTime: 0.4,
        impact: 0.7,
        research: 0.95
      }
    },
    {
      id: "carelink",
      slug: "carelink",
      title: "CareLink: AI Diagnostic Assistant",
      stack: ["Next.js", "Node.js", "TensorFlow", "Firebase", "Socket.io"],
      links: { github: "https://github.com/subhojeetchanda/CareLink", live: "https://care-link-jade.vercel.app/" },
      bulletPoints: [
        "Built a dual-interface AI-assisted radiology platform with Next.js, Node.js, TensorFlow, and Firebase, powered by a DenseNet121 CNN with Grad-CAM for explainable X-ray classification at 91% accuracy.",
        "Combined Tesseract OCR with a FAISS-indexed RAG pipeline over MedlinePlus to translate medical jargon into plain language for patients.",
        "Established a safety layer using WebSockets and browser sensor APIs, enabling fall detection and GPS-based SOS alerts within 3 seconds."
      ],
      attributes: {
        ml: 0.85,
        fullStack: 0.9,
        realTime: 0.7,
        impact: 0.8,
        research: 0.5
      }
    },
    {
      id: "safesphere",
      slug: "safesphere",
      title: "SafeSphere",
      stack: ["Next.js", "Node.js", "Express", "TypeScript", "Hyperledger", "XGBoost"],
      links: { github: "https://github.com/subhojeetchanda/Smart_Tourist_Safety_System", live: "https://safesphere-dashboard.vercel.app" },
      bulletPoints: [
        "Spearheaded a smart tourist safety platform using Next.js, Node.js, Express.js, TypeScript, and XGBoost, cutting incident response time by 30% through anomaly detection and geo-fencing.",
        "Deployed blockchain-backed digital tourist IDs and real-time risk-zone alerts on Hyperledger for tamper-resistant records.",
        "Delivered authority dashboards featuring live geospatial heatmaps, e-FIR automation, and multilingual support."
      ],
      attributes: {
        ml: 0.5,
        fullStack: 0.95,
        realTime: 0.85,
        impact: 0.9,
        research: 0.3
      }
    }
  ],
  skills: [
    {
      category: "Languages",
      skills: ["Java", "Python", "C++", "C", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"]
    },
    {
      category: "Frontend",
      skills: ["React", "Next.js", "Tailwind CSS"]
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "Flask", "FastAPI", "Socket.io"]
    },
    {
      category: "AI/ML",
      skills: ["TensorFlow", "Keras", "XGBoost", "LangChain", "Computer Vision", "RAG", "Predictive Modeling"]
    },
    {
      category: "Databases & Cloud",
      skills: ["PostgreSQL", "MongoDB", "Firebase", "AWS", "Google Cloud", "Microsoft Azure", "Render", "Netlify", "Pinecone"]
    },
    {
      category: "DevOps & Tools",
      skills: ["Git", "GitHub Actions", "Docker", "Postman", "MLflow", "FAISS", "Tesseract OCR"]
    },
    {
      category: "Concepts",
      skills: ["Data Structures & Algorithms", "Full-Stack Architecture", "Reinforcement Learning", "Federated Learning", "Bayesian Optimization", "Sequential Text Parsing"]
    }
  ],
  education: {
    institution: "Vellore Institute of Technology – AP, Amaravati, Andhra Pradesh",
    degree: "B.Tech CSE",
    startDate: "Sep 2023",
    endDate: "Expected May 2027"
  },
  achievements: [
    {
      title: "Smart India Hackathon (SIH) 2025",
      status: "National Finalist (Waitlist)",
      issuer: "Ministry of Education"
    },
    {
      title: "VIT Bhopal Health Hackathon",
      status: "FINALIST",
      issuer: "hosted in collaboration with Johns Hopkins University"
    },
    {
      title: "Data Structures and Algorithms with Java",
      status: "CERTIFIED",
      link: "https://drive.google.com/file/d/1-iQzYZ9D6peJmLGoX71VYBBsoAYxaYMV/view?usp=sharing",
      issuer: "Certificate of Completion"
    },
    {
      title: "The Full Stack Web Development Bootcamp",
      status: "CERTIFIED",
      link: "https://www.udemy.com/certificate/UC-ed1b5942-e0b8-4510-a79c-8589806ab18f/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com",
      issuer: "Udemy"
    }
  ]
};
