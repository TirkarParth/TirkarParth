export type ExperienceItem = {
  id: string
  period: string
  title: string
  org: string
  text: string
  tags?: string[]
}

export const experiences: ExperienceItem[] = [
  {
    id: '2022-learning',
    period: '2022',
    title: 'Full Stack Foundations',
    org: 'CareerFoundry',
    text: 'Completed the Full Stack Program—built APIs, React and Angular clients, React Native apps, and serverless PWAs with TDD practices.',
    tags: ['React', 'Angular', 'Node.js', 'TDD'],
  },
  {
    id: '2023-building',
    period: '2023',
    title: 'Shipping Full-Stack Products',
    org: 'Personal & Open Projects',
    text: 'Delivered MERN movie platforms, a React Native chat app with Firestore, Angular clients, and a Google Calendar PWA with Jest and Cucumber.',
    tags: ['MERN', 'React Native', 'Firestore', 'Jest'],
  },
  {
    id: '2024-growth',
    period: '2024',
    title: 'Professional Growth',
    org: 'Production Environments',
    text: 'Built production React, Next.js, and React Native applications with i18n, pull-request reviews, rebase/merge discipline, and release workflows.',
    tags: ['Next.js', 'i18n', 'Git', 'Releases'],
  },
  {
    id: '2025-advanced',
    period: '2025',
    title: 'Multi-Service Platforms',
    org: 'Advanced Projects',
    text: 'Engineered multi-service e-commerce and mobile suites spanning feeds, marketplace, and messaging—backed by Nest and Go APIs.',
    tags: ['React', 'NestJS', 'Go', 'Mobile'],
  },
  {
    id: '2026-creative',
    period: '2026',
    title: 'Creative Development',
    org: 'Immersive Web',
    text: 'Focusing on cinematic frontend craft—interaction design, scroll-driven storytelling, and real-time 3D experiences on the web.',
    tags: ['Three.js', 'GSAP', 'UI/UX'],
  },
]
