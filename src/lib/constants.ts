import type { LucideIcon } from 'lucide-react';
import { Home, Briefcase, Network, Newspaper, LogIn, UserCircle } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  authRequired?: boolean;
  hideWhenAuthed?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'AVA Assistant', href: '/', icon: Home },
  { label: 'Project', href: '/project', icon: Briefcase },
  { label: 'Architecture', href: '/architecture', icon: Network },
  { label: 'Newsletter', href: '/newsletter', icon: Newspaper, authRequired: true },
  { label: 'Login', href: '/login', icon: LogIn, hideWhenAuthed: true },
];
