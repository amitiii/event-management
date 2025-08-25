import { z } from 'zod'

export const eventUpsertSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  description: z.string().min(10),
  date: z.coerce.date(),
  location: z.string().min(2),
})

export const rsvpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email()
})
