// src/components/layout/AppShell.tsx
"use client";

import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { SidebarNav } from "./SidebarNav";
import { UserNav } from "./UserNav";
import { GraduationCap, Settings } from "lucide-react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="p-4 border-b">
          <Link href="/" className="flex items-center gap-2" aria-label="LearnAssist AI Home">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-headline font-semibold text-foreground">LearnAssist AI</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-2 border-t">
          <Link href="/settings" legacyBehavior passHref>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:h-16 sm:px-6">
          <SidebarTrigger className="md:hidden" /> {/* Mobile trigger */}
          <div className="flex-1">
            {/* Future: Breadcrumbs or dynamic page title */}
          </div>
          <UserNav />
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
