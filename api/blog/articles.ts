import type { VercelRequest, VercelResponse } from '@vercel/node'
import { query } from '../_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const status = req.query.status as string || 'published'
    const lang = req.query.lang as string || 'en'
    const category = req.query.category as string || null

    let sql = 'SELECT * FROM site_blog_articles WHERE status = $1 AND language = $2'
    const params: any[] = [status, lang]
    
    if (category) { sql += ' AND category = $3'; params.push(category) }
    sql += ' ORDER BY published_at DESC NULLS LAST'

    const result = await query(sql, params)
    res.json(result.rows)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}
