import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

interface Article { id: string; title: string; slug: string; excerpt: string; featured_image: string; category: string; published_at: string; author: string }

export default function BlogPage() {
  const { lang } = useLang()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/blog/articles?status=published&lang=${lang}`)
      .then(r => r.json())
      .then(setArticles)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [lang])

  return (
    <div style={{ padding: '120px 0 60px', background: '#f5f7fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: 42, fontWeight: 700, color: '#041228', marginBottom: 40, textAlign: 'center' }}>Blog</h1>
        {loading ? <p style={{ textAlign: 'center', color: '#666' }}>Loading...</p> : articles.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No articles yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 30 }}>
            {articles.map(a => (
              <Link key={a.id} to={`/${lang}/blog/${a.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'transform 0.3s' }}>
                  {a.featured_image && <img src={a.featured_image} alt={a.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />}
                  <div style={{ padding: 24 }}>
                    <span style={{ fontSize: 12, color: '#666', textTransform: 'uppercase' }}>{a.category}</span>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#041228', margin: '8px 0 12px' }}>{a.title}</h3>
                    <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{a.excerpt}</p>
                    <p style={{ fontSize: 12, color: '#999', marginTop: 12 }}>{a.author} · {a.published_at?.slice(0, 10)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
