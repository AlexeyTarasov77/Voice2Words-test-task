"use client"
import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function SidebarContainer({ children }: PropsWithChildren) {
  const [sidebarContainer, setSidebarContainer] = useState<HTMLElement | null>(null)
  useEffect(() => {
    const sidebarDiv = document.getElementById("sidebar")
    setSidebarContainer(sidebarDiv)
  }, [])
  if (!sidebarContainer) return
  return createPortal(children, sidebarContainer)
}
