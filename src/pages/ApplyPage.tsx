import { useState, useEffect } from 'react'
import { useLang } from '../context/LangContext'
import { t } from '../lib/i18n'

const PROGRAM_PRICES: Record<string, number> = {
  language_bachelor: 27900,
  master_phd: 34900,
}

export default function ApplyPage() {
  const { lang } = useLang()
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', program_type: 'language_bachelor', country_code: '+212', promo_code: '' })
  const [promoResult, setPromoResult] = useState<{ valid: boolean; discount_type?: string; discount_value?: number } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [submissionId] = useState(`sub_${Date.now()}`)

  const basePrice = PROGRAM_PRICES[form.program_type] || 27900
  let finalPrice = basePrice
  if (promoResult?.valid) {
    if (promoResult.discount_type === 'percentage') finalPrice = basePrice * (1 - (promoResult.discount_value || 0) / 100)
    else if (promoResult.discount_type === 'fixed') finalPrice = basePrice - ((promoResult.discount_value || 0) * 100)
  }

  const validatePromo = async () => {
    if (!form.promo_code) return
    try {
      const res = await fetch('/api/promo/validate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: form.promo_code }) })
      const data = await res.json()
      setPromoResult(data)
    } catch { setPromoResult({ valid: false }) }
  }

  // Track partial form data
  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.name || form.email || form.phone) {
        fetch('/api/track-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, submission_id: submissionId, step: 'partial' })
        }).catch(() => {})
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [form.name, form.email, form.phone])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      // Track final submission
      await fetch('/api/track-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, submission_id: submissionId, step: 'complete', status: 'submitted' })
      })

      // Create payment intent
      const res = await fetch('/api/stripe/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: finalPrice, promo_code: form.promo_code })
      })
      const data = await res.json()
      if (data.clientSecret) {
        // Redirect to Stripe checkout or handle payment
        // For now, mark as success
        setSuccess(true)
      } else if (data.error) {
        setError(data.error)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
    setSubmitting(false)
  }

  if (success) {
    return (
      <div className="apply-page" style={{ padding: '120px 0 60px', background: '#f5f7fa', minHeight: '100vh' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 40, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#041228', marginBottom: 12 }}>
              {lang === 'fr' ? 'Candidature envoyée !' : lang === 'ar' ? 'تم إرسال الطلب!' : 'Application Submitted!'}
            </h2>
            <p style={{ color: '#666', fontSize: 16, lineHeight: 1.6 }}>
              {lang === 'fr' ? 'Nous vous contacterons bientôt.' : lang === 'ar' ? 'سنتواصل معك قريباً.' : 'We will contact you shortly.'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="apply-page" style={{ padding: '120px 0 60px', background: '#f5f7fa', minHeight: '100vh' }}>
      <div className="apply-header" style={{ textAlign: 'center', marginBottom: 40, paddingTop: 20 }}>
        <h1 style={{ fontSize: 48, fontWeight: 700, color: '#041228' }}>
          {lang === 'fr' ? 'Postuler' : lang === 'ar' ? 'سجل الآن' : 'Apply Now'}
        </h1>
      </div>

      <div className="apply-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        {/* Left: Fees info */}
        <div className="fees-section" style={{ background: 'linear-gradient(135deg, #041228, #0a2540)', borderRadius: 20, padding: 40, color: '#fff' }}>
          <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 30, textAlign: 'center' }}>
            {lang === 'fr' ? 'Votre Parcours' : lang === 'ar' ? 'مسارك' : 'Your Journey'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { num: '1', title: lang === 'fr' ? 'Consultation Gratuite' : 'Free Consultation', desc: lang === 'fr' ? 'Évaluation de votre profil et conseils personnalisés' : 'Profile evaluation and personalized guidance' },
              { num: '2', title: lang === 'fr' ? 'Sélection d\'Université' : 'University Selection', desc: lang === 'fr' ? 'Choix des meilleures universités pour votre profil' : 'Best university selection for your profile' },
              { num: '3', title: lang === 'fr' ? 'Dossier de Candidature' : 'Application Package', desc: lang === 'fr' ? 'Préparation complète de votre dossier' : 'Complete application preparation' },
              { num: '4', title: lang === 'fr' ? 'Visa & Départ' : 'Visa & Departure', desc: lang === 'fr' ? 'Assistance visa et préparation au départ' : 'Visa assistance and departure preparation' },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 20, border: '1px solid rgba(76,175,80,0.2)' }}>
                <div style={{ width: 50, height: 50, background: '#4CAF50', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, flexShrink: 0 }}>{step.num}</div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#4CAF50', marginBottom: 4 }}>{step.title}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="form-section" style={{ background: '#fff', borderRadius: 20, padding: 35, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: 25, textAlign: 'center' }}>
            <h3 style={{ fontSize: 26, fontWeight: 700, color: '#041228', margin: '0 0 8px' }}>
              {lang === 'fr' ? 'Commencez votre candidature' : lang === 'ar' ? 'ابدأ طلبك' : 'Start Your Application'}
            </h3>
            <p style={{ fontSize: 14, color: '#666' }}>
              {lang === 'fr' ? 'Remplissez le formulaire ci-dessous' : lang === 'ar' ? 'املأ النموذج أدناه' : 'Fill out the form below'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#041228', marginBottom: 8 }}>{t('form.fullname', lang)} <span style={{ color: '#dc2626' }}>*</span></label>
              <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={t('form.fullname', lang)} style={{ width: '100%', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 16 }} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#041228', marginBottom: 8 }}>{t('form.email', lang)} <span style={{ color: '#dc2626' }}>*</span></label>
              <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder={t('form.email', lang)} style={{ width: '100%', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 16 }} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#041228', marginBottom: 8 }}>{t('form.phone', lang)} <span style={{ color: '#dc2626' }}>*</span></label>
              <div style={{ display: 'flex', gap: 10 }}>
                <select value={form.country_code} onChange={e => setForm({ ...form, country_code: e.target.value })} style={{ width: 90, padding: '14px 10px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 15 }}>
                  <option value="+212">🇲🇦 +212</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
                <input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="6XXXXXXXX" style={{ flex: 1, padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 16 }} />
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#041228', marginBottom: 8 }}>{t('form.city', lang)}</label>
              <input type="text" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder={t('form.city', lang)} style={{ width: '100%', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 16 }} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#041228', marginBottom: 8 }}>{t('form.program', lang)} <span style={{ color: '#dc2626' }}>*</span></label>
              <select required value={form.program_type} onChange={e => setForm({ ...form, program_type: e.target.value })} style={{ width: '100%', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 16, appearance: 'none' as const }}>
                <option value="language_bachelor">{t('form.language_bachelor', lang)} — $279</option>
                <option value="master_phd">{t('form.master_phd', lang)} — $349</option>
              </select>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#041228', marginBottom: 8 }}>{t('form.promo', lang)}</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <input type="text" value={form.promo_code} onChange={e => setForm({ ...form, promo_code: e.target.value })} placeholder="CODE" style={{ flex: 1, padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 16 }} />
                <button type="button" onClick={validatePromo} style={{ padding: '14px 20px', background: '#041228', color: '#fff', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                  {lang === 'fr' ? 'Vérifier' : lang === 'ar' ? 'تحقق' : 'Validate'}
                </button>
              </div>
              {promoResult && (
                <p style={{ fontSize: 13, marginTop: 6, color: promoResult.valid ? '#22c55e' : '#dc2626' }}>
                  {promoResult.valid ? `✓ ${promoResult.discount_type === 'percentage' ? promoResult.discount_value + '%' : '$' + promoResult.discount_value} off!` : '✗ Invalid code'}
                </p>
              )}
            </div>

            {/* Price banner */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, #0d1b2a, #1b2838)', borderRadius: 12, padding: '18px 20px', margin: '20px 0 15px' }}>
              <div>
                <div style={{ fontSize: 12, color: '#9ca3af', textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>
                  {lang === 'fr' ? 'Frais de service' : lang === 'ar' ? 'رسوم الخدمة' : 'Service Fee'}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                  <span style={{ fontSize: 20, color: '#C9A84C', fontWeight: 600 }}>$</span>
                  <span style={{ fontSize: 32, color: '#fff', fontWeight: 700 }}>{(finalPrice / 100).toFixed(0)}</span>
                  <span style={{ fontSize: 14, color: '#9ca3af', marginLeft: 4 }}>USD</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#22c55e' }}>🔒 Secure payment</div>
            </div>

            {error && <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 10 }}>{error}</p>}

            <button type="submit" disabled={submitting} className="submit-btn" style={{ width: '100%', padding: '16px 24px', marginTop: 20, background: '#C9A84C', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 600, color: '#041228', cursor: 'pointer' }}>
              {submitting ? '...' : t('form.apply_btn', lang)}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
