import { z } from 'zod';

export const companyProfileZodSchema = z.object({
  founders: z.object({
    names: z.string().min(1, 'Founder name is required'),
    technicalFounder: z.string().min(1, 'Technical founder is required'),
    coFounders: z.boolean(),
    coFounderNames: z.array(z.string()).optional(),
  }),
  company: z.object({
    name: z.string().min(1),
    shortDescription: z.string().min(1),
    website: z.string().url().optional(),
    product: z.string().min(1),
    location: z.string().min(1),
    locationReason: z.string().min(1),
  }),
  progress: z.object({
    status: z.string().min(1),
    timeSpent: z.string().min(1),
    techStack: z.string().min(1),
    productDemo: z.string().optional(),
    selling: z.boolean(),
    revenue: z.boolean(),
  }),
  ideas: z.object({
    whyThisIdea: z.string().min(1),
    competitors: z.string().min(1),
    moneyMaking: z.string().min(1),
    category: z.string().min(1),
  }),
  equity: z.object({
    legalEntity: z.boolean(),
    investment: z.boolean(),
    fundraising: z.boolean(),
    country: z.string().min(1),
  }),
  curious: z.object({
    discovery: z.string().min(1),
    priorPrograms: z.string().min(1),
  }),
  userId: z.string().length(24),
});
