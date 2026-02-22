import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { t } from '../lib/i18n'

export default function HomePage() {
  const { lang } = useLang()
  
  return (
    <>
      {/* Hero Section */}
      <section className="section" id="sectionHero">
        <video className="hero-video-bg hero-video-desktop" autoPlay muted loop playsInline preload="metadata" poster="/assets/img/video-poster.jpg">
          <source src="/assets/video/hero-video.mp4" type="video/mp4" />
        </video>
        <video className="hero-video-bg hero-video-mobile" autoPlay muted loop playsInline preload="metadata" poster="/assets/img/video-poster.jpg">
          <source src="/assets/video/hero-video-mobile.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" id="heroOverlay">
          <div className="hero-mobile-headline">
            <h1>Dream Bigger.<br /><span>{t('hero.title', lang)}.</span></h1>
          </div>
          <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#fff', textAlign: 'center', padding: '0 20px' }}>
            <img alt="logo" src="/assets/img/logohero.png" style={{ maxWidth: 200, marginBottom: 20 }} />
            <h2 className="subTitle">Find Yourself</h2>
          </div>
          <div className="hero-scroll-indicator">
            <span>↓</span>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="section" id="sectionEducation" style={{ padding: '80px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <h2 className="title" style={{ fontSize: 36, fontWeight: 700, color: '#041228', marginBottom: 16 }}>
            {lang === 'fr' ? 'Votre Rêve d\'Étudier en Chine Commence Ici' : lang === 'ar' ? 'حلمك بالدراسة في الصين يبدأ من هنا' : 'Your Dream of Studying in China Starts Here'}
          </h2>
          <p style={{ fontSize: 18, color: '#666', maxWidth: 700, margin: '0 auto 50px', lineHeight: 1.6 }}>
            {lang === 'fr' ? 'Foorsa vous accompagne à chaque étape de votre parcours académique en Chine.' : lang === 'ar' ? 'فورصة ترافقك في كل خطوة من مسيرتك الأكاديمية في الصين.' : 'Foorsa guides you through every step of your academic journey in China.'}
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 30 }}>
            {[
              { icon: '🎓', title: lang === 'fr' ? 'Langue + Licence' : lang === 'ar' ? 'لغة + إجازة' : 'Language + Bachelor', desc: lang === 'fr' ? 'Apprenez le chinois et obtenez votre licence dans les meilleures universités chinoises.' : lang === 'ar' ? 'تعلم اللغة الصينية واحصل على شهادتك في أفضل الجامعات الصينية.' : 'Learn Chinese and earn your bachelor\'s degree at top Chinese universities.' },
              { icon: '📚', title: lang === 'fr' ? 'Master / Doctorat' : lang === 'ar' ? 'ماستر / دكتوراه' : 'Master / PhD', desc: lang === 'fr' ? 'Poursuivez vos études supérieures avec des programmes de qualité mondiale.' : lang === 'ar' ? 'أكمل دراساتك العليا مع برامج ذات جودة عالمية.' : 'Continue your higher education with world-class programs.' },
              { icon: '💰', title: lang === 'fr' ? 'Bourses d\'études' : lang === 'ar' ? 'المنح الدراسية' : 'Scholarships', desc: lang === 'fr' ? 'Accédez à des bourses couvrant les frais de scolarité, le logement et plus.' : lang === 'ar' ? 'احصل على منح تغطي الرسوم الدراسية والسكن وأكثر.' : 'Access scholarships covering tuition, accommodation, and more.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#f8f9fa', borderRadius: 16, padding: 35, textAlign: 'center', transition: 'transform 0.3s' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#041228', marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="section" id="sectionUniversities" style={{ padding: '60px 0', background: '#f5f7fa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <h2 className="title" style={{ fontSize: 16, color: '#666', textTransform: 'uppercase', letterSpacing: 2 }}>
            {lang === 'fr' ? 'Universités' : lang === 'ar' ? 'الجامعات' : 'Universities'}
          </h2>
          <h2 className="title" style={{ fontSize: 32, fontWeight: 700, color: '#041228', marginBottom: 40 }}>
            {lang === 'fr' ? 'Nous travaillons avec' : lang === 'ar' ? 'نتعاون مع' : 'We work with'}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 30, alignItems: 'center' }}>
            {['uni-1.png', 'uni-2.png', 'uni-3.png', 'uni-4.png', 'uni-5.png'].map((img, i) => (
              <img key={i} src={`/assets/img/${img}`} alt="University" style={{ height: 60, opacity: 0.8 }} onError={(e) => (e.currentTarget.style.display = 'none')} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" id="sectionJoinUs" style={{ padding: '80px 0', background: 'linear-gradient(135deg, #041228, #0a2540)', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px' }}>
          <h2 className="title" style={{ fontSize: 36, fontWeight: 700, marginBottom: 20 }}>
            {lang === 'fr' ? 'Quelles sont vos chances d\'admission ?' : lang === 'ar' ? 'ما هي فرصك في القبول؟' : 'What are the chances of getting an admission?'}
          </h2>
          <p style={{ fontSize: 18, opacity: 0.8, marginBottom: 30, lineHeight: 1.6 }}>
            {lang === 'fr' ? 'Avec Foorsa, votre taux d\'acceptation est de 98%. Rejoignez plus de 500 étudiants marocains en Chine.' : lang === 'ar' ? 'مع فورصة، نسبة قبولك هي 98%. انضم إلى أكثر من 500 طالب مغربي في الصين.' : 'With Foorsa, your acceptance rate is 98%. Join 500+ Moroccan students in China.'}
          </p>
          <Link to={`/${lang}/shop.html`} className="btn-apply-navbar" style={{ display: 'inline-block', padding: '16px 40px', fontSize: 18, borderRadius: 10, textDecoration: 'none' }}>
            {t('hero.cta', lang)}
          </Link>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section" id="sectionReview" style={{ padding: '60px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 30 }}>
            <span style={{ fontSize: 24, fontWeight: 700 }}>4.9</span>
            <span style={{ color: '#fbbc05', fontSize: 20 }}>★★★★★</span>
            <span style={{ color: '#666', fontSize: 14 }}>Google Reviews</span>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: '80px 0', background: '#041228', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 20 }}>
            {lang === 'fr' ? 'Prêt à Transformer Votre Avenir ?' : lang === 'ar' ? 'مستعد لتغيير مستقبلك؟' : 'Ready to Transform Your Future?'}
          </h1>
          <Link to={`/${lang}/shop.html`} style={{ display: 'inline-block', padding: '16px 40px', background: '#C9A84C', color: '#041228', borderRadius: 10, fontSize: 18, fontWeight: 600, textDecoration: 'none' }}>
            {t('hero.cta', lang)}
          </Link>
        </div>
      </section>
    </>
  )
}
