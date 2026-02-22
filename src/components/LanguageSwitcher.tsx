import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { FLAG_MAP, SUPPORTED_LANGS } from '../lib/i18n'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <div className="dropdown language-switcher">
      <div className="dropup">
        <button className="dropbtn" id="current-lang-btn" onClick={() => setOpen(!open)}>
          <div className="flag-icon"><img id="current-flag" alt="lang" src={FLAG_MAP[lang]} /></div>
          <span id="current-lang-text">{lang.toUpperCase()}</span>
          <span className="arrow">▲</span>
        </button>
        {open && (
          <div className="dropup-content" style={{ display: 'block' }}>
            {SUPPORTED_LANGS.map(l => (
              <a key={l} href="#" className={`lang-option ${l === lang ? 'active' : ''}`}
                onClick={e => { e.preventDefault(); setLang(l); setOpen(false) }}>
                <img src={FLAG_MAP[l]} alt={l.toUpperCase()} /> {l.toUpperCase()}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
