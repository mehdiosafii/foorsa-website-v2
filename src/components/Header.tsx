import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { t } from '../lib/i18n'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { lang } = useLang()
  const [mobileOpen, setMobileOpen] = useState(false)
  const p = (page: string) => `/${lang}/${page}`

  return (
    <>
      {/* Desktop Header */}
      <div className="header header-desktop sticky">
        <div className="logo-menu active">
          <div className="logo">
            <Link to={`/${lang}`}><img alt="logo" src="/assets/img/logo-bl.png" /></Link>
          </div>
          <nav className="main-menu active">
            <ul className="menu">
              <li className="menu-item menu-item-has-children">
                <a href="#">Foorsa <span className="dropdown-arrow">▼</span></a>
                <ul className="sub-menu">
                  <li><Link to={p('about-us.html')}>{t('nav.about', lang)}</Link></li>
                  <li><Link to={p('mission-values.html')}>{t('nav.mission', lang)}</Link></li>
                  <li><Link to={p('engagement.html')}>{t('nav.engagement', lang)}</Link></li>
                  <li><Link to={p('recruitment.html')}>{t('nav.recruitment', lang)}</Link></li>
                  <li><Link to={p('partner-with-us.html')}>{t('nav.partner', lang)}</Link></li>
                  <li><Link to={p('contact.html')}>{t('nav.contact', lang)}</Link></li>
                </ul>
              </li>
              <li className="menu-item menu-item-has-children">
                <a href="#">China <span className="dropdown-arrow">▼</span></a>
                <ul className="sub-menu">
                  <li><Link to={p('majors.html')}>{t('nav.majors', lang)}</Link></li>
                  <li><Link to={p('scholarship.html')}>{t('nav.scholarship', lang)}</Link></li>
                  <li><Link to={p('fees.html')}>{t('nav.fees', lang)}</Link></li>
                  <li><Link to={p('step-by-step.html')}>{t('nav.steps', lang)}</Link></li>
                  <li><Link to={p('documents.html')}>{t('nav.documents', lang)}</Link></li>
                  <li><Link to={p('frequently-asked-questions.html')}>{t('nav.faq', lang)}</Link></li>
                </ul>
              </li>
              <li className="menu-item"><Link to={p('blog.html')}>{t('nav.blog', lang)}</Link></li>
            </ul>
          </nav>
          <Link className="btn-apply-navbar" to={p('shop.html')}>{t('nav.apply', lang)}</Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="header header-mobile">
        <div className="logo-top">
          <Link to={`/${lang}`}><img alt="logo" src="/assets/img/logo-bl.png" /></Link>
        </div>
        <Link className="btn-apply-navbar" to={p('shop.html')}>{t('nav.apply', lang)}</Link>
        <nav role="navigation">
          <div id="menuToggle">
            <input type="checkbox" checked={mobileOpen} onChange={() => setMobileOpen(!mobileOpen)} />
            <span></span>
            <span></span>
            <div id="menu" style={{ display: mobileOpen ? 'block' : 'none' }}>
              <div className="menu-mobile-menu-container">
                <ul className="menu" id="menu-mobile-menu">
                  <li className="menu-item"><Link to={`/${lang}`} onClick={() => setMobileOpen(false)}>{t('nav.home', lang)}</Link></li>
                  <li className="menu-item"><Link to={p('about-us.html')} onClick={() => setMobileOpen(false)}>{t('nav.about', lang)}</Link></li>
                  <li className="menu-item"><Link to={p('majors.html')} onClick={() => setMobileOpen(false)}>{t('nav.majors', lang)}</Link></li>
                  <li className="menu-item"><Link to={p('scholarship.html')} onClick={() => setMobileOpen(false)}>{t('nav.scholarship', lang)}</Link></li>
                  <li className="menu-item"><Link to={p('fees.html')} onClick={() => setMobileOpen(false)}>{t('nav.fees', lang)}</Link></li>
                  <li className="menu-item"><Link to={p('step-by-step.html')} onClick={() => setMobileOpen(false)}>{t('nav.steps', lang)}</Link></li>
                  <li className="menu-item"><Link to={p('documents.html')} onClick={() => setMobileOpen(false)}>{t('nav.documents', lang)}</Link></li>
                  <li className="menu-item"><Link to={p('blog.html')} onClick={() => setMobileOpen(false)}>{t('nav.blog', lang)}</Link></li>
                  <li className="menu-item"><Link to={p('quiz.html')} onClick={() => setMobileOpen(false)}>{t('nav.quiz', lang)}</Link></li>
                  <li className="menu-item"><Link to={p('frequently-asked-questions.html')} onClick={() => setMobileOpen(false)}>{t('nav.faq', lang)}</Link></li>
                  <li className="menu-item"><Link to={p('contact.html')} onClick={() => setMobileOpen(false)}>{t('nav.contact', lang)}</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <LanguageSwitcher />
    </>
  )
}
