// src/components/layout/SidebarNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpenText,
  BrainCircuit,
  ScrollText,
  TrendingUp,
  Settings,
  type LucideIcon,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  tooltip?: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, tooltip: "Dashboard" },
  { href: "/modules", label: "Modules", icon: BookOpenText, tooltip: "Content Authoring" },
  { href: "/quiz-generator", label: "Quiz Generator", icon: BrainCircuit, tooltip: "AI Quizzes" },
  { href: "/topic-summarizer", label: "Topic Summarizer", icon: ScrollText, tooltip: "AI Summaries" },
  { href: "/adaptive-learning", label: "Adaptive Paths", icon: TrendingUp, tooltip: "Adaptive Learning Demo" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
              tooltip={{ children: item.tooltip || item.label, side: "right" }}
              className={cn(
                "justify-start",
                (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)))
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <>
                <item.icon className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
              </>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
