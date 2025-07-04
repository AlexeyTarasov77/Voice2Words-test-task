"use client"
import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function SidebarContainer({ children }: PropsWithChildren) {
  const [sidebarContainer, setSidebarContainer] = useState<HTMLElement | null>(null)
  useEffect(() => {
    const sidebarDiv = document.getElementById("sidebar")
    console.log("SIDEBAR DIV AFTER MOUNTING", sidebarDiv)
    setSidebarContainer(sidebarDiv)
  }, [])
  if (!sidebarContainer) return
  return createPortal(children, sidebarContainer)
}
