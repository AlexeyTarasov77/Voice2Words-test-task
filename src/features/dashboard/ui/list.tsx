"use client"
import useSWR from 'swr'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail,
} from "@/shared/ui/sidebar"
import { Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { fetcher } from '@/shared/lib/api'
import { TranscriptionEntity } from '@/entities/transcription/domain'
import { useState } from 'react'
import { useFilteredData } from '@/shared/lib/react/search'
import { Button } from '@/shared/ui/button'
import { Dialog, DialogTrigger } from '@/shared/ui/dialog'
import { NewRecordModal } from './new-record-modal'

export function TranscriptionsSidebar() {
  const { data: transcriptions, error, isLoading } = useSWR<TranscriptionEntity[]>(`/api/transcriptions`, fetcher)
  const [searchQuery, setSearchQuery] = useState("")
  const filteredTranscriptions = useFilteredData(searchQuery, (t) => t.filename, transcriptions || [])
  const currentPath = usePathname()
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <h1 className="font-bold text-xl">Your transcriptions</h1>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="py-0">
          <SidebarGroupContent className="relative">
            <SidebarInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transcriptions..."
              className="pl-8"
            />
            <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {(isLoading ? Array(10) : filteredTranscriptions).map(t => (
            t ?
              <SidebarMenuItem key={t.id}>
                <SidebarMenuButton asChild isActive={currentPath == `/dashboard/${t.id}`}>
                  <Link href={`/dashboard/${t.id}`}>{t.filename}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem> :
              <SidebarMenuSkeleton />
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button>New Record</Button>
          </DialogTrigger>
          <NewRecordModal />
        </Dialog>
      </SidebarFooter>
    </Sidebar>
  )
}
