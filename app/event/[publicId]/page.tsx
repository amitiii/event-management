import { prisma } from '@/lib/prisma'
import { rsvpSchema } from '@/lib/schemas'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

async function createRSVP(formData: FormData) {
  'use server'
  const name = String(formData.get('name') || '')
  const email = String(formData.get('email') || '')
  const eventId = String(formData.get('eventId') || '')
  const parse = rsvpSchema.safeParse({ name, email })
  if (!parse.success) return { error: 'Invalid inputs' }
  await prisma.rSVP.create({ data: { eventId, name, email } })
  revalidatePath(`/event/${eventId}`)
  return redirect(`/event/${(await prisma.event.findUnique({ where: { id: eventId } }))?.publicId}?ok=1`)
}

export default async function PublicEvent({ params }: { params: { publicId: string } }) {
  const event = await prisma.event.findUnique({ where: { publicId: params.publicId } })
  if (!event) return <div className="card">Event not found</div>
  return (
    <div className="card max-w-2xl">
      <h1 className="text-xl font-semibold">{event.title}</h1>
      <div className="text-sm opacity-80">{new Date(event.date).toLocaleString()} • {event.location}</div>
      <p className="mt-2">{event.description}</p>

      <h2 className="mt-6 font-medium">RSVP</h2>
      <form action={createRSVP} className="grid md:grid-cols-2 gap-3 mt-2">
        <input type="hidden" name="eventId" value={event.id} />
        <div><div className="label">Name</div><input className="input" name="name" required /></div>
        <div><div className="label">Email</div><input className="input" name="email" type="email" required /></div>
        <button className="btn btn-primary md:col-span-2" type="submit">Submit RSVP</button>
      </form>
    </div>
  )
}
