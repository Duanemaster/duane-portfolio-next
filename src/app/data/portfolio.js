export const projects = [
  {
    id: "smart-traffic-management",
    title: "Smart Traffic Flow Optimization",
    category: "AI & Embedded Systems",
    description: "A smart intersection management system designed to optimize traffic flow, prioritize emergency vehicles, and detect traffic violations using computer vision, AI, IoT, and embedded systems. Presented at the College Fair & Symposium as a competing candidate in the Best in Thesis category.",
    image: "/STOPLIGHT.png",
    loom: "https://www.loom.com/share/1fb69fd310dc4e6fb5c27a71a9bec097",
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
    inDevelopment: true,
    features: [
      "Role-based access control (SuperUser, Admin, Staff/Employee) with dynamic claims mapping and custom login handling",
      "Enterprise portal hub with live clock, personalized greeting, real-time activity feed and role-based module routing (Administration hidden from Staff)",
      "HR module: admin command center with DTR overview, leave balances, employee tracking and approval queue, plus an employee self-service portal for DTR, leave balances, payslips and bulletin board",
      "Procurement and supply chain (DelMahChain): approvals, active purchase orders, vendor logs and Chart.js purchasing trends",
      "Role-guarded sidebar that hides the Vendor, Goods and Bank masterlists from non-admin users via ICurrentUserService",
      "UI polish: full-screen loading overlays and SweetAlert2 dialogs replacing native confirm and alert pop-ups"
    ]
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
    id: "transportation-management-system",
    title: "Transportation Management System (TMS)",
    category: "Enterprise Software",
    loom: "https://www.loom.com/share/5d87438840c4496ba4551f05f5b42213",
    description: "A full-stack Transportation Management System that digitizes fleet operations, dispatch management, driver tracking and automated reporting. A C# backend API serves a real-time dispatcher dashboard, and a lightweight Google Apps Script driver app supports GPS simulation and offline use. Nearly finished; not yet published on GitHub.",
    image: "/TMS.png", 
    technologies: ["C# .NET 8", "ASP.NET Core Web API", "Entity Framework Core", "SQL Server", "JavaScript", "Chart.js", "Leaflet.js", "Google Apps Script"],
    github: null,
    featured: true,
    inDevelopment: true,
    features: [
      "Dispatcher dashboard: live fleet status, dispatches over time, truck distribution charts, and live tracking on Leaflet maps with Esri ArcGIS tiles",
      "Driver mobile web app: multi-stage trips (Loading, En Route, Unloading, Return to Garage), compressed Proof of Delivery photo upload, emergency SOS alerts, dark mode",
      "Role-based access control with JWT and bcrypt password hashing on SQL Server",
      "Real-time location logging, OSRM dynamic routing and automated dispatch history",
      "Gmail SMTP email alerts using Google App Passwords"
    ]
  },
  {
    id: "bayanihan-os",
    title: "Bayanihan OS",
    category: "Web Application",
    description: "A mobile-responsive disaster response and relief platform for LGUs and emergency response teams in the Philippines. Users report incidents with a map pin dropper, and coordinators triage, verify or reject reports with an audit trail. In development: map polish, dashboard analytics and relief management.",
    image: "/BAYANIHAN.png", 
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "Supabase", "MapLibre GL JS", "React-Map-GL"],
    github: null,
    featured: true,
    inDevelopment: true,
    features: [
      "Split-screen login with Supabase Auth sessions and logout",
      "Responsive dashboard with desktop sidebar and mobile drawer navigation",
      "Incident reporting with exact GPS coordinates, category, severity and description, protected by Row Level Security",
      "LGU triage workflow: new reports start Under Review; coordinators verify or reject, logged in incident_verifications",
      "Mobile slide-out incident details with sticky Verify and Reject actions",
      "Planned: severity-colored pins, critical pulse animation, auto-zoom, browser geolocation, real-time metrics, relief requests and evacuation center tracking"
    ]
  },
  {
    id: "studysync",
    title: "StudySync",
    category: "Web Application",
    description: "A smart study planner and focus web app that schedules study tasks into free-time blocks and includes a Pomodoro-style focus timer. The AI assistant (flashcards and PDF chat) runs on a local Ollama instance, so it is available when running the project locally; the live demo covers the planner and focus features.",
    image: "/STUDY.png",
     
    technologies: ["Next.js", "React 19", "TypeScript", "Supabase", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Ollama"],
    github: "https://github.com/Duanemaster/StudySync",
    live: "https://study-sync-time.vercel.app",
    featured: true,
    inDevelopment: true,
    features: [
      "Smart planner that fills free-time blocks by priority, due date and duration",
      "Focus mode: timestamp-based study timer with breaks, daily study minutes and streaks",
      "Local AI assistant: upload PDF notes to generate flashcards or chat with the document (requires local Ollama)",
      "Optimistic UI using React useOptimistic and Server Actions",
      "Supabase authentication and database with Row Level Security"
    ]
  },
  {
    id: "ecl-code-reviewer",
    title: "ECL: Local AI Code Reviewer",
    category: "AI & Automation",
    description: "An offline, fully local desktop app that reviews code using Ollama. Gives feedback, bug fixes and best practices with no API cost, and your code never leaves your machine.",
    image: "/ECL.png", 
    technologies: ["Python", "CustomTkinter", "Ollama", "PyInstaller"],
    github: "https://github.com/Duanemaster/local-ai-reviewer-ecl",
    featured: true,
    inDevelopment: true,
    features: [
      "Detects installed Ollama models and lists them in a dropdown",
      "Split layout: code editor with line numbers and review feedback panel",
      "Background threading keeps the UI responsive during analysis",
      "Strict system prompt and 8192-token context to reduce hallucinated errors",
      "Open source files and export the review as a Markdown report",
      "PyInstaller build script for a portable .exe"
    ]
  },
  {
    id: "financial-tracker",
    title: "Financial Tracker",
    category: "Desktop Application",
    description: "A C# WinForms desktop app for tracking income and expenses with full CRUD, SQL Server stored procedures, and a live summary of total income, expense and balance.",
    image: "/FN.png", // 
    technologies: ["C#", ".NET WinForms", "ADO.NET", "SQL Server"],
    github: "https://github.com/Duanemaster/financial-tracker", // 
    featured: false,
    features: [
      "Create, read, update and delete transactions (title, amount, category, type)",
      "Real-time total income, total expense and current balance",
      "Delete confirmation prompt and peso currency formatting"
    ]
  },
  {
    id: "student-management-system",
    title: "Student Management System",
    category: "Web Application",
    description: "A full-stack CRUD app for student records with a Laravel 11 REST API, a React (Vite) frontend using Axios, and Supabase (PostgreSQL). Built as a practice project to learn Laravel.",
    image: "/STUDENTMN.png", 
    technologies: ["Laravel 11", "PHP", "React", "Vite", "Axios", "Supabase"],
    github: "https://github.com/Duanemaster/student-management-system", 
    featured: false,
    features: [
      "Add, view, update and delete student records",
      "REST endpoints for listing, creating, viewing, updating and deleting students",
      "Data stored in Supabase (PostgreSQL)"
    ]
  },
  {
    id: "erica-ai-assistant",
    title: "ERICA Pre-Employment AI",
    category: "AI & Automation",
    description: "An interactive AI assistant utilizing the Gemini API to analyze uploaded corporate reference documents and answer pre-employment questions for HR.",
    image: "/GEMINI.jpg",
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
    featured: false
  }
];



