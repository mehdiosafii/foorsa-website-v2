import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { t } from '../lib/i18n'

export default function Footer() {
  const { lang } = useLang()
  
  return (
    <footer className="footer-site" style={{ background: '#041228', color: '#fff', padding: '60px 0 30px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
        <div>
          <img src="/assets/img/logowhite.svg" alt="Foorsa" style={{ height: 40, marginBottom: 16 }} />
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
            Helping Moroccan students study in China since 2019.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <a href="https://www.facebook.com/Foorsaconsulting/" target="_blank"><img alt="facebook" src="/assets/img/facebook-white.png" style={{ width: 24 }} /></a>
            <a href="http://www.instagram.com/foorsa.ma/" target="_blank"><img alt="instagram" src="/assets/img/instagram-white.png" style={{ width: 24 }} /></a>
            <a href="https://www.linkedin.com/company/fooorsa-consulting" target="_blank"><img alt="linkedin" src="/assets/img/linkedin-white.png" style={{ width: 24 }} /></a>
            <a href="http://www.tiktok.com/@foorsa.ma" target="_blank"><img alt="tiktok" src="/assets/img/tiktok-white.png" style={{ width: 24 }} /></a>
            <a href="https://www.youtube.com/channel/UCGQpcJCswqd81o_Aq7W1ArQ" target="_blank"><img alt="youtube" src="/assets/img/youtube-white.png" style={{ width: 24 }} /></a>
            <a href="https://wa.me/+2120537911291" target="_blank"><img alt="whatsapp" src="/assets/img/whatsapp-white.png" style={{ width: 24 }} /></a>
          </div>
        </div>
        <div>
          <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li><Link to={`/${lang}/about-us.html`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>{t('nav.about', lang)}</Link></li>
            <li><Link to={`/${lang}/majors.html`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>{t('nav.majors', lang)}</Link></li>
            <li><Link to={`/${lang}/scholarship.html`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>{t('nav.scholarship', lang)}</Link></li>
            <li><Link to={`/${lang}/shop.html`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>{t('nav.apply', lang)}</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{t('nav.contact', lang)}</h4>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 2 }}>
            📧 contact@foorsa.ma<br />
            📞 +212 0537 911 291<br />
            📍 Rabat, Morocco
          </p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 40, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
        {t('footer.rights', lang)}
      </div>
    </footer>
  )
}
