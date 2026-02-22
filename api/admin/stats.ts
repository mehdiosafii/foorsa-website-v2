import type { VercelRequest, VercelResponse } from '@vercel/node'
import { checkAdmin } from '../_auth'
import { query } from '../_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkAdmin(req)) return res.status(401).json({ error: 'Unauthorized' })

  try {
    const [subs, promos, activePromos, blogs] = await Promise.all([
      query('SELECT COUNT(*) FROM site_submissions'),
      query('SELECT COUNT(*) FROM site_promo_codes'),
      query('SELECT COUNT(*) FROM site_promo_codes WHERE is_active = TRUE'),
      query('SELECT COUNT(*) FROM site_blog_articles'),
    ])
    res.json({
      submissions: parseInt(subs.rows[0].count),
      promo_codes: parseInt(promos.rows[0].count),
      active_promo_codes: parseInt(activePromos.rows[0].count),
      blog_articles: parseInt(blogs.rows[0].count),
    })
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}
