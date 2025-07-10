import type { LucideIcon } from 'lucide-react';
import { Home, LayoutList, Newspaper, LogIn, LayoutDashboard } from 'lucide-react'; // Removed Briefcase

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  authRequired?: boolean;
  hideWhenAuthed?: boolean;
  isDashboard?: boolean; // Optional flag
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, authRequired: true, isDashboard: true },
  { label: 'Home', href: '/', icon: Home },
  { label: 'AVA Assistant', href: '/chat', icon: Home },
  { label: 'AVA News', href: '/project', icon: LayoutList },
  { label: 'Newsletter', href: '/newsletter', icon: Newspaper, authRequired: true },
  { label: 'Login', href: '/login', icon: LogIn, hideWhenAuthed: true },
];

    