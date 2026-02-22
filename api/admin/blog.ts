import type { VercelRequest, VercelResponse } from '@vercel/node'
import { checkAdmin } from '../_auth'
import { query } from '../_db'

function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkAdmin(req)) return res.status(401).json({ error: 'Unauthorized' })

  try {
    if (req.method === 'GET') {
      const status = req.query.status as string || 'all'
      let sql = 'SELECT * FROM site_blog_articles'
      const params: any[] = []
      if (status !== 'all') { sql += ' WHERE status = $1'; params.push(status) }
      sql += ' ORDER BY created_at DESC'
      const result = await query(sql, params)
      return res.json(result.rows)
    }

    if (req.method === 'POST') {
      const { title, excerpt, content, featured_image, category, status, language, author, auto_translate } = req.body
      const slug = slugify(title || 'untitled')
      const result = await query(
        `INSERT INTO site_blog_articles (title, slug, excerpt, content, featured_image, category, status, language, author, published_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
        [title, slug, excerpt || '', content || '', featured_image || '', category || 'general', status || 'draft', language || 'en', author || 'Foorsa Team', status === 'published' ? new Date().toISOString() : null]
      )
      return res.status(201).json({ success: true, article: result.rows[0] })
    }

    if (req.method === 'PUT') {
      const id = req.query.id
      const { title, excerpt, content, featured_image, category, status, language, author } = req.body
      const result = await query(
        `UPDATE site_blog_articles SET title=$1, excerpt=$2, content=$3, featured_image=$4, category=$5, status=$6, language=$7, author=$8, updated_at=NOW(), published_at=CASE WHEN $6='published' AND published_at IS NULL THEN NOW() ELSE published_at END WHERE id=$9 RETURNING *`,
        [title, excerpt, content, featured_image, category, status, language, author, id]
      )
      return res.json({ success: true, article: result.rows[0] })
    }

    if (req.method === 'DELETE') {
      const id = req.query.id
      await query('DELETE FROM site_blog_articles WHERE id = $1', [id])
      return res.json({ success: true })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}
