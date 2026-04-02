export const NAV_LINKS =[
  { href: '#universities', label: 'Universities' },
  { href: '#courses', label: 'Programs' },
  { href: '#insights', label: 'Insights' },
  { href: '#reviews', label: 'Reviews' },
];

export const HERO_DATA = {
  headline: "COMPARE 100+ UNIVERSITIES",
  subheadline: "THE RIGHT PATH",
  est: "Est. 2008",
};

// --- RESTORED FOR BACKWARD COMPATIBILITY (Fixes AboutEditorial.tsx) ---
export const ABOUT_DATA = {
  proverb: "If you are planning for a year, sow rice; if you are planning for a decade, plant trees; if you are planning for a lifetime, educate people. - Chinese Proverb",
  experience: "EDUCATION CENTRE, with a prosperous experience of more than 10 years in education.",
  description: "We are working on different projects collaborating with different universities & colleges to provide Quality education and creating industry-ready professionals with its unique pedagogy and technology-enabled education delivery.",
  mission: "To promote quality education, training, research, consultancy and enhance employability and entrepreneurial skills of our students. To continuously upgrade our teaching methodology and deliver quality education leveraging the latest technology which will help the students achieve corporate excellence.",
  vision: "To provide excellent educational opportunities that are responsive to the needs of our students, and empower them to meet and exceed challenges as active participants in shaping the future of our world."
};

export const UNIVERSITIES =[
  "Amity University", "Manipal Online", "NMIMS CDOE", "UPES Online", 
  "Lovely Professional University", "JECRC University", "Jain University", 
  "Sharda University", "Sikkim Manipal University", "BITS Pilani",
  "Shiv Nadar University", "Uttaranchal University", "OP Jindal Global",
  "Symbiosis (SCDL)", "MIT Pune"
];

// --- RESTORED FOR BACKWARD COMPATIBILITY (Fixes ProgramsList.tsx) ---
export const PROGRAMS_LIST =[
  { title: "Engineering & IT", desc: "Engineering, Computer, and IT Programs for future innovators." },
  { title: "Commerce & Mgmt", desc: "Building leaders in finance, commerce, and business management." },
  { title: "Agriculture", desc: "Agriculture and Horticulture scientific programs." },
  { title: "Arts & Science", desc: "Exploring creative, scientific and analytical disciplines." },
  { title: "Media & Design", desc: "Journalism, Mass Communication, Design & Hotel Management." },
  { title: "Vocational", desc: "Library Science, Home Science, and Job Oriented Programs." },
];

export const COURSES =[
  {
    category: "Post Graduate Programs",
    desc: "Master's degrees tailored for advancing corporate leadership and technical prowess.",
    items:[
      { name: "Online MBA", specializations: ["Marketing", "Finance", "HR", "Operations", "International Business"] },
      { name: "Online MCA", specializations:["Data Science", "AI & ML", "Cloud Computing", "Cyber Security"] },
      { name: "M.Tech / M.Sc", specializations:["Software Engineering", "VLSI", "Applied Mathematics"] },
      { name: "PGDM / Executive PGDM", specializations: ["Retail Management", "Supply Chain", "Project Management"] }
    ]
  },
  {
    category: "Under Graduate Programs",
    desc: "Foundational degrees designed to kickstart your professional journey with absolute clarity.",
    items: [
      { name: "Online BBA", specializations:["General Management", "Sales & Marketing", "Retail"] },
      { name: "Online BCA", specializations: ["Software Development", "IT Systems", "Database Management"] },
      { name: "B.Com / BA", specializations: ["Accounting", "Economics", "Journalism", "Mass Comm"] }
    ]
  },
  {
    category: "Industry Certifications",
    desc: "Hyper-focused, short-term skill accelerators for immediate career impact.",
    items:[
      { name: "Tech & Analytics", specializations: ["Data Science", "UI/UX Design", "Python Analytics", "Big Data"] },
      { name: "Business & Finance", specializations:["Financial Analytics", "Digital Marketing", "Stock Market (NSE/BSE)", "Taxation"] }
    ]
  }
];

export const INSIGHTS =[
  {
    title: "Hidden Costs of Online Courses No One Tells You About",
    category: "Financial Planning",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Are Online Degrees Accepted for Government Jobs?",
    category: "Accreditation",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Regular, Distance, or Online: Which is Best for You?",
    category: "Comparison Guide",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "How to Avail Maximum Scholarships & Discounts",
    category: "Funding",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
  }
];

export const TESTIMONIALS =[
  { name: "Hardik Mittal", role: "Software Engineer", quote: "Comparing universities on my own was overwhelming. They made it easy by clearly explaining fees, approvals, and specializations.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { name: "Neha Nagpal", role: "Senior Compliance Officer", quote: "I was worried about choosing the wrong university, but their expert advice gave me absolute clarity and peace of mind.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" },
  { name: "Aman Agrawal", role: "Sales Manager", quote: "The guidance felt genuine and personalized. They focused on what was right for me instead of rushing the admission.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop" },
  { name: "Aditi Mahajan", role: "General Manager", quote: "They helped me understand the difference between various online universities and accreditation details in a surprisingly simple way.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" }
];

export const CONTACT_INFO = {
  // New Array structure for the new ContactBrutal.tsx
  offices:[
    { city: "Jaipur (HQ)", address: "152/1, First Floor, Shiprapath, Mansarovar, Patel Marg, Jaipur, Rajasthan 302020" },
    { city: "Gurugram", address: "Cyber Hub, DLF Phase 2, Gurugram, Haryana 122002" }
  ],
  phones:["+91 9785 800 008", "+91 9772 531 531"],
  emails:["support@educationcentre.com", "admissions@educationcentre.com"],
  
  // RESTORED: Old string structure (Fixes older Footer.tsx/Contact.tsx errors)
  address: "152/1, First Floor, Shiprapath, Mansarovar, Patel Marg, Jaipur, Rajasthan 302020",
  email: "support@educationcentre.com"
};