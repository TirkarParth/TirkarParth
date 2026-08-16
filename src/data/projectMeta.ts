import type { Project } from './content'

export type ProjectMetric = {
  label: string
  value: string
}

export type ProjectMeta = {
  category: string
  metrics: ProjectMetric[]
}

/** Presentation metadata derived from each project's real stack and features. */
export const projectMeta: Record<string, ProjectMeta> = {
  ecommerce: {
    category: 'Commerce / Multi-Service',
    metrics: [
      { label: 'Clients', value: 'React + Next.js' },
      { label: 'APIs', value: 'Go · Nest' },
      { label: 'Surfaces', value: '6 modules' },
      { label: 'Platforms', value: 'Web' },
    ],
  },
  corporate: {
    category: 'Web / Corporate',
    metrics: [
      { label: 'Stack', value: 'React' },
      { label: 'Forms', value: 'EmailJS' },
      { label: 'Hosting', value: 'FTP / all.inkl' },
      { label: 'Scope', value: 'End-to-end' },
    ],
  },
  'mobile-ecommerce': {
    category: 'Mobile / Commerce',
    metrics: [
      { label: 'Client', value: 'React Native' },
      { label: 'Targets', value: 'iOS · Android' },
      { label: 'APIs', value: 'Go · Nest' },
      { label: 'Parity', value: 'Full feature set' },
    ],
  },
  'myflix-react': {
    category: 'MERN / Media',
    metrics: [
      { label: 'Client', value: 'React' },
      { label: 'Auth', value: 'Passport.js' },
      { label: 'Data', value: 'MongoDB' },
      { label: 'API', value: 'Express' },
    ],
  },
  'chat-app': {
    category: 'Mobile / Realtime',
    metrics: [
      { label: 'Client', value: 'React Native' },
      { label: 'Realtime', value: 'Firestore' },
      { label: 'Media', value: 'Photos · Location' },
      { label: 'Offline', value: 'Supported' },
    ],
  },
  'myflix-angular': {
    category: 'SPA / Media',
    metrics: [
      { label: 'Client', value: 'Angular' },
      { label: 'UI', value: 'Angular Material' },
      { label: 'Lang', value: 'TypeScript' },
      { label: 'Docs', value: 'Typedoc' },
    ],
  },
  meet: {
    category: 'PWA / Calendar',
    metrics: [
      { label: 'Type', value: 'Serverless PWA' },
      { label: 'Auth', value: 'OAuth' },
      { label: 'API', value: 'Google Calendar' },
      { label: 'Tests', value: 'Jest · Cucumber' },
    ],
  },
  'myflix-api': {
    category: 'API / Backend',
    metrics: [
      { label: 'Runtime', value: 'Node · Express' },
      { label: 'Data', value: 'MongoDB' },
      { label: 'Auth', value: 'JWT' },
      { label: 'Docs', value: 'JSDoc · Postman' },
    ],
  },
  pokemon: {
    category: 'Frontend / API',
    metrics: [
      { label: 'Stack', value: 'HTML · CSS · JS' },
      { label: 'Libs', value: 'jQuery · Bootstrap' },
      { label: 'Data', value: 'External API' },
      { label: 'UX', value: 'Responsive' },
    ],
  },
  taskmaster: {
    category: 'Full-Stack / Productivity',
    metrics: [
      { label: 'Client', value: 'React · Redux' },
      { label: 'Server', value: 'Node · Express' },
      { label: 'Data', value: 'MongoDB' },
      { label: 'Auth', value: 'JWT' },
    ],
  },
}

export function getProjectMeta(project: Project): ProjectMeta {
  return (
    projectMeta[project.id] ?? {
      category: 'Project',
      metrics: project.technologies.slice(0, 4).map((tech) => ({
        label: 'Tech',
        value: tech,
      })),
    }
  )
}
