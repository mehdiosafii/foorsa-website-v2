import { Outlet, Link, useLocation, Navigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

const navItems = [
  { path: '/admin', label: 'Overview', icon: '📊' },
  { path: '/admin/submissions', label: 'Submissions', icon: '📋' },
  { path: '/admin/promo-codes', label: 'Promo Codes', icon: '🏷️' },
  { path: '/admin/blog', label: 'Blog', icon: '📝' },
]

export default function AdminLayout() {
  const { isAuth, logout } = useAdmin()
  const location = useLocation()

  if (!isAuth) return <Navigate to="/admin/login" />

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: '#1e293b', padding: '20px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #334155' }}>
          <img src="/assets/img/logowhite.svg" alt="Foorsa" style={{ height: 28 }} />
        </div>
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {navItems.map(item => {
            const active = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
                color: active ? '#fff' : '#94a3b8', background: active ? '#334155' : 'transparent',
                textDecoration: 'none', fontSize: 14, fontWeight: active ? 600 : 400, transition: 'all 0.2s'
              }}>
                <span>{item.icon}</span> {item.label}
              </Link>
            )
          })}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid #334155' }}>
          <button onClick={logout} style={{ width: '100%', padding: '10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>Logout</button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: 30, overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}
