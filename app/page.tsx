import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const events = await prisma.event.findMany({ orderBy: { date: 'asc' } })
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Upcoming Events</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {events.map(e => (
          <div key={e.id} className="card">
            <div className="text-lg font-medium">{e.title}</div>
            <div className="text-sm opacity-80">{new Date(e.date).toLocaleString()} • {e.location}</div>
            <p className="mt-2 text-sm">{e.description}</p>
            <Link href={`/event/${e.publicId}`} className="btn mt-4">Open public page</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
