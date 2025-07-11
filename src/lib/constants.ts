import type { LucideIcon } from 'lucide-react';
import { LayoutList, Newspaper, LogIn, LayoutDashboard, Briefcase, MessageCircle } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  authRequired?: boolean;
  hideWhenAuthed?: boolean;
  isDashboard?: boolean; // Optional flag
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'AVA Assistant', href: '/chat', icon: MessageCircle },
  { label: 'Noticias', href: '/project', icon: Newspaper },
  { label: 'Arquitectura', href: '/architecture', icon: LayoutDashboard },
  { label: 'Login', href: '/login', icon: LogIn, hideWhenAuthed: true },
];
