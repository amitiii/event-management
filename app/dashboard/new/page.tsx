import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { eventUpsertSchema } from '@/lib/schemas'
import { redirect } from 'next/navigation'

async function create(formData: FormData) {
  'use server'
  const session = await auth()
  if (!session?.user) return redirect('/auth/signin')
  const data = {
    title: String(formData.get('title')||''),
    description: String(formData.get('description')||''),
    date: String(formData.get('date')||''),
    location: String(formData.get('location')||''),
  }
  const parsed = eventUpsertSchema.safeParse(data)
  if (!parsed.success) return
  const publicId = Math.random().toString(36).slice(2, 10)
  await prisma.event.create({
    data: { ...parsed.data, publicId, ownerId: session.user.id as string }
  })
  return redirect('/dashboard')
}

export default async function NewEvent() {
  const session = await auth()
  if (!session?.user) return redirect('/auth/signin')
  return (
    <form action={create} className="card max-w-2xl space-y-3">
      <h1 className="text-xl font-semibold">Create Event</h1>
      <div><div className="label">Title</div><input className="input" name="title" required /></div>
      <div><div className="label">Description</div><textarea className="input" name="description" required /></div>
      <div><div className="label">Date & Time</div><input className="input" name="date" type="datetime-local" required /></div>
      <div><div className="label">Location</div><input className="input" name="location" required /></div>
      <button className="btn btn-primary" type="submit">Create</button>
    </form>
  )
}
