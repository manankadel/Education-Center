import { GraduationCap, Briefcase, BookOpen, Users, Home, School, DollarSign } from 'lucide-react';

export const NAV_LINKS = [
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Services' },
  { href: '#programs', label: 'Programs' },
  { href: '#reviews', label: 'Reviews' },
];

export const HERO_DATA = {
  headline: "EDUCATION CENTRE",
  subheadline: "THINKS BEYOND",
  image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop"
};

export const ABOUT_DATA = {
  proverb: "If you are planning for a lifetime, educate people. - Chinese Proverb",
  text1: "EDUCATION CENTRE, with a prosperous experience of more than 10 years in education. We collaborate with top universities & colleges to provide quality education and create industry-ready professionals.",
  text2: "We ensure that all our students are imparted with the desired skills that are in sync with the corporate environment.",
  image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
};

export const SERVICES_DATA = [
  {
    icon: Users,
    title: 'Admission Support & Counselling',
    desc: 'Seek a qualified counselling expert to understand courses, fees, placements, and make the right college choice.',
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop"
  },
  {
    icon: BookOpen,
    title: 'Distance Education',
    desc: 'Age No Bar. Flexibility in learning. Gain additional qualifications with our distance learning programs.',
    image: "https://images.unsplash.com/photo-1510531704581-5b57e49cb13a?q=80&w=600&auto=format&fit=crop"
  },
  {
    icon: GraduationCap,
    title: 'Regular Coaching Classes',
    desc: 'Expert-led classes for B.Com, BBA, BCA, NET-Commerce, combined with soft skills training.',
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop"
  },
  {
    icon: Briefcase,
    title: 'Industry Specific Training (ISTP)',
    desc: 'Digital marketing, stock market certifications, and financial analysis to make you corporate-ready.',
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop"
  },
];

export const PROGRAMS_LIST = [
  { 
    title: "Engineering & Tech", 
    desc: "For future innovators and problem solvers.", 
    icon: Home,
    details: ["Computer Science", "IT Program", "Civil Engineering"]
  },
  { 
    title: "Commerce & Mgmt", 
    desc: "Building leaders in finance and business management.", 
    icon: DollarSign,
    details: ["B.Com & M.Com", "BBA & MBA", "Financial Analysis"]
  },
  { 
    title: "Arts & Science", 
    desc: "Exploring creative and analytical disciplines.", 
    icon: School,
    details: ["Journalism", "Library Science", "Home Science"]
  },
  { 
    title: "Agriculture", 
    desc: "Sustainable practices and agricultural science.", 
    icon: Home,
    details: ["Horticulture", "Agri-Business", "Science"]
  },
  { 
    title: "Vocational", 
    desc: "Practical training for immediate employability.", 
    icon: School,
    details: ["Hotel Management", "Job Oriented", "Soft Skills"]
  },
  { 
    title: "Certifications", 
    desc: "Short term industry specific skill sets.", 
    icon: DollarSign,
    details: ["Digital Marketing", "Stock Market", "Taxation"]
  },
];

export const TESTIMONIALS = [
  { name: "Gautam Sharma", quote: "The training and placement department continuously provides assistance regarding new opportunities.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { name: "Ritika Jain", quote: "A brilliant institute offering unique opportunities to build careers. Confident and knowledge based learning.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
  { name: "Mukut Bihari Gupta", quote: "I appreciate the dedication, support and guidance offered by our faculty members.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" }
];

export const CONTACT_INFO = {
  address: "Above Shop No. 7, Sushil Cyber Space, Near Liberty Showroom, Gopalpura, Tonk Road, Jaipur",
  phones: ["+91 97826 63355", "+91 87696 63355"],
  email: "educationcentrejaipur@gmail.com"
};