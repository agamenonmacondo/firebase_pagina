
import { PageContainer } from "@/components/shared/page-container";
import { Button } from "@/components/ui/button";
import { ArrowRight, BotMessageSquare, CheckCircle, Newspaper } from "lucide-react";
import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AvaLogoIcon } from "@/components/AvaLogoIcon";

const Overlay = ({ children }: { children: React.ReactNode }) => (
    <div className="relative z-10 bg-black bg-opacity-50 h-full">
        {children}
    </div>
);

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
            autoPlay
            loop
            muted
            playsInline // Important for mobile browsers
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
            <source src="/video/video_ava.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        {/* Content with Overlay */}
        <Overlay>
          <PageContainer className="py-8 md:py-12 relative z-10 text-white flex flex-col justify-center min-h-screen">
            {/* Hero Section */}
            <section className="text-center">
              <div className="flex flex-col items-center">
                  <AvaLogoIcon className="h-16 w-auto mb-4" />
                  <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 animate-slide-in-up">
                      Potencia tu Marketing con AgenteAVA
                  </h1>
                  <p className="text-xl max-w-3xl mx-auto mb-8 animate-slide-in-up [animation-delay:0.1s]">
                      Tu asistente de IA personal para crear, gestionar y optimizar campañas de newsletter de manera inteligente y eficiente.
                  </p>
                  <div className="animate-slide-in-up [animation-delay:0.2s]">
                      <Button asChild size="lg" className="text-lg py-7 px-8 bg-white text-black hover:bg-white/90">
                          <Link href="/">
                              Comienza a Chatear con AVA <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                      </Button>
                  </div>
              </div>
            </section>
          </PageContainer>
        </Overlay>
    </div>
  );
}
