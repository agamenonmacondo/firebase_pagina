import type { LucideIcon } from 'lucide-react';
import { Home, LayoutList, Newspaper, LogIn, LayoutDashboard, Briefcase } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  authRequired?: boolean;
  hideWhenAuthed?: boolean;
  isDashboard?: boolean; // Optional flag
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'AVA Assistant', href: '/', icon: Home },
  { label: 'AVA News', href: '/project', icon: LayoutList },
  { label: 'Login', href: '/login', icon: LogIn, hideWhenAuthed: true },
];
