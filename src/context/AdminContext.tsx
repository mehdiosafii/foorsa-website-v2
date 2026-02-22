import { createContext, useContext, useState, type ReactNode } from 'react'

interface AdminCtx { 
  isAuth: boolean
  login: (pw: string) => Promise<boolean>
  logout: () => void 
  token: string
}

const Ctx = createContext<AdminCtx>({ isAuth: false, login: async () => false, logout: () => {}, token: '' })

export function AdminProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => sessionStorage.getItem('admin_token') || '')
  const isAuth = !!token

  const login = async (password: string) => {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      const data = await res.json()
      const t = data.token || 'authenticated'
      setToken(t)
      sessionStorage.setItem('admin_token', t)
      return true
    }
    return false
  }

  const logout = () => {
    setToken('')
    sessionStorage.removeItem('admin_token')
  }

  return <Ctx.Provider value={{ isAuth, login, logout, token }}>{children}</Ctx.Provider>
}

export const useAdmin = () => useContext(Ctx)
