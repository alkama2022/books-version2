import programmingCover from "@/assets/covers/programming.jpg";
import businessCover from "@/assets/covers/business.jpg";
import educationCover from "@/assets/covers/education.jpg";
import agricultureCover from "@/assets/covers/agriculture.jpg";

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  cover: string;
  price: number;
  oldPrice?: number;
  language: string;
  pages: number;
  fileSize: string;
  publishedAt: string;
  featured?: boolean;
  popular?: boolean;
  previewAvailable: boolean;
  learn: string[];
  audience: string;
  contents: string[];
  authorBio: string;
};

export const books: Book[] = [
  {
    id: "python-for-beginners",
    title: "Python for Beginners",
    author: "Tobi Adebayo",
    category: "Programming",
    description:
      "A practical, friendly path from your first line of code to useful Python projects.",
    cover: programmingCover,
    price: 3500,
    oldPrice: 4500,
    language: "English",
    pages: 248,
    fileSize: "8.4 MB",
    publishedAt: "2026-08-12",
    featured: true,
    popular: true,
    previewAvailable: true,
    learn: [
      "Write clear Python programs",
      "Work confidently with data and files",
      "Build three portfolio-ready projects",
    ],
    audience: "Students, career switchers and curious beginners with no prior coding experience.",
    contents: [
      "Your first Python program",
      "Variables and decisions",
      "Loops and functions",
      "Working with data",
      "Three practical projects",
    ],
    authorBio:
      "Tobi Adebayo teaches software development through clear, project-led lessons for African learners.",
  },
  {
    id: "django-rest-framework",
    title: "Mastering Django REST Framework",
    author: "Amaka Okorie",
    category: "Programming",
    description: "Design reliable APIs with authentication, testing and production-ready patterns.",
    cover: programmingCover,
    price: 5900,
    language: "English",
    pages: 326,
    fileSize: "11.2 MB",
    publishedAt: "2026-09-04",
    featured: true,
    previewAvailable: true,
    learn: [
      "Structure maintainable APIs",
      "Handle authentication safely",
      "Test and deploy with confidence",
    ],
    audience: "Python developers ready to build modern backend services.",
    contents: [
      "API foundations",
      "Serializers and views",
      "Permissions",
      "Testing",
      "Deployment patterns",
    ],
    authorBio:
      "Amaka Okorie is a backend engineer and technical educator focused on dependable web systems.",
  },
  {
    id: "business-ideas-nigeria",
    title: "Business Ideas for Young Nigerians",
    author: "Femi Lawal",
    category: "Business",
    description: "A grounded guide to finding, testing and growing ideas in the Nigerian market.",
    cover: businessCover,
    price: 2800,
    oldPrice: 3500,
    language: "English",
    pages: 184,
    fileSize: "6.1 MB",
    publishedAt: "2026-07-18",
    featured: true,
    popular: true,
    previewAvailable: true,
    learn: [
      "Spot practical market gaps",
      "Test demand before spending heavily",
      "Build a simple operating plan",
    ],
    audience: "Students, side-hustlers and first-time founders in Nigeria.",
    contents: [
      "Opportunity around you",
      "Customer discovery",
      "Starting lean",
      "Pricing and cash flow",
      "Your 30-day launch plan",
    ],
    authorBio:
      "Femi Lawal advises early-stage founders on practical growth and sustainable small business.",
  },
  {
    id: "digital-marketing",
    title: "Introduction to Digital Marketing",
    author: "Zainab Musa",
    category: "Technology",
    description: "Understand channels, content and measurement without the jargon.",
    cover: businessCover,
    price: 3200,
    language: "English",
    pages: 210,
    fileSize: "7.8 MB",
    publishedAt: "2026-08-27",
    featured: true,
    previewAvailable: true,
    learn: ["Choose the right channels", "Create useful content", "Measure what matters"],
    audience: "Small business owners, creators and new marketers.",
    contents: [
      "Digital foundations",
      "Content strategy",
      "Search and social",
      "Email",
      "Measurement",
    ],
    authorBio:
      "Zainab Musa helps growing brands make smarter, simpler digital marketing decisions.",
  },
  {
    id: "academic-success",
    title: "The Academic Success Guide",
    author: "Dr. Adaeze Nwosu",
    category: "Education",
    description:
      "Better study systems, focused revision and exam preparation for university students.",
    cover: educationCover,
    price: 2400,
    language: "English",
    pages: 156,
    fileSize: "5.5 MB",
    publishedAt: "2026-06-03",
    popular: true,
    previewAvailable: true,
    learn: [
      "Plan a realistic semester",
      "Remember more from every study session",
      "Prepare calmly for exams",
    ],
    audience: "University and polytechnic students who want stronger study habits.",
    contents: [
      "Setting your direction",
      "Active study",
      "Time and focus",
      "Revision systems",
      "Exam week",
    ],
    authorBio:
      "Dr. Adaeze Nwosu is an educator and student success coach with over a decade of classroom experience.",
  },
  {
    id: "jamb-mastery",
    title: "JAMB Mastery: Smart Revision",
    author: "Chinedu Eze",
    category: "Exam Preparation",
    description:
      "A focused revision companion for planning, practice and confident exam performance.",
    cover: educationCover,
    price: 1900,
    language: "English",
    pages: 138,
    fileSize: "4.9 MB",
    publishedAt: "2026-09-10",
    popular: true,
    previewAvailable: true,
    learn: [
      "Build a useful revision timetable",
      "Practise with purpose",
      "Avoid common exam mistakes",
    ],
    audience: "UTME candidates preparing independently or with a study group.",
    contents: ["Know the exam", "Plan your weeks", "Practice technique", "Exam confidence"],
    authorBio: "Chinedu Eze creates practical learning resources for secondary school students.",
  },
  {
    id: "small-farm-profit",
    title: "Small Farm, Smart Profit",
    author: "Amina Bello",
    category: "Agriculture",
    description: "Practical planning, records and market decisions for a resilient small farm.",
    cover: agricultureCover,
    price: 4100,
    language: "English",
    pages: 232,
    fileSize: "9.3 MB",
    publishedAt: "2026-05-21",
    featured: true,
    previewAvailable: true,
    learn: ["Choose viable farm products", "Track costs and yield", "Plan routes to market"],
    audience: "New and growing farmers who want to run agriculture as a business.",
    contents: [
      "Start with the market",
      "Production planning",
      "Farm records",
      "Risk",
      "Selling well",
    ],
    authorBio:
      "Amina Bello is an agribusiness trainer working with smallholder farmers across northern Nigeria.",
  },
  {
    id: "career-compass",
    title: "Career Compass",
    author: "Ifeoma Umeh",
    category: "Career",
    description:
      "Make clear career decisions, communicate your strengths and prepare for opportunity.",
    cover: businessCover,
    price: 3000,
    language: "English",
    pages: 176,
    fileSize: "5.9 MB",
    publishedAt: "2026-09-15",
    previewAvailable: false,
    learn: ["Clarify your direction", "Present your experience well", "Prepare for interviews"],
    audience: "Graduates and early-career professionals building momentum.",
    contents: [
      "Career clarity",
      "Your proof of value",
      "Applications",
      "Interviews",
      "Your first 90 days",
    ],
    authorBio:
      "Ifeoma Umeh is a career coach who helps young professionals turn potential into practical next steps.",
  },
];

export const categories = [
  "Programming",
  "Business",
  "Education",
  "Career",
  "Agriculture",
  "Technology",
  "Personal Development",
  "Children",
  "Exam Preparation",
  "Nigerian Authors",
];
export const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
export const findBook = (id: string) => books.find((book) => book.id === id);
