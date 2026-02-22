export type Lang = 'en' | 'fr' | 'ar'
export const SUPPORTED_LANGS: Lang[] = ['en', 'fr', 'ar']
export const DEFAULT_LANG: Lang = 'en'
const STORAGE_KEY = 'foorsa_preferred_lang'

export function getSavedLang(): Lang {
  const saved = localStorage.getItem(STORAGE_KEY) as Lang | null
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved
  const browser = navigator.language
  if (browser.startsWith('ar')) return 'ar'
  if (browser.startsWith('fr')) return 'fr'
  return DEFAULT_LANG
}

export function saveLang(lang: Lang) {
  localStorage.setItem(STORAGE_KEY, lang)
}

export const FLAG_MAP: Record<Lang, string> = {
  en: 'https://flagcdn.com/w40/gb.png',
  fr: 'https://flagcdn.com/w40/fr.png',
  ar: 'https://flagcdn.com/w40/ma.png',
}

// Translation dictionary - key translations used across the site
const translations: Record<string, Record<Lang, string>> = {
  'nav.about': { en: 'About Us', fr: 'À propos', ar: 'من نحن' },
  'nav.mission': { en: 'Mission & Values', fr: 'Mission & Valeurs', ar: 'المهمة والقيم' },
  'nav.engagement': { en: 'Engagement', fr: 'Engagement', ar: 'الالتزام' },
  'nav.recruitment': { en: 'Recruitment', fr: 'Recrutement', ar: 'التوظيف' },
  'nav.partner': { en: 'Partner With Us', fr: 'Partenariat', ar: 'شراكة' },
  'nav.contact': { en: 'Contact us', fr: 'Contactez-nous', ar: 'اتصل بنا' },
  'nav.majors': { en: 'Majors', fr: 'Filières', ar: 'التخصصات' },
  'nav.scholarship': { en: 'Scholarship', fr: 'Bourse', ar: 'المنحة' },
  'nav.fees': { en: 'Fees & Financing', fr: 'Frais & Financement', ar: 'الرسوم والتمويل' },
  'nav.steps': { en: 'Step by step', fr: 'Étape par étape', ar: 'خطوة بخطوة' },
  'nav.documents': { en: 'Documents', fr: 'Documents', ar: 'الوثائق' },
  'nav.faq': { en: 'FAQ', fr: 'FAQ', ar: 'الأسئلة الشائعة' },
  'nav.blog': { en: 'Blog', fr: 'Blog', ar: 'المدونة' },
  'nav.apply': { en: 'APPLY', fr: 'POSTULER', ar: 'سجل الآن' },
  'nav.home': { en: 'Home', fr: 'Accueil', ar: 'الرئيسية' },
  'nav.quiz': { en: 'Quiz', fr: 'Quiz', ar: 'اختبار' },
  
  'hero.title': { en: 'Study in China', fr: 'Étudiez en Chine', ar: 'ادرس في الصين' },
  'hero.subtitle': { en: 'Your Journey Starts Here', fr: 'Votre Parcours Commence Ici', ar: 'رحلتك تبدأ هنا' },
  'hero.cta': { en: 'Start Your Application', fr: 'Commencez Votre Candidature', ar: 'ابدأ طلبك' },
  
  'form.fullname': { en: 'Full Name', fr: 'Nom complet', ar: 'الاسم الكامل' },
  'form.email': { en: 'Email', fr: 'Email', ar: 'البريد الإلكتروني' },
  'form.phone': { en: 'Phone', fr: 'Téléphone', ar: 'الهاتف' },
  'form.city': { en: 'City', fr: 'Ville', ar: 'المدينة' },
  'form.program': { en: 'Program', fr: 'Programme', ar: 'البرنامج' },
  'form.language_bachelor': { en: 'Language + Bachelor', fr: 'Langue + Licence', ar: 'لغة + إجازة' },
  'form.master_phd': { en: 'Master / PhD', fr: 'Master / Doctorat', ar: 'ماستر / دكتوراه' },
  'form.promo': { en: 'Promo Code', fr: 'Code promo', ar: 'رمز الخصم' },
  'form.apply_btn': { en: 'Apply & Pay', fr: 'Postuler & Payer', ar: 'سجل وادفع' },
  'form.submit': { en: 'Submit Application', fr: 'Soumettre la candidature', ar: 'إرسال الطلب' },

  'footer.rights': { en: '© 2026 Foorsa. All rights reserved.', fr: '© 2026 Foorsa. Tous droits réservés.', ar: '© 2026 فورصة. جميع الحقوق محفوظة.' },
}

export function t(key: string, lang: Lang): string {
  return translations[key]?.[lang] || translations[key]?.en || key
}
