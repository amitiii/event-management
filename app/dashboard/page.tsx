import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await auth()
  if (!session?.user) return redirect('/auth/signin')
  const role = (session.user as any).role as 'ADMIN'|'STAFF'|'OWNER'
  const where = role === 'OWNER' ? { ownerId: session.user.id as string } : {}
  const events = await prisma.event.findMany({ where, orderBy: { createdAt: 'desc' } })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link href="/dashboard/new" className="btn btn-primary">Create Event</Link>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {events.map(e => (
          <div key={e.id} className="card">
            <div className="text-lg font-medium">{e.title}</div>
            <div className="text-sm opacity-80">{new Date(e.date).toLocaleString()} • {e.location}</div>
            <div className="mt-3 flex gap-2">
              <Link className="btn" href={`/dashboard/edit/${e.id}`}>Edit</Link>
              <Link className="btn" href={`/event/${e.publicId}`} target="_blank">Public page</Link>
              <Link className="btn" href={`/api/events/${e.id}/attendees.csv`}>Export CSV</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
