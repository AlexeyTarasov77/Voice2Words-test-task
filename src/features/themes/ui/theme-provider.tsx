"use client"
import { createContext, PropsWithChildren, use, useState } from "react";

type ThemeName = "dark" | "light"

interface IThemeCtx {
  currTheme: ThemeName;
  setTheme: React.Dispatch<React.SetStateAction<ThemeName>>
}

const ThemeCtx = createContext<IThemeCtx | null>(null)

export const useTheme = () => {
  const ctx = use(ThemeCtx)
  if (!ctx) throw new Error("Theme context not provided")
  return ctx
}

export function ThemeProvider({ children, defaultTheme }: PropsWithChildren & { defaultTheme?: ThemeName }) {
  const [currTheme, setTheme] = useState<ThemeName>(defaultTheme || "dark")
  return (
    <ThemeCtx.Provider value={{ currTheme, setTheme }}>
      <div className={currTheme == "dark" ? "dark" : ""}>
        {children}
      </div>
    </ThemeCtx.Provider>
  )
}
