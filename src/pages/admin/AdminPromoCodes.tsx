import { useState, useEffect } from 'react'
import { useAdmin } from '../../context/AdminContext'

interface PromoCode { id: number; code: string; discount_type: string; discount_value: number; min_purchase: number; max_uses: number | null; current_uses: number; is_active: boolean; description: string; valid_from: string; valid_until: string }

export default function AdminPromoCodes() {
  const { token } = useAdmin()
  const [codes, setCodes] = useState<PromoCode[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ code: '', discount_type: 'percentage', discount_value: '', max_uses: '', description: '', is_active: true })

  const load = () => {
    fetch('/api/admin/promo-codes', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setCodes).catch(() => {})
  }

  useEffect(load, [])

  const create = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/admin/promo-codes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...form, discount_value: Number(form.discount_value), max_uses: form.max_uses ? Number(form.max_uses) : null })
    })
    setShowForm(false)
    setForm({ code: '', discount_type: 'percentage', discount_value: '', max_uses: '', description: '', is_active: true })
    load()
  }

  const deleteCode = async (id: number) => {
    if (!confirm('Delete?')) return
    await fetch(`/api/admin/promo-codes?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    load()
  }

  const toggleActive = async (c: PromoCode) => {
    await fetch('/api/admin/promo-codes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...c, is_active: !c.is_active })
    })
    load()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>Promo Codes</h1>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '10px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
          {showForm ? 'Cancel' : '+ New Code'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={create} style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #334155', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <input placeholder="Code" required value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} style={{ padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 14 }} />
          <select value={form.discount_type} onChange={e => setForm({ ...form, discount_type: e.target.value })} style={{ padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 14 }}>
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed ($)</option>
          </select>
          <input placeholder="Discount value" required type="number" value={form.discount_value} onChange={e => setForm({ ...form, discount_value: e.target.value })} style={{ padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 14 }} />
          <input placeholder="Max uses (empty=unlimited)" type="number" value={form.max_uses} onChange={e => setForm({ ...form, max_uses: e.target.value })} style={{ padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 14 }} />
          <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 14, gridColumn: 'span 2' }} />
          <button type="submit" style={{ padding: '12px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, gridColumn: 'span 2' }}>Create</button>
        </form>
      )}

      <div style={{ background: '#1e293b', borderRadius: 12, overflow: 'hidden', border: '1px solid #334155' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              {['Code', 'Type', 'Value', 'Uses', 'Status', 'Description', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#94a3b8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {codes.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '12px 16px', color: '#fff', fontSize: 14, fontWeight: 600 }}>{c.code}</td>
                <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 14 }}>{c.discount_type}</td>
                <td style={{ padding: '12px 16px', color: '#fff', fontSize: 14 }}>{c.discount_type === 'percentage' ? `${c.discount_value}%` : `$${c.discount_value}`}</td>
                <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 14 }}>{c.current_uses}/{c.max_uses || '∞'}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, background: c.is_active ? '#22c55e20' : '#ef444520', color: c.is_active ? '#22c55e' : '#ef4444' }}>
                    {c.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 13 }}>{c.description || '-'}</td>
                <td style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
                  <button onClick={() => toggleActive(c)} style={{ padding: '6px 10px', background: '#334155', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>
                    {c.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button onClick={() => deleteCode(c.id)} style={{ padding: '6px 10px', background: '#ef444520', color: '#ef4444', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>Delete</button>
                </td>
              </tr>
            ))}
            {codes.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>No promo codes</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
