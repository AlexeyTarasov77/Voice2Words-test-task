"use client"
import { Lightbulb, LightbulbOff } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ToggleThemeBtn() {
  const { setTheme, currTheme } = useTheme()
  const toggleTheme = () => {
    setTheme(prev => prev == "light" ? "dark" : "light")
  }
  return (
    currTheme == "light" ?
      <Lightbulb onClick={toggleTheme} />
      : <LightbulbOff onClick={toggleTheme} />
  )
}
