export type ArchitecturePillar = {
  id: string
  label: string
  title: string
  badge: string
  description: string
  tags: string[]
  accent: 'gold' | 'cyan' | 'violet' | 'mint'
}

export const architecturePillars: ArchitecturePillar[] = [
  {
    id: 'frontend',
    label: 'Core Pillar',
    title: 'Frontend Architecture',
    badge: 'React · Next',
    description:
      'Production-ready interfaces with React, Next.js, and React Native—internationalization, state management, and accessible UI systems.',
    tags: ['React', 'Next.js', 'React Native', 'TypeScript', 'Redux'],
    accent: 'cyan',
  },
  {
    id: 'backend',
    label: 'High Concurrency',
    title: 'Distributed Backend',
    badge: 'REST · Nest',
    description:
      'Scalable server architectures with Node.js, Express, and NestJS—secure auth, clean API contracts, and reliable release workflows.',
    tags: ['Node.js', 'Express', 'NestJS', 'JWT', 'REST'],
    accent: 'gold',
  },
  {
    id: 'data',
    label: 'Persistence',
    title: 'Data Platforms',
    badge: 'SQL · NoSQL',
    description:
      'Database design and optimization across MongoDB and PostgreSQL, with thoughtful schemas that support end-to-end product flows.',
    tags: ['MongoDB', 'PostgreSQL', 'Mongoose', 'Firebase'],
    accent: 'mint',
  },
  {
    id: 'creative',
    label: 'Intelligence',
    title: 'Creative Systems',
    badge: '3D · Motion',
    description:
      'Immersive web experiences with Three.js and GSAP—scroll storytelling, interaction design, and performance-aware motion.',
    tags: ['Three.js', 'GSAP', 'R3F', 'Lenis'],
    accent: 'violet',
  },
]
