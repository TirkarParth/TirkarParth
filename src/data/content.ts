export const siteConfig = {
  name: 'Parth Tirkar',
  title: 'Parth Tirkar — Creative Developer',
  role: 'Creative Developer / Frontend Engineer',
  location: 'Leipzig, Germany',
  email: 'parthtirkar@gmail.com',
  phone: '+49 163 4373581',
  phoneHref: 'tel:+491634373581',
  resume: '/PT/downloads/PtDev.pdf',
  tagline: 'I design and build immersive digital experiences where technology meets visual storytelling.',
  social: {
    github: 'https://github.com/TirkarParth',
    linkedin: 'https://www.linkedin.com/in/parth-tirkar/',
  },
} as const

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const

export const aboutContent = {
  eyebrow: 'About',
  headline: 'More than code.',
  lead: 'I build digital experiences that combine engineering, interaction and visual design.',
  body: `I'm a full-stack developer based in Leipzig, passionate about creating complete, end-to-end solutions. With a master's degree in Information Communication Systems, I work across the entire development lifecycle—from designing user interfaces to architecting backend systems and managing deployment workflows.`,
  pillars: [
    {
      title: 'My Approach',
      text: 'I believe in building solutions that are both technically sound and user-centric. Working with React, React Native, and Next.js, I focus on applications that are functional, intuitive, and accessible—including i18n for global reach.',
    },
    {
      title: 'Full-Stack Experience',
      text: 'Having worked on complete application stacks, I understand how frontend and backend systems integrate. From designing APIs to managing databases, I appreciate how each component contributes to the overall experience.',
    },
    {
      title: 'Team Collaboration',
      text: 'I value collaborative development through pull request reviews, code discussions, and knowledge sharing. Managing rebase, merge, and release processes has taught me the importance of clear communication and structured workflows.',
    },
  ],
} as const

export const skills = [
  { id: 'react', label: 'React', category: 'Frontend' },
  { id: 'next', label: 'Next.js', category: 'Frontend' },
  { id: 'rn', label: 'React Native', category: 'Frontend' },
  { id: 'ts', label: 'TypeScript', category: 'Frontend' },
  { id: 'js', label: 'JavaScript', category: 'Frontend' },
  { id: 'three', label: 'Three.js', category: 'Creative' },
  { id: 'gsap', label: 'GSAP', category: 'Creative' },
  { id: 'html', label: 'HTML / CSS', category: 'Frontend' },
  { id: 'node', label: 'Node.js', category: 'Backend' },
  { id: 'nest', label: 'NestJS', category: 'Backend' },
  { id: 'mongo', label: 'MongoDB', category: 'Backend' },
  { id: 'pg', label: 'PostgreSQL', category: 'Backend' },
  { id: 'git', label: 'Git', category: 'Workflow' },
  { id: 'uiux', label: 'UI / UX', category: 'Design' },
] as const

