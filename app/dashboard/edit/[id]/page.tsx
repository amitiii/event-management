import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { eventUpsertSchema } from '@/lib/schemas'
import { notFound, redirect } from 'next/navigation'

async function update(formData: FormData) {
  'use server'
  const session = await auth()
  if (!session?.user) return redirect('/auth/signin')
  const id = String(formData.get('id')||'')
  const data = {
    title: String(formData.get('title')||''),
    description: String(formData.get('description')||''),
    date: String(formData.get('date')||''),
    location: String(formData.get('location')||''),
  }
  const parsed = eventUpsertSchema.safeParse(data)
  if (!parsed.success) return
  await prisma.event.update({ where: { id }, data: parsed.data })
  return redirect('/dashboard')
}

async function remove(formData: FormData) {
  'use server'
  const session = await auth()
  if (!session?.user) return redirect('/auth/signin')
  const id = String(formData.get('id')||'')
  await prisma.event.delete({ where: { id } })
  return redirect('/dashboard')
}

export default async function EditEvent({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) return redirect('/auth/signin')
  const event = await prisma.event.findUnique({ where: { id: params.id } })
  if (!event) return notFound()

  return (
    <div className="card max-w-2xl space-y-3">
      <h1 className="text-xl font-semibold">Edit Event</h1>
      <form action={update} className="space-y-3">
        <input type="hidden" name="id" value={event.id} />
        <div><div className="label">Title</div><input className="input" name="title" defaultValue={event.title} required /></div>
        <div><div className="label">Description</div><textarea className="input" name="description" defaultValue={event.description} required /></div>
        <div><div className="label">Date & Time</div><input className="input" name="date" type="datetime-local" defaultValue={new Date(event.date).toISOString().slice(0,16)} required /></div>
        <div><div className="label">Location</div><input className="input" name="location" defaultValue={event.location} required /></div>
        <div className="flex gap-2">
          <button className="btn btn-primary" type="submit">Save</button>
          <form action={remove}><input type="hidden" name="id" value={event.id} /><button className="btn" type="submit">Delete</button></form>
        </div>
      </form>
    </div>
  )
}
