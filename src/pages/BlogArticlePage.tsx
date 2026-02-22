import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

export default function BlogArticlePage() {
  const { lang } = useLang()
  const { slug } = useParams()
  const [article, setArticle] = useState<any>(null)

  useEffect(() => {
    if (slug) fetch(`/api/blog/article/${slug}`).then(r => r.json()).then(setArticle).catch(() => {})
  }, [slug])

  if (!article) return <div style={{ padding: '120px 20px', textAlign: 'center' }}>Loading...</div>

  return (
    <div style={{ padding: '120px 0 60px', background: '#fff', minHeight: '100vh' }}>
      <article style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px' }}>
        <Link to={`/${lang}/blog.html`} style={{ color: '#666', fontSize: 14, textDecoration: 'none', marginBottom: 20, display: 'block' }}>← Back to Blog</Link>
        {article.featured_image && <img src={article.featured_image} alt={article.title} style={{ width: '100%', borderRadius: 16, marginBottom: 30, maxHeight: 400, objectFit: 'cover' }} />}
        <span style={{ fontSize: 12, color: '#C9A84C', textTransform: 'uppercase', fontWeight: 600 }}>{article.category}</span>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#041228', margin: '8px 0 16px' }}>{article.title}</h1>
        <p style={{ fontSize: 14, color: '#999', marginBottom: 30 }}>{article.author} · {article.published_at?.slice(0, 10)} · {article.views} views</p>
        <div style={{ fontSize: 16, lineHeight: 1.8, color: '#333' }} dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </div>
  )
}
