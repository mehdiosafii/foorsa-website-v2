import type { VercelRequest, VercelResponse } from '@vercel/node'
import { query } from '../../_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { slug } = req.query
    const result = await query('SELECT * FROM site_blog_articles WHERE slug = $1', [slug])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Article not found' })
    
    const article = result.rows[0]
    await query('UPDATE site_blog_articles SET views = views + 1 WHERE id = $1', [article.id])
    article.views = (article.views || 0) + 1
    
    res.json(article)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}
