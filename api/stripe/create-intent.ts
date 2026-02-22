import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-12-18.acacia' as any })

const PROGRAM_PRICES: Record<string, number> = {
  language_bachelor: 27900,
  master_phd: 34900,
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { name, email, phone, program_type, country_code } = req.body
    if (!name || !email || !phone) return res.status(400).json({ error: 'Name, email, and phone required' })
    if (!PROGRAM_PRICES[program_type]) return res.status(400).json({ error: 'Invalid program type' })

    const amount = req.body.amount || PROGRAM_PRICES[program_type]

    const intent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { name, email, phone, program_type, country_code: country_code || '' },
    })

    res.json({ clientSecret: intent.client_secret })
  } catch (e: any) {
    res.status(400).json({ error: 'Payment processing error' })
  }
}
