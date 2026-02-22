import type { VercelRequest, VercelResponse } from '@vercel/node'
import { query } from '../_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const code = (req.body?.code || '').toUpperCase()
    const result = await query(
      `SELECT * FROM site_promo_codes WHERE code = $1 AND is_active = TRUE AND (valid_from IS NULL OR valid_from <= NOW()) AND (valid_until IS NULL OR valid_until >= NOW()) AND (max_uses IS NULL OR current_uses < max_uses)`,
      [code]
    )
    if (result.rows.length > 0) {
      const p = result.rows[0]
      return res.json({ valid: true, discount_type: p.discount_type, discount_value: parseFloat(p.discount_value), min_purchase: parseFloat(p.min_purchase) })
    }
    res.json({ valid: false, error: 'Invalid or expired promo code' })
  } catch (e: any) {
    res.status(500).json({ valid: false, error: e.message })
  }
}
