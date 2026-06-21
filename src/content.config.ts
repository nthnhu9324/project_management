import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const kpiItemSchema = z.object({
  label: z.string(),
  kpi: z.number(),
  post: z.number(),
  link_air: z.number(),
  note: z.string().optional(),
});

const overviewTaskSchema = z.object({
  task: z.string(),
  status: z.string(),
  priority: z.string().optional(),
  deadline: z.string().optional(),
  note: z.string().optional(),
});

const accountTaskSchema = z.object({
  title: z.string(),
  status: z.string(),
  progress: z.number().default(0),
  deadline_internal: z.string().optional(),
  deadline_ext: z.string().optional(),
  note: z.string().optional(),
});

const paymentItemSchema = z.object({
  partner: z.string(),
  type: z.string(),
  due_date: z.string(),
  amount: z.string(),
  overdue_days: z.number().default(0),
  status: z.string(),
  note: z.string().optional(),
});

const contractItemSchema = z.object({
  partner: z.string(),
  doc: z.string(),
  status: z.string(),
  note: z.string().optional(),
});

const brandsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/brands' }),
  schema: z.object({
    title: z.string(),
    leader: z.string().optional(),
    core_service: z.string().optional(),
    logo: z.string().optional(),
    overall_progress: z.number().min(0).max(100).default(0),
    sheet_url: z.string().optional(),
    sheet_embed_url: z.string().optional(),
    kpi_items: z.array(kpiItemSchema).optional(),
    overview_tasks: z.array(overviewTaskSchema).optional(),
    account_tasks: z.array(accountTaskSchema).optional(),
    payment_items: z.array(paymentItemSchema).optional(),
    contract_items: z.array(contractItemSchema).optional(),
  }),
});

const tasksCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tasks' }),
  schema: z.object({
    title: z.string(),
    brand: z.string(),
    date: z.coerce.date().optional(),
    category: z.string().optional(),
    status: z.enum(['Not Started', 'In Progress', 'Pending', 'Completed', 'Canceled']).default('Not Started'),
    progress: z.number().min(0).max(100).default(0),
    deadline_ext: z.coerce.date().optional(),
    deadline_internal: z.coerce.date().optional(),
    attachment_link: z.string().optional(),
  }),
});

const lessonsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    brand: z.string().optional(),
  }),
});

const resourcesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
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
