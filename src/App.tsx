import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import { AdminProvider } from './context/AdminContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ApplyPage from './pages/ApplyPage'
import BlogPage from './pages/BlogPage'
import BlogArticlePage from './pages/BlogArticlePage'
import StaticPage from './pages/StaticPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminSubmissions from './pages/admin/AdminSubmissions'
import AdminPromoCodes from './pages/admin/AdminPromoCodes'
import AdminBlog from './pages/admin/AdminBlog'
import PaymentConfirmation from './pages/PaymentConfirmation'
import PaymentFailed from './pages/PaymentFailed'

export default function App() {
  return (
    <LangProvider>
      <AdminProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="submissions" element={<AdminSubmissions />} />
              <Route path="promo-codes" element={<AdminPromoCodes />} />
              <Route path="blog" element={<AdminBlog />} />
            </Route>

            {/* Public routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/:lang" element={<HomePage />} />
              <Route path="/:lang/index.html" element={<HomePage />} />
              <Route path="/:lang/shop.html" element={<ApplyPage />} />
              <Route path="/:lang/blog.html" element={<BlogPage />} />
              <Route path="/:lang/blog/:slug" element={<BlogArticlePage />} />
              <Route path="/:lang/payment-confirmation.html" element={<PaymentConfirmation />} />
              <Route path="/:lang/payment-failed.html" element={<PaymentFailed />} />
              <Route path="/:lang/:page" element={<StaticPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </LangProvider>
  )
}
