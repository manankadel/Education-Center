import { GraduationCap, Briefcase, BookOpen, Users } from 'lucide-react';

export const NAV_LINKS =[
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Our Services' },
  { href: '#programs', label: 'Programs' },
  { href: '#reviews', label: 'Reviews' },
];

export const HERO_DATA = {
  headline: "DESTINIES ARE NOT CREATED ALONE.",
  subheadline: "They are nurtured with the right ambience and guidance. Think Beyond with Jaipur's premier education center.",
  image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop"
};

export const ABOUT_DATA = {
  proverb: "If you are planning for a year, sow rice; if you are planning for a decade, plant trees; if you are planning for a lifetime, educate people. - Chinese Proverb",
  text1: "EDUCATION CENTRE, with a prosperous experience of more than 10 years in education. We are working on different projects collaborating with different universities & colleges to provide Quality education and creating industry-ready professionals.",
  text2: "We insured that all our students are imparted with the desired skills that are in sync with the corporate environment.",
  // FIXED: Replaced broken image with a working, high-quality one
  image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
};

export const SERVICES_DATA =[
  {
    icon: Users,
    title: 'Admission Support & Career Counselling',
    desc: 'College Admission is a critical decision. Seek a qualified counselling expert to understand courses, fees, placements, and make the right choice.',
  },
  {
    icon: BookOpen,
    title: 'Distance Education',
    desc: 'Age No Bar. Flexibility in learning. Gain additional qualifications with our distance learning programs for UG & PG courses.',
  },
  {
    icon: GraduationCap,
    title: 'Regular Coaching Classes',
    desc: 'Regular classes in colleges and universities for B.Com, BBA, BCA, NET-Commerce, Life Science, combined with soft skills training.',
  },
  {
    icon: Briefcase,
    title: 'Industry Specific Training (ISTP)',
    desc: 'Effective speaking, digital marketing, stock market certifications, and financial analysis to make you corporate-ready.',
  },
];

export const PROGRAMS_LIST =[
  {
    title: "Undergraduate Programs",
    desc: "Engineering, IT, Commerce, Arts, and Agriculture.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
    details:["Engineering Program", "Computer and IT Program", "Commerce and Management", "Agriculture and Horticulture", "Arts and Science"]
  },
  {
    title: "Postgraduate Programs",
    desc: "Specialized degrees to elevate your career trajectory.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    details: ["Journalism and Mass Communication", "Library and Home Science", "Design and Hotel Management", "Vocational and Job Oriented"]
  },
  {
    title: "Industry Specific Training",
    desc: "Certifications designed directly for corporate excellence.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    details:["Effective Speaking & Analytical Skills", "Digital Marketing", "Stock Market (NSE/BSE/NISM)", "Finance & Taxation"]
  }
];

export const TESTIMONIALS =[
  {
    name: "Gautam Sharma",
    quote: "The training and placement department continuously provides assistance regarding new opportunities. I have learned a lot about the domain.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Ritika Jain",
    quote: "A brilliant institute offering unique opportunities to build careers. I have acquired immense confidence, knowledge through the way we are taught.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Mukut Bihari Gupta",
    quote: "I appreciate the dedication, support and guidance offered by our faculty member. They make students ready for corporate environment.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
  }
];

export const CONTACT_INFO = {
  address: "Above Shop No. 7, Sushil Cyber Space, Near Liberty Showroom, Gopalpura, Tonk Road, Jaipur",
  phones:["+91 97826 63355", "+91 87696 63355"],
  email: "educationcentrejaipur@gmail.com"
};