import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAdmin()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const ok = await login(password)
    if (ok) navigate('/admin')
    else setError('Invalid password')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
      <form onSubmit={handleSubmit} style={{ background: '#1e293b', padding: 40, borderRadius: 16, width: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <img src="/assets/img/logowhite.svg" alt="Foorsa" style={{ height: 32, marginBottom: 30, display: 'block' }} />
        <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Admin Panel</h1>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Enter your admin password</p>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required
          style={{ width: '100%', padding: '14px 16px', background: '#0f172a', border: '2px solid #334155', borderRadius: 10, color: '#fff', fontSize: 16, marginBottom: 16, boxSizing: 'border-box' }} />
        {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '14px', background: '#3b82f6', color: '#fff', borderRadius: 10, border: 'none', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  )
}
