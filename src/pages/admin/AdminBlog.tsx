import { useState, useEffect } from 'react'
import { useAdmin } from '../../context/AdminContext'

interface Article { id: string; title: string; slug: string; excerpt: string; content: string; category: string; status: string; language: string; author: string; created_at: string; featured_image: string; auto_translate?: boolean }

export default function AdminBlog() {
  const { token } = useAdmin()
  const [articles, setArticles] = useState<Article[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: 'tips', status: 'draft', language: 'en', author: 'Foorsa Team', featured_image: '', auto_translate: false })

  const load = () => {
    fetch('/api/admin/blog?status=all', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setArticles).catch(() => {})
  }

  useEffect(load, [])

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editId ? 'PUT' : 'POST'
    const url = editId ? `/api/admin/blog?id=${editId}` : '/api/admin/blog'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(form) })
    setShowForm(false)
    setEditId(null)
    setForm({ title: '', excerpt: '', content: '', category: 'tips', status: 'draft', language: 'en', author: 'Foorsa Team', featured_image: '', auto_translate: false })
    load()
  }

  const edit = (a: Article) => {
    setForm({ title: a.title, excerpt: a.excerpt, content: a.content, category: a.category, status: a.status, language: a.language, author: a.author, featured_image: a.featured_image, auto_translate: false })
    setEditId(a.id)
    setShowForm(true)
  }

  const del = async (id: string) => {
    if (!confirm('Delete?')) return
    await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    load()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>Blog</h1>
        <button onClick={() => { setShowForm(!showForm); setEditId(null) }} style={{ padding: '10px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
          {showForm ? 'Cancel' : '+ New Article'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={save} style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={{ padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 14 }} />
          <input placeholder="Excerpt" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} style={{ padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 14 }} />
          <textarea placeholder="Content (HTML)" rows={8} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} style={{ padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 14, fontFamily: 'monospace', resize: 'vertical' }} />
          <input placeholder="Featured image URL" value={form.featured_image} onChange={e => setForm({ ...form, featured_image: e.target.value })} style={{ padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 14 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 14 }}>
              {['tips', 'scholarships', 'universities', 'visa-guide', 'student-life', 'success-stories', 'general'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={form.language} onChange={e => setForm({ ...form, language: e.target.value })} style={{ padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 14 }}>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="ar">Arabic</option>
            </select>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={{ padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 14 }}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          {!editId && (
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', fontSize: 14 }}>
              <input type="checkbox" checked={form.auto_translate} onChange={e => setForm({ ...form, auto_translate: e.target.checked })} />
              Auto-translate to FR & AR
            </label>
          )}
          <button type="submit" style={{ padding: '12px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>{editId ? 'Update' : 'Create'}</button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {articles.map(a => (
          <div key={a.id} style={{ background: '#1e293b', borderRadius: 12, padding: 20, border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
              <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: a.status === 'published' ? '#22c55e20' : '#f59e0b20', color: a.status === 'published' ? '#22c55e' : '#f59e0b' }}>{a.status}</span>
              <span style={{ fontSize: 11, color: '#64748b' }}>{a.language.toUpperCase()}</span>
            </div>
            <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 8, lineHeight: 1.4 }}>{a.title}</h3>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>{a.excerpt?.slice(0, 100)}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => edit(a)} style={{ padding: '6px 12px', background: '#334155', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>Edit</button>
              <button onClick={() => del(a.id)} style={{ padding: '6px 12px', background: '#ef444520', color: '#ef4444', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>Delete</button>
            </div>
          </div>
        ))}
        {articles.length === 0 && <p style={{ color: '#94a3b8', gridColumn: 'span 3', textAlign: 'center', padding: 40 }}>No articles yet</p>}
      </div>
    </div>
  )
}
