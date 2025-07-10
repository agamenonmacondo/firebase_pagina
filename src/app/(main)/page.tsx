import { PageContainer } from "@/components/shared/page-container";
import { Button } from "@/components/ui/button";
import { ArrowRight, BotMessageSquare, CheckCircle, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AvaLogoIcon } from "@/components/AvaLogoIcon";

const features = [
    {
        icon: <BotMessageSquare className="h-8 w-8 mb-4 text-primary" />,
        title: "Asistente de Chat Inteligente",
        description: "Interactúa con una IA conversacional diseñada para entender y ayudarte con tus tareas de marketing.",
        link: "/chat"
    },
    {
        icon: <Newspaper className="h-8 w-8 mb-4 text-primary" />,
        title: "Herramientas para Newsletter",
        description: "Genera contenido, analiza relevancia y define el tono perfecto para tus campañas de email.",
        link: "/newsletter"
    },
    {
        icon: <CheckCircle className="h-8 w-8 mb-4 text-primary" />,
        title: "Análisis y Reportes",
        description: "Obtén insights sobre el rendimiento de tu agente y el impacto de tus contenidos.",
        link: "/dashboard"
    }
];

export default function HomePage() {
  return (
    <PageContainer className="py-8 md:py-12">
      {/* Hero Section */}
      <section className="text-center">
        <div className="flex flex-col items-center">
            <AvaLogoIcon className="h-16 w-auto mb-4" />
            <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 animate-slide-in-up">
                Potencia tu Marketing con AgenteAVA
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-slide-in-up [animation-delay:0.1s]">
                Tu asistente de IA personal para crear, gestionar y optimizar campañas de newsletter de manera inteligente y eficiente.
            </p>
            <div className="animate-slide-in-up [animation-delay:0.2s]">
                <Button asChild size="lg" className="text-lg py-7 px-8">
                    <Link href="/chat">
                        Comienza a Chatear con AVA <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="mt-12 animate-slide-in-up [animation-delay:0.3s]">
        <div className="relative aspect-[16/9] md:aspect-[21/9] max-w-5xl mx-auto">
             <Image
                src="https://placehold.co/1200x600.png"
                alt="AgenteAVA Dashboard Showcase"
                data-ai-hint="dashboard UI screenshot"
                fill
                className="object-cover rounded-xl shadow-2xl border"
            />
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 md:mt-24">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Capacidades Principales</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
                Descubre cómo AgenteAVA puede transformar tu flujo de trabajo.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <Card 
                    key={index}
                    className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-up"
                    style={{animationDelay: `${0.4 + index * 0.1}s`}}
                >
                    <CardHeader>
                        {feature.icon}
                        <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>
    </PageContainer>
  );
}

    