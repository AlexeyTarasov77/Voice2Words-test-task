"use client"
import { createContext, PropsWithChildren, use, useEffect, useState } from "react";

type ThemeName = "dark" | "light"

interface IThemeCtx {
  currTheme: ThemeName;
  toggleTheme: () => void
}

const ThemeCtx = createContext<IThemeCtx | null>(null)

export const useTheme = () => {
  const ctx = use(ThemeCtx)
  if (!ctx) throw new Error("Theme context not provided")
  return ctx
}

export function ThemeProvider({ children, defaultTheme }: PropsWithChildren & { defaultTheme?: ThemeName }) {
  const [currTheme, setTheme] = useState<ThemeName>(defaultTheme || "dark")
  const lcKey = process.env.NEXT_PUBLIC_THEME_KEY!
  useEffect(() => {
    const savedTheme = localStorage.getItem(lcKey)
    savedTheme && setTheme(savedTheme as ThemeName)
  }, [])
  useEffect(() => {
    localStorage.setItem(lcKey, currTheme)
    currTheme == "dark" ? document.body.classList.add("dark") : document.body.classList.remove("dark")
  }, [currTheme])
  const toggleTheme = () => setTheme(prev => prev == "light" ? "dark" : "light")
  return (
    <ThemeCtx.Provider value={{ currTheme, toggleTheme }}>
      {children}
    </ThemeCtx.Provider>
  )
}
