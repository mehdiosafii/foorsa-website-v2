import { useParams } from 'react-router-dom'

export default function StaticPage() {
  const { page } = useParams()
  return (
    <div style={{ padding: '120px 0 60px', minHeight: '100vh', background: '#f5f7fa' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#041228', marginBottom: 20 }}>
          {page?.replace(/-/g, ' ').replace('.html', '').replace(/\b\w/g, c => c.toUpperCase())}
        </h1>
        <p style={{ color: '#666', fontSize: 16 }}>This page is being migrated. Please check back soon.</p>
      </div>
    </div>
  )
}
