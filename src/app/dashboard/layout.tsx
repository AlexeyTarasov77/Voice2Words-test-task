import { TranscriptionsSidebar } from "@/features/dashboard/ui/list";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
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
