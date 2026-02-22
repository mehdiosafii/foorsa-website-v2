import { useState, useEffect } from 'react'
import { useAdmin } from '../../context/AdminContext'

export default function AdminDashboard() {
  const { token } = useAdmin()
  const [stats, setStats] = useState({ submissions: 0, promo_codes: 0, active_promo_codes: 0, blog_articles: 0 })

  useEffect(() => {
    fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setStats).catch(() => {})
  }, [])

  const statCards = [
    { label: 'Form Submissions', value: stats.submissions, icon: '📋', color: '#6366f1' },
    { label: 'Active Promo Codes', value: stats.active_promo_codes, icon: '🏷️', color: '#22c55e' },
    { label: 'Blog Articles', value: stats.blog_articles, icon: '📝', color: '#3b82f6' },
    { label: 'Total Promos', value: stats.promo_codes, icon: '💳', color: '#f59e0b' },
  ]

  return (
    <div>
      <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Dashboard</h1>
      <p style={{ color: '#94a3b8', marginBottom: 30 }}>Welcome back! Here's your overview.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
        {statCards.map((s, i) => (
          <div key={i} style={{ background: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: s.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{s.icon}</div>
            </div>
            <h3 style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{s.value}</h3>
            <p style={{ fontSize: 14, color: '#94a3b8' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
