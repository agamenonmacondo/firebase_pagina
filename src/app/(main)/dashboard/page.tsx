
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/use-auth-store";
import { PageContainer } from "@/components/shared/page-container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BarChart3,
  FileText,
  Users,
  AlertTriangle,
  PieChart,
  Activity,
} from "lucide-react";

export default function DashboardPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    // if (!isAuthenticated) {
    //   router.push("/login");
    // }
  }, [isAuthenticated, router]);

  // if (!isAuthenticated) {
  //   return (
  //     <PageContainer className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
  //       <Card className="text-center p-8">
  //         <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
  //         <h1 className="text-2xl font-bold">Acceso Denegado</h1>
  //         <p className="text-muted-foreground">Por favor, inicia sesión para acceder al dashboard.</p>
  //       </Card>
  //     </PageContainer>
  //   );
  // }

  const dashboardCards = [
    {
      title: "Estadísticas del Agente",
      description: "Un resumen del rendimiento de tu AgenteAVA.",
      icon: PieChart,
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-700 dark:text-blue-400",
      content: (
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Conversaciones Totales</p>
            <p className="font-bold text-lg">152</p>
          </div>
          <div>
            <p className="text-muted-foreground">Usuarios Atendidos</p>
            <p className="font-bold text-lg">89</p>
          </div>
          <div>
            <p className="text-muted-foreground">Tasa de Resolución (Prom.)</p>
            <p className="font-bold text-lg">92%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Satisfacción Cliente (Prom.)</p>
            <p className="font-bold text-lg">4.5/5</p>
          </div>
        </div>
      ),
      action: <Button variant="outline" size="sm" asChild><Link href="#">Ver Detalles</Link></Button>
    },
    {
      title: "Actividad Reciente del Agente",
      description: "Las últimas interacciones y eventos importantes.",
      icon: Activity,
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      textColor: "text-green-700 dark:text-green-400",
      content: (
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <FileText className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
            <span>Conversación con 'cliente_xyz' finalizada con éxito.</span>
          </li>
          <li className="flex items-start">
            <Users className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
            <span>Nuevo usuario 'contacto@empresa.com' interactuó con el agente.</span>
          </li>
          <li className="flex items-start">
            <FileText className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
            <span>Alerta: Agente no pudo resolver consulta sobre 'tema_especifico'.</span>
          </li>
        </ul>
      ),
       action: <Button variant="outline" size="sm" asChild><Link href="#">Ver Log Completo</Link></Button>
    },
    {
      title: "Analíticas Detalladas",
      description: "Explora en profundidad el rendimiento y las interacciones de tu agente.",
      icon: BarChart3,
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-700 dark:text-purple-400",
      content: (
        <div className="flex justify-center py-4">
          <Button asChild className="w-full max-w-md" size="lg">
            <Link href="#"> {/* This link would go to a dedicated analytics page */}
              <BarChart3 className="mr-3 h-6 w-6" />
              Acceder a Analíticas Avanzadas
            </Link>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PageContainer className="py-8">
      <header className="mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2 animate-slide-in-up">
          Dashboard del Agente: {user?.name || "Cliente"}
        </h1>
        <p className="text-xl text-muted-foreground animate-slide-in-up [animation-delay:0.1s]">
          Aquí puedes monitorear el desempeño y la actividad de tu AgenteAVA.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 animate-slide-in-up [animation-delay:0.2s]">
        {dashboardCards.slice(0,1).map((card) => ( 
            <Card key={card.title} className={`shadow-lg hover:shadow-xl transition-shadow duration-300 lg:col-span-1 ${card.bgColor} border ${card.borderColor}`}>
                 <CardHeader>
                    <div className="flex items-center mb-1">
                        <card.icon className={`h-7 w-7 mr-3 ${card.textColor}`} />
                        <CardTitle className={`font-headline text-2xl ${card.textColor}`}>{card.title}</CardTitle>
                    </div>
                    <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    {card.content}
                    {card.action && <div className="mt-4">{card.action}</div>}
                </CardContent>
            </Card>
        ))}
         {dashboardCards.slice(1,2).map((card) => ( 
            <Card key={card.title} className={`shadow-lg hover:shadow-xl transition-shadow duration-300 lg:col-span-2 ${card.bgColor} border ${card.borderColor}`}>
                 <CardHeader>
                    <div className="flex items-center mb-1">
                        <card.icon className={`h-7 w-7 mr-3 ${card.textColor}`} />
                        <CardTitle className={`font-headline text-2xl ${card.textColor}`}>{card.title}</CardTitle>
                    </div>
                    <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    {card.content}
                    {card.action && <div className="mt-4">{card.action}</div>}
                </CardContent>
            </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 animate-slide-in-up [animation-delay:0.3s]">
         {dashboardCards.slice(2).map((card) => ( 
            <Card key={card.title} className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${card.bgColor} border ${card.borderColor}`}>
                 <CardHeader>
                    <div className="flex items-center mb-1">
                        <card.icon className={`h-7 w-7 mr-3 ${card.textColor}`} />
                        <CardTitle className={`font-headline text-2xl ${card.textColor}`}>{card.title}</CardTitle>
                    </div>
                    <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    {card.content}
                </CardContent>
            </Card>
        ))}
      </div>
    </PageContainer>
  );
}