export type Project = {
  id: string
  number: string
  title: string
  description: string
  overview: string
  challenge: string
  solution: string
  features: string[]
  technologies: string[]
  year: string
  image: string
  images?: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'ecommerce',
    number: '01',
    title: 'E-Commerce Platform',
    description: 'A multi-service commerce platform spanning news, jobs, marketplace, and messaging.',
    overview:
      'A comprehensive e-commerce platform built with React and Next.js, featuring multiple integrated services across news feed, video feed, job portal, marketplace, listing platform, and messenger.',
    challenge:
      'Unifying several product surfaces—feeds, marketplace, and messaging—into a coherent experience while coordinating React and Next.js clients with Go and Nest APIs.',
    solution:
      'Split services by domain: news, video, and jobs on React with a Go API; marketplace, listings, and messenger on Next.js with a Nest API—keeping each surface focused and scalable.',
    features: ['News Feed', 'Video Feed', 'Job Portal', 'Marketplace', 'Listing Platform', 'Messenger'],
    technologies: ['React', 'Next.js', 'Go API', 'Nest API'],
    year: '2024',
    image: '/PT/img/React-1.png',
    images: ['/PT/img/React-1.png', '/PT/img/React-2.png', '/PT/img/React-3.png'],
    featured: true,
  },
  {
    id: 'corporate',
    number: '02',
    title: 'Corporate Website',
    description: 'Company overview site for an entire group—built, deployed, and managed end to end.',
    overview:
      'A company overview website providing information about the entire group and company services, fully built, deployed, and managed by me.',
    challenge:
      'Presenting a complex group structure clearly while owning the full lifecycle from design through hosting and contact infrastructure.',
    solution:
      'Shipped a responsive React site with EmailJS forms and FTP hosting on all.inkl.com, covering overview, group information, and contact.',
    features: ['Company Overview', 'Group Information', 'Contact Form', 'Responsive Design'],
    technologies: ['React', 'EmailJS', 'FTP Hosting'],
    year: '2024',
    image: '/PT/img/React-4.png',
    featured: true,
  },
  {
    id: 'mobile-ecommerce',
    number: '03',
    title: 'Mobile E-Commerce App',
    description: 'React Native companion bringing the full commerce suite to iOS and Android.',
    overview:
      'The mobile application version of the e-commerce platform, built with React Native—news feed, video feed, job portal, marketplace, listing platform, and messenger on iOS and Android.',
    challenge:
      'Delivering feature parity with the web platform while respecting native patterns and performance constraints.',
    solution:
      'Shared API contracts with the web clients and built native flows in React Native for feeds, marketplace, and messaging.',
    features: ['News Feed', 'Video Feed', 'Job Portal', 'Marketplace', 'Listing Platform', 'Messenger'],
    technologies: ['React Native', 'iOS', 'Android', 'Go API', 'Nest API'],
    year: '2024',
    image: '/PT/img/react-native.png',
    featured: true,
  },
  {
    id: 'myflix-react',
    number: '04',
    title: 'myFlix Client',
    description: 'A MERN movie platform with profiles, favorites, and rich film discovery.',
    overview:
      'A client-side React platform offering detailed movie information. Users can create profiles, save favorites, and explore movies as part of a full-stack MERN application.',
    challenge:
      'Building a polished SPA for authentication, favorites, and movie browsing on top of a custom REST API.',
    solution:
      'React with Bootstrap for the UI, Passport-backed auth, and MongoDB-backed profile and favorites management.',
    features: ['Movie Information', 'User Authentication', 'Manage Favorites', 'Profile Data'],
    technologies: ['React', 'Bootstrap', 'Express', 'Node.js', 'MongoDB', 'Passport.js'],
    year: '2023',
    image: '/PT/img/myFlix.png',
    images: ['/PT/img/React-1.png', '/PT/img/React-2.png', '/PT/img/React-3.png', '/PT/img/React-4.png'],
    liveUrl: 'https://ptmovieflix.netlify.app/login',
    githubUrl: 'https://github.com/TirkarParth/myFlix-client',
    featured: true,
  },
  {
    id: 'chat-app',
    number: '05',
    title: 'Chat App',
    description: 'Real-time React Native chat with media, location, and offline access.',
    overview:
      'A real-time chat app allowing users to exchange messages, share photos, videos, and their location instantly.',
    challenge:
      'Supporting rich media messaging and offline access in a cross-platform mobile experience.',
    solution:
      'React Native with Expo, Gifted Chat, and Google Firestore for realtime sync and offline message access.',
    features: ['Share Pics & Videos', 'Photo Library', 'Share Location', 'Real-time Chat', 'Offline Access'],
    technologies: ['React Native', 'Google Firestore', 'Expo', 'Node.js', 'Gifted Chat'],
    year: '2023',
    image: '/PT/img/Chat-App-firebase.png',
    images: [
      '/PT/img/Chat-App-firebase.png',
      '/PT/img/Chat-Browser.png',
      '/PT/img/Chat-Users.png',
      '/PT/img/Chat-Discover-Device.png',
    ],
    githubUrl: 'https://github.com/TirkarParth/Chat-App',
  },
  {
    id: 'myflix-angular',
    number: '06',
    title: 'myFlix Angular',
    description: 'Angular client connected to a custom movie REST API and database.',
    overview:
      'An Angular app connected to a custom server-side REST API and database, offering access to movie details with profile management.',
    challenge:
      'Recreating the myFlix experience in Angular with Material design patterns and typed documentation.',
    solution:
      'Angular with Angular Material, TypeScript, and Typedoc against the existing Node.js movie API.',
    features: ['User Registration', 'Movie Details', 'Save Favorites', 'Edit Profile'],
    technologies: ['Angular', 'Node.js', 'Angular Material', 'TypeScript', 'Typedoc'],
    year: '2023',
    image: '/PT/img/Angular-1.png',
    images: ['/PT/img/Angular-1.png', '/PT/img/Angular-2.png', '/PT/img/Angular-3.png'],
    githubUrl: 'https://github.com/TirkarParth/myFlix-Angular-client',
  },
  {
    id: 'meet',
    number: '07',
    title: 'Meet N Code',
    description: 'Serverless React PWA with Google Calendar and TDD practices.',
    overview:
      'A serverless React PWA applying TDD practices, integrated with Google Calendar API for event retrieval.',
    challenge:
      'Building a reliable offline-capable PWA with calendar OAuth while enforcing TDD and BDD practices.',
    solution:
      'React PWA with OAuth login, Google Calendar integration, Puppeteer, Jest, and Cucumber/Gherkin tests.',
    features: ['Event Filtering', 'Detailed Views', 'Offline Functionality', 'Home Screen Shortcut', 'Data Visualization'],
    technologies: ['React', 'OAuth', 'Google Calendar', 'Puppeteer', 'Jest', 'Cucumber'],
    year: '2023',
    image: '/PT/img/meet-APP1.png',
    images: ['/PT/img/meet-APP1.png', '/PT/img/meet-APP2.png'],
    githubUrl: 'https://github.com/TirkarParth/meet',
  },
  {
    id: 'myflix-api',
    number: '08',
    title: 'myFlix Server',
    description: 'Node.js REST API for movie data, auth, and user profile management.',
    overview:
      'A server-side component for myFlix, built with Node.js, Express, and MongoDB, offering a robust RESTful API for efficient movie data management.',
    challenge:
      'Designing secure authentication and clean REST endpoints for movies and user profiles.',
    solution:
      'Express with Mongoose, Passport-JWT, Bcrypt, JWT auth, JSDoc, and Postman-tested endpoints.',
    features: ['Fetch All Movies', 'Detailed Movie Info', 'User Profile Management', 'Account Deletion'],
    technologies: ['Express', 'MongoDB', 'Mongoose', 'Passport-JWT', 'JWT', 'JSDoc'],
    year: '2023',
    image: '/PT/img/myFlix.png',
    liveUrl: 'https://bobs83.github.io/movie_api/public/documentation.html',
    githubUrl: 'https://github.com/MyFlixAPI',
  },
  {
    id: 'pokemon',
    number: '09',
    title: 'Pokemon JS App',
    description: 'Lightweight JavaScript app fetching and presenting Pokémon data from an API.',
    overview:
      'A JavaScript-based web app focused on Pokémon, utilizing HTML, CSS, and JavaScript to fetch and present detailed data from an external API.',
    challenge:
      'Creating a clean, responsive browsing experience over a third-party Pokémon API.',
    solution:
      'Vanilla JS with jQuery and Bootstrap for responsive listing and detail views.',
    features: ['Responsive Design', 'Fetch from API', 'Browse Pokémon'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap'],
    year: '2022',
    image: '/PT/img/PokeWeb.png',
    liveUrl: 'https://tirkarparth.github.io/Simple-js-app/',
    githubUrl: 'https://github.com/TirkarParth/Simple-js-app',
  },
  {
    id: 'taskmaster',
    number: '10',
    title: 'TaskMaster',
    description: 'Full-stack task manager with priorities, reminders, and dark mode.',
    overview:
      'A full-stack task management web app built with React, Node.js, and MongoDB, offering seamless organization and productivity features.',
    challenge:
      'Shipping a complete task workflow with auth, priorities, and a polished UI including dark mode.',
    solution:
      'React + Redux + Material-UI on the client; Node, Express, MongoDB, and JWT on the server.',
    features: ['Task Creation & Editing', 'Due Date Reminders', 'Priority Tagging', 'Dark Mode'],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Redux', 'Material-UI'],
    year: '2022',
    image: '/PT/img/To-Do-List.png',
    liveUrl: 'https://tirkarparth.github.io/to-do-list-app/',
    githubUrl: 'https://github.com/TirkarParth/to-do-list-app',
  },
]

