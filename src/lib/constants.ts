import type { LucideIcon } from 'lucide-react';
import { Home, LayoutList, Newspaper, LogIn } from 'lucide-react'; // Removed Network icon

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  authRequired?: boolean;
  hideWhenAuthed?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'AVA Assistant', href: '/', icon: Home },
  { label: 'AVA News', href: '/project', icon: LayoutList },
  { label: 'Newsletter', href: '/newsletter', icon: Newspaper, authRequired: true },
  { label: 'Login', href: '/login', icon: LogIn, hideWhenAuthed: true },
];
