import { z, defineCollection } from 'astro:content';

const brandsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    leader: z.string().optional(),
    core_service: z.string().optional(),
    logo: z.string().optional(),
    overall_progress: z.number().min(0).max(100).default(0),
  }),
});

const tasksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    brand: z.string(),
    date: z.date().optional(),
    category: z.string().optional(),
    kpi: z.string().optional(),
    post: z.string().optional(),
    link_air: z.string().optional(),
    actual: z.string().optional(),
    status: z.enum(['Not Started', 'In Progress', 'Pending', 'Completed', 'Canceled']).default('Not Started'),
    progress: z.number().min(0).max(100).default(0),
    deadline_ext: z.date().optional(),
    deadline_internal: z.date().optional(),
    attachment_link: z.string().optional(),
  }),
});

const lessonsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date().optional(),
    brand: z.string().optional(),
  }),
});

const resourcesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    url: z.string(),
    category: z.enum(['Template', 'Source', 'Design', 'Khác']).default('Khác'),
  }),
});

export const collections = {
  brands: brandsCollection,
  tasks: tasksCollection,
  lessons: lessonsCollection,
  resources: resourcesCollection,
};
