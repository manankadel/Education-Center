import { 
    GraduationCap, BookOpen, Users, Compass, 
    Briefcase, Building, FileText, Globe 
} from 'lucide-react';
  
export const NAV_LINKS =[
    { href: '#about', label: 'About Us' },
    { href: '#services', label: 'Offerings' },
    { href: '#programs', label: 'Programs' },
    { href: '#reviews', label: 'Reviews' },
];

export const HERO_DATA = {
    headline: "EDUCATION CENTRE",
    subheadline: "THINKS BEYOND",
    est: "Since 2008",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop"
};

export const ABOUT_DATA = {
    proverb: "If you are planning for a year, sow rice; if you are planning for a decade, plant trees; if you are planning for a lifetime, educate people. - Chinese Proverb",
    experience: "EDUCATION CENTRE, with a prosperous experience of more than 10 years in education.",
    description: "We are working on different projects collaborating with different universities & colleges to provide Quality education and creating industry-ready professionals with its unique pedagogy and technology-enabled education delivery.",
    mission: "To promote quality education, training, research, consultancy and enhance employability and entrepreneurial skills of our students. To continuously upgrade our teaching methodology and deliver quality education leveraging the latest technology which will help the students achieve corporate excellence.",
    vision: "To provide excellent educational opportunities that are responsive to the needs of our students, and empower them to meet and exceed challenges as active participants in shaping the future of our world."
};

export const SERVICES_DATA =[
    {
        icon: Compass,
        title: 'Admission Support & Counselling',
        desc: 'Seek a qualified counselling expert to understand courses, fees, placements, and make the right college choice.',
        details:[
            "State level counselling & entrance exams guidance",
            "Understand student interests & natural talents",
            "Address differences between parents & students",
            "Provide the complete Counselling Kit"
        ]
    },
    {
        icon: Globe,
        title: 'Distance Education',
        desc: 'Age No Bar. Flexibility in learning. Gain additional qualifications while working with our distance learning programs.',
        details:[
            "UG Courses: BA, B.COM, B.SC, BBA, BCA",
            "PG Courses: MA, M.Com, Msc-Maths, MBA, MCA",
            "Soft Skills & Personality Development"
        ]
    },
    {
        icon: BookOpen,
        title: 'Regular Coaching',
        desc: 'Expert-led classes for B.Com, BBA, BCA, NET-Commerce, combined with rigorous soft skills training.',
        details:[
            "College & University courses",
            "NET-Commerce & Management",
            "Life Science",
            "Spoken English & Soft Skills"
        ]
    },
    {
        icon: Briefcase,
        title: 'Industry Specific Training (ISTP)',
        desc: 'Digital marketing, stock market certifications, and financial analysis to make you corporate-ready.',
        details:[
            "Digital Marketing & CRM Certification",
            "Stock Market by NSE / BSE or NISM",
            "Accounting, Banking & Finance Systems",
            "Taxation & Office Management"
        ]
    },
];

export const PROGRAMS_LIST =[
    { title: "Engineering & IT", desc: "Engineering, Computer, and IT Programs for future innovators." },
    { title: "Commerce & Mgmt", desc: "Building leaders in finance, commerce, and business management." },
    { title: "Agriculture", desc: "Agriculture and Horticulture scientific programs." },
    { title: "Arts & Science", desc: "Exploring creative, scientific and analytical disciplines." },
    { title: "Media & Design", desc: "Journalism, Mass Communication, Design & Hotel Management." },
    { title: "Vocational", desc: "Library Science, Home Science, and Job Oriented Programs." },
];

export const TESTIMONIALS =[
    { name: "Gautam Sharma", quote: "The training and placement department continuously provides assistance regarding new opportunities. Education centre has made best efforts to provide all facilities. I have learned a lot.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
    { name: "Ritika Jain", quote: "A brilliant institute offering unique opportunities to build careers. I have acquired immense confidence, knowledge through the way we are taught.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
    { name: "Mukut Bihari Gupta", quote: "I appreciate the dedication, support and guidance offered by our faculty member. It is best known for its Excellence and making students ready for corporate environment.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
    { name: "Disha Jain", quote: "I joined exactly a year ago and I can very proudly say that it offers Industry Specific Training Program for Holistic development. They have corporate ethics imbibed deeply.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" },
    { name: "Sourbh Katariya", quote: "Living by its motto, Education Centre literally made me industry-ready by equipping me with corporate excellence and skill set applicable to diverse career paths.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop" },
    { name: "Gaurav Kumar", quote: "We see education centre as a game changer, providing candidates with excellent work ethics and who can hit the ground running. Highly disciplined and well-groomed.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" },
    { name: "Ahinsa Jain", quote: "I feel very proud to be a student. The committed management and enthusiastic faculties have always kept student's interest in mind. Learning is fun, rigorous and industry oriented.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop" },
    { name: "Sarvesh Jain", quote: "I really like the friendly atmosphere and supportive teachers. I have really improved my skills and personality through different kinds of activities and soft skills programs.", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop" }
];

export const CONTACT_INFO = {
    address: "Above Shop No. 7, Sushil Cyber Space, Near Liberty Showroom, Gopalpura, Tonk Road, Jaipur",
    phones:["+91 97826 63355", "+91 87696 63355"],
    email: "educationcentrejaipur@gmail.com"
};