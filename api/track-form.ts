import type { VercelRequest, VercelResponse } from '@vercel/node'
import { query } from './_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const data = req.body
    const submission_id = data.submission_id || `sub_${Date.now()}`
    const ip = (req.headers['x-forwarded-for'] as string || '').split(',')[0] || ''

    await query(
      `INSERT INTO site_form_tracking (submission_id, data, ip_address, step) VALUES ($1, $2, $3, $4) ON CONFLICT (submission_id) DO UPDATE SET data = $2, ip_address = $3, step = $4, updated_at = NOW()`,
      [submission_id, JSON.stringify(data), ip, data.step || 'partial']
    )

    // If complete, also save to submissions
    if (data.step === 'complete') {
      await query(
        `INSERT INTO site_submissions (submission_id, name, email, phone, city, program_type, country_code, promo_code, status, ip_address) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT (submission_id) DO UPDATE SET name=$2, email=$3, phone=$4, city=$5, program_type=$6, country_code=$7, promo_code=$8, status=$9`,
        [submission_id, data.name, data.email, data.phone, data.city, data.program_type, data.country_code, data.promo_code, data.status || 'submitted', ip]
      )
    }

    res.json({ success: true, submission_id })
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message })
  }
}
