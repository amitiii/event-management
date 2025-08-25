'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.error) setError('Invalid credentials')
    else router.push('/dashboard')
  }

  return (
    <div className="card max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Sign in</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <div className="label">Email</div>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <div className="label">Password</div>
          <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="btn btn-primary" type="submit">Sign in</button>
      </form>
      <p className="text-xs mt-4 opacity-70">Sample creds in README</p>
    </div>
  )
}
