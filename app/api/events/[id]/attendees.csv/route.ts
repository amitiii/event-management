import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })
  const event = await prisma.event.findUnique({ where: { id: params.id }, include: { rsvps: true } })
  if (!event) return new NextResponse('Not Found', { status: 404 })

  // Role guard: Owner can export only own event; staff/admin can export any
  const role = (session.user as any).role as 'ADMIN'|'STAFF'|'OWNER'
  if (role === 'OWNER' && event.ownerId !== (session.user.id as string)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const header = 'name,email,createdAt\n'
  const lines = event.rsvps.map(r => `${r.name},${r.email},${r.createdAt.toISOString()}`).join('\n')
  const csv = header + lines + '\n'
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="attendees-${event.publicId}.csv"`
    }
  })
}
