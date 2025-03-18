'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { cn } from '@/lib/utils';
import { Calendar, Home, Inbox } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../globals/logo';
import { ModeToggle } from '../globals/ThemeSwitcher';
import { UserButton } from '../globals/UserButton';

const items = [
  {
    title: 'home',
    url: '/',
    icon: Home,
  },
  {
    title: 'settings',
    url: '/settings',
    icon: Inbox,
  },
  {
    title: 'feedback',
    url: '/feedback',
    icon: Calendar,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const path = pathname.split('/');

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between px-2 py-4">
        <Link href="/dashboard" className="inline-flex items-center">
          <Logo size={32} />
          <h1 className="font-bold">DevPlot</h1>
        </Link>
        <ModeToggle />
      </SidebarHeader>
      <SidebarContent className="p-6 pt-0">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title} className="-mx-6">
                  <SidebarMenuButton asChild className={cn('flex h-10 items-center gap-2 rounded-lg !px-3', (item.title === path[path.length - 1] || (item.title === 'home' && path[path.length - 1] === 'dashboard')) && 'bg-muted !text-foreground [&>svg]:text-primary')}>
                    <Link href={`/dashboard${item.url}`} className="capitalize text-muted-foreground">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
