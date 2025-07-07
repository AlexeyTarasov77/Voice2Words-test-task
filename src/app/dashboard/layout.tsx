import { TranscriptionsSidebar } from "@/features/dashboard";
import { PropsWithChildren } from "react";
import { SidebarContainer } from "./sidebar-container";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <SidebarContainer>
        <TranscriptionsSidebar />
      </SidebarContainer>
      {children}
    </>
  )
}
