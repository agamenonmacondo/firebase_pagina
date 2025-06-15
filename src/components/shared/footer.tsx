import { BotIcon } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-20 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <BotIcon className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose md:text-left text-muted-foreground">
            AgenteAVA Showcase &copy; {new Date().getFullYear()}. Built with Next.js and Genkit.
          </p>
        </div>
        {/* Add social links or other footer content here if needed */}
      </div>
    </footer>
  );
}
