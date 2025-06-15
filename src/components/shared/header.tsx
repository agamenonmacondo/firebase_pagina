
"use client";

import Link from 'next/link';
import { AvaLogoIcon } from '@/components/AvaLogoIcon';
import { LogOut } from 'lucide-react';
import { NAV_ITEMS, type NavItem } from '@/lib/constants';
import { useAuthStore } from '@/hooks/use-auth-store';
import { ThemeToggle } from './theme-toggle';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    // Optionally redirect to home or login page
    // router.push('/'); 
  };

  const activeUserNavItems = NAV_ITEMS.filter(item => {
    if (item.authRequired && !isAuthenticated) return false;
    if (item.hideWhenAuthed && isAuthenticated) return false;
    return true;
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/portfolio" className="mr-6 flex items-center space-x-2"> {/* Updated href here */}
          <AvaLogoIcon className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block text-lg">
            AgenteAVA
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4 lg:space-x-6">
          {activeUserNavItems.map((item: NavItem) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="mr-1 inline-block h-4 w-4 sm:hidden" />
              <span className="hidden sm:inline-block">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          {isAuthenticated && user && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground hidden md:inline">Hi, {user.name}</span>
              <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
