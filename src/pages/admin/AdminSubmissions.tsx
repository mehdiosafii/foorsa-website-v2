import { useState, useEffect } from 'react'
import { useAdmin } from '../../context/AdminContext'

interface Submission { submission_id: string; name?: string; email?: string; phone?: string; program_type?: string; city?: string; last_updated?: string; status?: string; treated?: boolean }

export default function AdminSubmissions() {
  const { token } = useAdmin()
  const [subs, setSubs] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    fetch('/api/admin/submissions', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setSubs).catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const toggleTreated = async (s: Submission) => {
    await fetch('/api/admin/submissions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ submission_id: s.submission_id, treated: !s.treated })
    })
    load()
  }

  const deleteSub = async (id: string) => {
    if (!confirm('Delete?')) return
    await fetch('/api/admin/submissions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ submission_id: id })
    })
    load()
  }

  return (
    <div>
      <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 30 }}>Submissions</h1>
      {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
        <div style={{ background: '#1e293b', borderRadius: 12, overflow: 'hidden', border: '1px solid #334155' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #334155' }}>
                {['Name', 'Email', 'Phone', 'Program', 'City', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#94a3b8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subs.map(s => (
                <tr key={s.submission_id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '12px 16px', color: '#fff', fontSize: 14 }}>{s.name || '-'}</td>
                  <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 14 }}>{s.email || '-'}</td>
                  <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 14 }}>{s.phone || '-'}</td>
                  <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 14 }}>{s.program_type || '-'}</td>
                  <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 14 }}>{s.city || '-'}</td>
                  <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 13 }}>{s.last_updated?.slice(0, 10) || '-'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, background: s.treated ? '#22c55e20' : '#f59e0b20', color: s.treated ? '#22c55e' : '#f59e0b' }}>
                      {s.treated ? 'Treated' : 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
                    <button onClick={() => toggleTreated(s)} style={{ padding: '6px 10px', background: '#334155', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>
                      {s.treated ? 'Unmark' : '✓ Treat'}
                    </button>
                    <button onClick={() => deleteSub(s.submission_id)} style={{ padding: '6px 10px', background: '#ef444520', color: '#ef4444', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>Delete</button>
                  </td>
                </tr>
              ))}
              {subs.length === 0 && (
                <tr><td colSpan={8} style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>No submissions yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
