import type { VercelRequest, VercelResponse } from '@vercel/node'
import { verifyPassword } from '../_auth'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { password } = req.body || {}
  if (verifyPassword(password)) {
    return res.json({ success: true, token: 'authenticated' })
  }
  return res.status(401).json({ error: 'Invalid password' })
}
