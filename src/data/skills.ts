export type Skill = {
  id: string
  label: string
  category: string
  icon: string
  color: string
}

export const skills: Skill[] = [
  {
    id: 'react',
    label: 'React',
    category: 'Frontend',
    icon: '/PT/icons/react.svg',
    color: '#61DAFB',
  },
  {
    id: 'next',
    label: 'Next.js',
    category: 'Frontend',
    icon: '/PT/icons/nextjs.svg',
    color: '#FFFFFF',
  },
  {
    id: 'rn',
    label: 'React Native',
    category: 'Frontend',
    icon: '/PT/icons/react-native.svg',
    color: '#61DAFB',
  },
  {
    id: 'ts',
    label: 'TypeScript',
    category: 'Frontend',
    icon: '/PT/icons/typescript.svg',
    color: '#3178C6',
  },
  {
    id: 'js',
    label: 'JavaScript',
    category: 'Frontend',
    icon: '/PT/icons/javascript.svg',
    color: '#F7DF1E',
  },
  {
    id: 'three',
    label: 'Three.js',
    category: 'Creative',
    icon: '/PT/icons/threejs.svg',
    color: '#FFFFFF',
  },
  {
    id: 'gsap',
    label: 'GSAP',
    category: 'Creative',
    icon: '/PT/icons/gsap.svg',
    color: '#88CE02',
  },
  {
    id: 'html',
    label: 'HTML / CSS',
    category: 'Frontend',
    icon: '/PT/icons/htmlcss.svg',
    color: '#E34F26',
  },
  {
    id: 'node',
    label: 'Node.js',
    category: 'Backend',
    icon: '/PT/icons/nodejs.svg',
    color: '#339933',
  },
  {
    id: 'nest',
    label: 'NestJS',
    category: 'Backend',
    icon: '/PT/icons/nestjs.svg',
    color: '#E0234E',
  },
  {
    id: 'mongo',
    label: 'MongoDB',
    category: 'Backend',
    icon: '/PT/icons/mongodb.svg',
    color: '#47A248',
  },
  {
    id: 'pg',
    label: 'PostgreSQL',
    category: 'Backend',
    icon: '/PT/icons/postgresql.svg',
    color: '#4169E1',
  },
  {
    id: 'git',
    label: 'Git',
    category: 'Workflow',
    icon: '/PT/icons/git.svg',
    color: '#F05032',
  },
  {
    id: 'uiux',
    label: 'UI / UX',
    category: 'Design',
    icon: '/PT/icons/uiux.svg',
    color: '#C8A87A',
  },
]
