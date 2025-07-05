"use client"
import { Lightbulb, LightbulbOff } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ToggleThemeBtn() {
  const { toggleTheme, currTheme } = useTheme()
  return (
    currTheme == "light" ?
      <Lightbulb onClick={toggleTheme} />
      : <LightbulbOff onClick={toggleTheme} />
  )
}
