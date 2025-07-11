
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { GlobalChatWidget } from '@/components/shared/global-chat-widget'; // Added import

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <GlobalChatWidget /> {/* Added GlobalChatWidget */}
    </div>
  );
}
