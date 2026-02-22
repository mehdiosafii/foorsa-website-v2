import type { VercelRequest } from '@vercel/node'

export function checkAdmin(req: VercelRequest): boolean {
  const auth = req.headers.authorization
  if (!auth) return false
  const token = auth.replace('Bearer ', '')
  // Simple token check - in production, use proper JWT
  return token === 'authenticated' || token === process.env.ADMIN_TOKEN
}

export function verifyPassword(password: string): boolean {
  return password === (process.env.ADMIN_PASSWORD || 'changeme')
}