export const skills = {
  frontend: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Next.js", "TypeScript"],
  backend: ["C#", "ASP.NET Core", "PHP", "Laravel", "Rust", "Python", "Google Apps Script"],
  database: ["SQL Server", "Excel", "Supabase"],
  ai: ["YOLOv8", "OpenCV", "Tesseract OCR", "Gemini API", "AI & Automation", "Ollama"],
  tools: ["Git & GitHub", "Cisco Packet Tracer", "Docker", "VS Code", "Vite","Google Colab", "Arduino IDE", "Visual Studio 2022", "n8n"]
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



export const site = {
  name: "Duane Benedict Mahinay",
  email: "duanemahinay@gmail.com",
  github: "https://github.com/Duanemaster",
  githubLabel: "github.com/Duanemaster",
  linkedin: "https://www.linkedin.com/in/duane-mahinay-0a330a2ba/", 
  resume: "/Duane_Benedict_Resume.pdf"
};

export const education = {
  degree: "BS Computer Engineering",
  school: "STI Global City",
  status: "Graduated",
  year: "July 30, 2026" 
};


export const certifications = [{
    title: "Project OWN IT: A Beginner's Guide to Intellectual Property for IT Students",
    issuer: "Mindoro State University - College of Computer Studies",
    date: "November 8, 2025"
  },
  {
    title: "Designing the Future: Why UI/UX Matters in Tech & Career Growth",
    issuer: "Zllense & DevCon Campus Ambassador",
    date: "October 15, 2025"
  },
  {
    title: "From Old School to OS: Using AI the Way Gen Z Already Does",
    issuer: "Eskwelabs",
    date: "November 17, 2025"
  },
  {
    title: "Foundations of Reliability in Cloud Computing: Exploring Site Reliability Engineering in Modern Cloud Systems",
    issuer: "Infinity 8 & Gordon College",
    date: "October 25, 2025"
  },
  {
    title: "Webinar on IT Trends and Professional Development",
    issuer: "Leyte Normal University - College of Arts and Science",
    date: "November 19, 2025"
  },
  {
    title: "IoT & Smart Solutions for PH Communities",
    issuer: "DICT - ILCDB (Cordillera Administrative Region)",
    date: "November 14, 2025"
  },
  {
    title: "Introduction to Arduino",
    issuer: "DICT - ILCDB through DICT Pampanga",
    date: "August 14, 2024"
  }];


export const timeline = [
  { id: "edu", type: "Education", date: "", title: education.degree, org: education.school, note: education.status },
  { id: "aw-2021", type: "Achievement", date: awards[1].date, title: awards[1].title, org: awards[1].event },
  { id: "aw-ygg", type: "Achievement", date: awards[0].date, title: awards[0].title, org: awards[0].event },
  { id: "aw-social", type: "Achievement", date: awards[2].date, title: awards[2].title, org: awards[2].event },
  { id: "aw-itolympics", type: "Achievement", date: awards[3].date, title: awards[3].title, org: awards[3].event },
  { id: "int-1", type: "Internship", date: experience[0].date, title: experience[0].role, org: experience[0].company },
  {
    id: "pr-asset",
    type: "Project",
    date: experience[0].date,
    title: "IT Asset Issuance & Management System",
    org: "Google Apps Script",
    note: "QR code generation, issuance workflow automation, warranty alerts and digital agreement processing. In active use by the IT department."
  },
  {
    id: "pr-hr",
    type: "Project",
    date: experience[0].date,
    title: "HR Pre-Employment & Document Management Portal",
    org: "Google Apps Script",
    note: "Automates collection, monitoring and validation of pre-employment requirements. In active use by HR."
  },
  { id: "int-2", type: "Internship", date: experience[1].date, title: experience[1].role, org: experience[1].company },
  {
    id: "pr-rfq",
    type: "Project",
    date: experience[1].date,
    title: "Supplier Portal & RFQ Management System",
    org: "Google Apps Script, Google Workspace",
    note: "PRF intake, RFQ generation, supplier emails, dashboard tracking, award selection and invoice upload."
  }
];