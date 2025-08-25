import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const users = [
    { email: 'admin@eventease.dev', role: Role.ADMIN, password: 'Admin@123', name: 'Admin User' },
    { email: 'staff@eventease.dev', role: Role.STAFF, password: 'Staff@123', name: 'Staff User' },
    { email: 'owner@eventease.dev', role: Role.OWNER, password: 'Owner@123', name: 'Owner User' },
  ]

  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 10)
    await prisma.user.upsert({
      where: { email: u.email },
      update: { passwordHash: hash, role: u.role, name: u.name },
      create: { email: u.email, role: u.role, passwordHash: hash, name: u.name },
    })
  }

  // Create a sample event for public page demo
  const owner = await prisma.user.findUnique({ where: { email: 'owner@eventease.dev' } })
  if (owner) {
    await prisma.event.upsert({
      where: { publicId: 'sample-meetup' },
      update: {},
      create: {
        publicId: 'sample-meetup',
        title: 'Sample Meetup',
        description: 'A friendly get-together to demo EventEase.',
        date: new Date(Date.now() + 7*24*60*60*1000),
        location: 'Pune, India',
        ownerId: owner.id,
      }
    })
  }
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
