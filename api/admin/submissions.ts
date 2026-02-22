import type { VercelRequest, VercelResponse } from '@vercel/node'
import { checkAdmin } from '../_auth'
import { query } from '../_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkAdmin(req)) return res.status(401).json({ error: 'Unauthorized' })

  try {
    if (req.method === 'GET') {
      const result = await query('SELECT * FROM site_submissions ORDER BY last_updated DESC')
      return res.json(result.rows)
    }

    if (req.method === 'PATCH') {
      const { submission_id, treated } = req.body
      await query('UPDATE site_submissions SET treated = $1, treated_at = CASE WHEN $1 THEN NOW() ELSE NULL END WHERE submission_id = $2', [treated, submission_id])
      return res.json({ success: true })
    }

    if (req.method === 'DELETE') {
      const { submission_id } = req.body
      await query('DELETE FROM site_submissions WHERE submission_id = $1', [submission_id])
      return res.json({ success: true })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}
