import './globals.css'
import Link from 'next/link'
import { ReactNode } from 'react'
import Footer from '@/components/Footer'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="container py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold text-lg">EventEase</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/auth/signin">Sign in</Link>
            </nav>
          </div>
        </header>
        <main className="container my-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
