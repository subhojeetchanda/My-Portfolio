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
  problem?: string;
  stack: string[];
  links: { github: string | 'TODO'; live: string | 'TODO' };
  bulletPoints: string[];
  attributes: ProjectAttributes;
  slug?: string;
  whyIBuiltThis?: string;
  decisions?: { title: string; reasons: string[] }[];
};

export type FailureEntry = {
  id: string;
  title: string;
  cause: string;
  resolution: string;
  lesson: string;
  project?: string;
  status: 'RESOLVED' | 'ONGOING';
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
    behindTheSystem?: string;
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
  failures: FailureEntry[];
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
      problem: "Mainstream navigation systems optimize purely for time and distance, completely ignoring short-horizon environmental hazards like PM2.5 spikes. Furthermore, accurately predicting these localized hazards is difficult because naively combining continuous physical sensor data with irregular text-based news alerts often degrades AI model performance.",
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
      },
      whyIBuiltThis: "I wanted to bridge the gap between static environmental dashboards and actionable human safety. While researching urban mobility, I noticed a critical disconnect: we have access to vast amounts of physical sensor data and real-time news advisories, yet navigation apps still route pedestrians through hazardous pollution spikes just to save a few minutes. I built this to prove that by intelligently fusing disparate data streams—unstructured text and tabular sensor metrics—we can create a routing engine that prioritizes public health without sacrificing algorithmic efficiency.",
      decisions: [
        { 
          title: "XGBoost Meta-Learner for Confidence-Weighted Fusion", 
          reasons: [
            "Instead of simply concatenating all features into a single black-box model, isolating the text and sensor inputs into separate baselines allowed me to explicitly calculate a \"disagreement score.\"",
            "XGBoost handles the tabular time-series data and sparse text features exceptionally well, and the lightweight meta-learner adds negligible inference latency (sub-millisecond) to the final prediction pipeline."
          ] 
        },
        { 
          title: "Dose-Based Routing over Coarse AQI Avoidance", 
          reasons: [
            "Simple AQI categories (\"Moderate\", \"Unhealthy\") are too broad to effectively rank tightly clustered urban routes.",
            "Calculating the exact inhaled dose (Concentration × Time × Elevation-Adjusted Activity Multiplier) allows the algorithm to correctly determine that a fast 10-minute walk through a moderately polluted zone actually results in less exposure than a slow 25-minute walk through a slightly cleaner zone."
          ] 
        },
        { 
          title: "Google News RSS & TF-IDF Vectorization", 
          reasons: [
            "Relying on public RSS feeds for text advisories completely bypasses the strict rate limits, high costs, and API instability associated with scraping social media platforms like X/Twitter.",
            "TF-IDF provides a fast, lightweight mathematical representation of macro-level city alerts, entirely avoiding the heavy computational overhead required to run dense LLM embeddings during real-time inference."
          ] 
        },
        { 
          title: "SQLite & FastAPI Backend Architecture", 
          reasons: [
            "SQLite provided the perfect lightweight relational structure for executing complex geo-temporal joins (aligning hourly sensor data with irregular text mentions) without the overhead of spinning up a dedicated PostgreSQL cluster.",
            "FastAPI handles the concurrent asynchronous requests required to fetch and process multiple alternative route geometries from OpenRouteService simultaneously, keeping the map UI highly responsive."
          ] 
        }
      ]
    },
    {
      id: "carelink",
      slug: "carelink",
      title: "CareLink: AI Diagnostic Assistant",
      problem: "Medical imaging diagnosis is often bottlenecked by a lack of explainable AI for doctors, while the resulting clinical reports are filled with jargon that leaves patients confused. There is a critical need for a unified platform that accelerates trustworthy diagnosis while bridging the communication gap between providers and patients.",
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
      },
      whyIBuiltThis: "Most medical AI tools stop at the doctor's desk, leaving patients out of the loop. I built this platform to see if I could bridge that gap by engineering an end-to-end pipeline that serves both sides of the clinic: giving radiologists the visual explainability they require to trust an AI, while giving patients the translation tools they need to actually understand their own health data.",
      decisions: [
        { 
          title: "Utilizing DenseNet121 over a custom-built CNN architecture", 
          reasons: [
            "Medical image datasets are often limited. DenseNet121’s architecture encourages heavy feature reuse, making it highly efficient at learning complex textures (like lung opacities) without requiring massive amounts of data or risking severe overfitting.",
            "It easily integrates with Grad-CAM. In clinical settings, raw accuracy (91%) isn't enough; doctors require visual proof. Extracting the gradients from DenseNet allowed the system to generate heatmaps and bounding boxes, providing the \"why\" behind the diagnosis."
          ] 
        },
        { 
          title: "Implementing a FAISS-indexed RAG pipeline with MedlinePlus", 
          reasons: [
            "Preventing AI hallucinations is critical in healthcare. By using Retrieval-Augmented Generation (RAG) bounded strictly to MedlinePlus, the system guarantees that the plain-language translations provided to patients are based entirely on verified, trusted medical literature.",
            "FAISS enables lightning-fast vector similarity searches. When Tesseract OCR extracts dense jargon from a clinical report, FAISS ensures the patient interface remains responsive and instantly fetches the correct educational context."
          ] 
        }
      ]
    },
    {
      id: "safesphere",
      slug: "safesphere",
      title: "SafeSphere",
      problem: "Authorities struggle to monitor tourist safety in remote or high-risk regions due to delayed incident reporting and a lack of real-time tracking. There is a critical need for a system capable of instantly identifying distress signals—such as dangerous route deviations or sudden location drop-offs—to prevent emergencies.",
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
      },
      whyIBuiltThis: "Current safety infrastructure for remote travel is fundamentally reactive—it relies on a tourist manually calling for help when it might already be too late. I built SafeSphere for the Smart India Hackathon 2025 because I wanted to shift this paradigm from reactive to proactive. By leveraging AI to continuously analyze location data and identify subtle behavioral anomalies, we can alert authorities the moment a traveler deviates into danger, bridging the critical gap between an incident occurring and a response being initiated.",
      decisions: [
        { 
          title: "Developing a Custom Data Simulation Engine", 
          reasons: [
            "Because no real-world dataset existed for this highly specific problem, we used OSMnx to programmatically extract actual road networks and topographical data from Sikkim to create a realistic testing environment.",
            "This engine allowed us to synthetically generate both baseline \"normal\" tourist itineraries with realistic dwell times, and critical anomalies like sudden location drop-offs and deviations into geo-fenced high-risk zones."
          ] 
        },
        { 
          title: "Pivoting from an LSTM Autoencoder to an XGBoost Classifier", 
          reasons: [
            "Initial testing with an unsupervised LSTM Autoencoder revealed it was over-generalizing; it learned to reconstruct even anomalous GPS sequences with minimal error, making it ineffective at flagging subtle dangers.",
            "Switching to a supervised XGBoost model allowed us to analyze the statistical \"case file\" of the entire journey. By adjusting the scale_pos_weight to handle class imbalance, we achieved a robust 81% accuracy on unseen test data."
          ] 
        },
        { 
          title: "Utilizing Aggressive Feature Engineering over Raw Time-Series Data", 
          reasons: [
            "Feeding raw, sequential GPS coordinates into the model failed to capture the broader behavioral context necessary to accurately detect distress.",
            "We built a script to transform complex spatial paths into structured statistical summaries—calculating metrics like mean speed, standard deviation of speed, and total duration—which significantly optimized the XGBoost model's predictive capabilities."
          ] 
        }
      ]
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
  ],
  failures: [
    {
      id: "f1",
      title: "Next.js hydration mismatch after code-splitting",
      cause: "After introducing dynamic imports for code-splitting, a component rendered different content on server and client, causing a hydration mismatch and console errors in production.",
      resolution: "Wrapped the affected component with a client-only guard and verified server/client output matched before re-enabling SSR.",
      lesson: "Code-splitting for performance can quietly break SSR assumptions — always check hydration warnings after adding dynamic imports.",
      status: "RESOLVED"
    },
    {
      id: "f2",
      title: "Firebase permission error on write",
      cause: "A feature worked locally but failed in production with a \"permission denied\" error, because Firestore security rules were still set to their default restrictive state.",
      resolution: "Updated the security rules to explicitly allow the required read/write pattern, scoped to authenticated users only.",
      lesson: "Local development often uses relaxed or emulator rules — always test against the real production rule set before shipping.",
      status: "RESOLVED"
    },
    {
      id: "f3",
      title: "XGBoost model degraded on real plant data",
      cause: "A model that performed well on the held-out test split showed much weaker accuracy on live data, likely due to a distribution shift between historical and real-time sensor readings.",
      resolution: "Added input validation and monitored feature distributions, retraining on a more representative recent data window.",
      lesson: "Good test-split accuracy doesn't guarantee real-world performance — data drift needs to be checked separately.",
      status: "RESOLVED"
    }
  ]
};