export const journey = [
  { year: '2022', title: 'Learning', text: 'CareerFoundry Full Stack Program—foundations in APIs, React, Angular, and PWAs.' },
  { year: '2023', title: 'Building', text: 'Shipped MERN apps, React Native chat, Angular clients, and serverless PWAs with TDD.' },
  { year: '2024', title: 'Professional Growth', text: 'Production React, Next.js, and React Native apps with i18n, PR reviews, and release workflows.' },
  { year: '2025', title: 'Advanced Projects', text: 'Multi-service platforms spanning web and mobile with Nest and Go APIs.' },
  { year: '2026', title: 'Creative Development', text: 'Immersive frontend experiences—interaction design, motion, and 3D on the web.' },
] as const

export const services = [
  { number: '01', title: 'Interactive Websites', text: 'Premium marketing and product sites with cinematic motion and polish.' },
  { number: '02', title: 'Frontend Applications', text: 'Scalable React and Next.js apps with thoughtful UX and i18n.' },
  { number: '03', title: '3D Web Experiences', text: 'Real-time Three.js scenes that support the story, not distract from it.' },
  { number: '04', title: 'UI Engineering', text: 'Design systems, accessible components, and pixel-precise interfaces.' },
  { number: '05', title: 'Creative Development', text: 'Where engineering, interaction, and visual design meet.' },
] as const
