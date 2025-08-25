import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { auth, signIn, signOut, handlers } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      id: "credentials",
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        const email = creds?.email as string
        const password = creds?.password as string
        if (!email || !password) return null
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return null
        const ok = await bcrypt.compare(password, user.passwordHash)
        if (!ok) return null
        return { id: user.id, email: user.email, name: user.name, role: user.role }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role
      return token
    },
    async session({ session, token }) {
      if (session?.user) (session.user as any).role = token.role
      return session
    }
  }
})
