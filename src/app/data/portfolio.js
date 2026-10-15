export const projects = [
  {
    id: "smart-traffic-management",
    title: "Smart Traffic Flow Optimization",
    category: "AI & Embedded Systems",
    description: "A smart intersection management system designed to optimize traffic flow, prioritize emergency vehicles, and detect traffic violations using computer vision, AI, IoT, and embedded systems. Presented at the College Fair & Symposium as a competing candidate in the Best in Thesis category.",
    image: "/STOPLIGHT.png",
    technologies: ["Python", "YOLOv8", "OpenCV", "Raspberry Pi", "Arduino", "Tesseract OCR"],
    github: null,
    aiAssisted: true,
    featured: true,
    caseStudy: {
      problem: "Traditional traffic light systems operate on fixed timers, leading to severe congestion and dangerous delays for emergency vehicles.",
      solution: "An intelligent, dynamic traffic control system that uses real-time computer vision to adjust light timings based on vehicle density, while automatically clearing paths for detected ambulances.",
      architecture: `
      [Camera Feed] 
           ↓
      [Raspberry Pi 5] (Edge Processing)
           ↓
      [YOLOv8 Object Detection] ➔ [Tesseract OCR for Plates]
           ↓
      [Traffic Logic Analyzer] ➔ [Database / Cloud Logging]
           ↓
      [Arduino Serial Comm]
           ↓
      [Traffic Light Relays]
      `,
      features: [
        "Real-time Vehicle Density Detection",
        "Automated Ambulance Prioritization",
        "Traffic Violation & License Plate Recognition",
        "Hardware-in-the-loop IoT Control"
      ],
      contribution: "Contributed to the design and implementation of AI logic for real-time vehicle and ambulance detection using object detection techniques, and assisted in integrating adaptive traffic light control based on detected vehicle data.",
      results: "Presented at the College Fair & Symposium as a competing candidate in the Best in Thesis category."
    }
  },
  {
    id: "erp-application",
    title: "ERP Application",
    category: "Enterprise Software",
    description: "An independent, full-stack Enterprise Resource Planning system built for a startup client. Modules span HR, Procurement (Purchase Orders), Transportation Management (TMS), and Enterprise Asset Management (EAMS), with a professional intranet portal dashboard. Currently refactoring toward Clean Architecture (Service Layer, Repository Pattern, EF Core).",
    image: "/ERP2.png",
    technologies: ["ASP.NET Core 8 MVC", "SQL Server", "C#", "EF Core"],
    github: null,
    aiAssisted: true,
    featured: true,
    inDevelopment: true
  },
  {
    id: "jarvis-job-assistant",
    title: "JARVIS — AI Job-Hunting Assistant",
    category: "AI & Automation",
    description: "A free, self-hosted AI agent that helps find entry-level tech jobs and interacts via Facebook Messenger. Built with n8n workflows and a locally-run Ollama LLM to avoid paid API costs entirely.",
    image: "/n8n1.png",
    technologies: ["n8n", "Ollama", "Docker", "Facebook Messenger API"],
    github: null,
    aiAssisted: true,
    featured: true,
    inDevelopment: true
  },
  {
    id: "supplier-rfq-portal",
    title: "Supplier Portal & RFQ Management System",
    category: "Web Application",
    description: "An end-to-end procurement system — from PRF intake and RFQ generation to automated supplier email distribution with deadlines, real-time dashboard tracking, deadline-breach notifications, award selection workflow, and supplier invoice upload upon award confirmation.",
    image: "/everst.png",
    technologies: ["Google Apps Script", "Google Workspace", "JavaScript"],
    github: null,
    featured: true,
    aiAssisted: true
  },
  {
    id: "erica-ai-assistant",
    title: "ERICA Pre-Employment AI",
    category: "AI & Automation",
    description: "An interactive AI assistant utilizing the Gemini API to analyze uploaded corporate reference documents and answer pre-employment questions for HR.",
    image: "/GM.png",
    technologies: ["Google Apps Script", "Gemini API", "JavaScript"],
    github: null,
    featured: true
  },
  {
    id: "telegram-moderation-bot",
    title: "Telegram Group Chat Analytics & Moderation Bot",
    category: "AI & Automation",
    description: "A Telegram bot performing automated data scraping and NLP-based word frequency analysis across group chats, identifying commonly used and flagged terms using AI classification with per-user attribution for moderation insights.",
    image: "/TG.png",
    technologies: ["Python", "NLP", "Telegram API"],
    github: null,
    featured: false
  },
  {
    id: "network-infra-simulation",
    title: "Network Infrastructure Simulation",
    category: "Networking",
    description: "Designed a multi-floor network topology; configured inter-floor PC communication, set up Microsoft Server on a VM, and verified client–server connectivity.",
    image: "/net.png",
    technologies: ["Cisco Packet Tracer", "Virtual Machine", "Windows Server"],
    github: null,
    featured: false,
    
  } 
];

export const skills = {
  frontend: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  backend: ["C#", "ASP.NET Core", "Python", "Google Apps Script"],
  database: ["SQL Server", "Excel", "Supabase"],
  ai: ["YOLOv8", "OpenCV", "Tesseract OCR", "Gemini API", "n8n", "Ollama"],
  tools: ["Git & GitHub", "Cisco Packet Tracer", "Docker", "VS Code", "Google Colab", "Arduino IDE"]
};

export const currentlyLearning = ["Python (advanced/mastering)"];

export const experience = [
  {
    id: 1,
    role: "IT Intern – Systems Development",
    company: "Everest International Academy",
    date: "February 2026 – April 2026",
    achievements: [
      "Built the IT Asset Issuance & Management System (Google Apps Script) with QR code generation, issuance workflow automation, warranty alerts, and digital agreement processing — currently in active use by the IT department.",
      "Developed the HR Pre-Employment & Document Management Portal, automating collection, monitoring, and validation of pre-employment requirements — currently deployed and in active use by HR.",
      "Implemented script-based tools generating weekly IT asset summaries and operational status updates for management.",
      "Developed inter-sheet synchronization logic for real-time data consistency across departmental records; conducted UAT for all deployed portals.",
      "Produced automated document templates with embedded digital signature functionality to standardize agreement processing."
    ],
    technologies: ["Google Apps Script", "JavaScript", "Automation"]
  },
  {
    id: 2,
    role: "IT Intern – Project-Based Extension",
    company: "Everest International Academy",
    date: "April 2026 – May 2026",
    achievements: [
      "Developed the Supplier Portal & RFQ Management System end-to-end — from PRF intake and RFQ generation to automated supplier email distribution, real-time dashboard tracking, deadline-breach notifications, award selection workflow, and supplier invoice upload upon award confirmation."
    ],
    technologies: ["Google Apps Script", "Google Workspace", "JavaScript"]
  }
];

export const awards = [
  { title: "1st Place", event: "YGG Game Hackathon", date: "2023 & 2024" },
  { title: "Best in Web Programming", event: "Army's Angel Integrated School", date: "Nov 2021" },
  { title: "Highest Social Media Engagement Award", event: "College Fair & Symposium", date: "Nov 2025" },
  { title: "Participant, Cyber Security Track", event: "IT Olympics", date: "Nov 2025" }
];