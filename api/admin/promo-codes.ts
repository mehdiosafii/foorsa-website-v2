import type { VercelRequest, VercelResponse } from '@vercel/node'
import { checkAdmin } from '../_auth'
import { query } from '../_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkAdmin(req)) return res.status(401).json({ error: 'Unauthorized' })

  try {
    if (req.method === 'GET') {
      const result = await query('SELECT * FROM site_promo_codes ORDER BY created_at DESC')
      return res.json(result.rows)
    }

    if (req.method === 'POST') {
      const { code, discount_type, discount_value, min_purchase, max_uses, valid_from, valid_until, is_active, description } = req.body
      const result = await query(
        `INSERT INTO site_promo_codes (code, discount_type, discount_value, min_purchase, max_uses, valid_from, valid_until, is_active, description) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
        [code.toUpperCase(), discount_type, discount_value, min_purchase || 0, max_uses, valid_from, valid_until, is_active ?? true, description || '']
      )
      return res.status(201).json(result.rows[0])
    }

    if (req.method === 'PUT') {
      const { id, code, discount_type, discount_value, min_purchase, max_uses, valid_from, valid_until, is_active, description } = req.body
      const codeId = id || req.query.id
      const result = await query(
        `UPDATE site_promo_codes SET code=$1, discount_type=$2, discount_value=$3, min_purchase=$4, max_uses=$5, valid_from=$6, valid_until=$7, is_active=$8, description=$9 WHERE id=$10 RETURNING *`,
        [code.toUpperCase(), discount_type, discount_value, min_purchase || 0, max_uses, valid_from, valid_until, is_active ?? true, description || '', codeId]
      )
      return res.json(result.rows[0])
    }

    if (req.method === 'DELETE') {
      const id = req.query.id || req.body?.id
      await query('DELETE FROM site_promo_codes WHERE id = $1', [id])
      return res.json({ success: true })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (e: any) {
    if (e.code === '23505') return res.status(400).json({ error: 'Promo code already exists' })
    res.status(500).json({ error: e.message })
  }
}
