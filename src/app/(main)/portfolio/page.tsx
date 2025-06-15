
import { PageContainer } from "@/components/shared/page-container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Youtube, Rocket, Eye } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailHint: string;
  videoUrl?: string; // Optional: for a direct link to YouTube
  projectUrl?: string; // Optional: for a link to a live demo or more info
  category: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Desarrollo de AgenteAVA: Chat Inteligente",
    description: "Un recorrido completo por la creación de la interfaz de chat de AgenteAVA, desde el diseño inicial hasta la integración de la lógica de conversación simulada y la gestión de estado.",
    thumbnailUrl: "https://placehold.co/600x400.png?text=Chat+Interface+Development",
    thumbnailHint: "chat interface development",
    videoUrl: "#", // Placeholder link
    category: "Desarrollo Web",
  },
  {
    id: "2",
    title: "Integración de IA para Newsletters",
    description: "Cómo AgenteAVA utiliza Firebase Genkit para potenciar sus herramientas de newsletter, incluyendo generación de contenido, análisis de relevancia y determinación de tono y estructura.",
    thumbnailUrl: "https://placehold.co/600x400.png?text=AI+Newsletter+Tools",
    thumbnailHint: "AI newsletter tools",
    videoUrl: "#",
    category: "Inteligencia Artificial",
  },
  {
    id: "3",
    title: "Diseño de Experiencia de Usuario (UX) para AgenteAVA",
    description: "Exploración del proceso de diseño UX/UI detrás de AgenteAVA, enfocándose en la usabilidad, accesibilidad y una estética moderna y profesional para todas las interacciones.",
    thumbnailUrl: "https://placehold.co/600x400.png?text=UX+UI+Design+Process",
    thumbnailHint: "UX UI design",
    category: "Diseño UX/UI",
  },
];

export default function PortfolioPage() {
  return (
    <PageContainer className="py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 animate-slide-in-up">Portafolio de AgenteAVA</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-up [animation-delay:0.1s]">
          Explora los proyectos clave y las capacidades desarrolladas para AgenteAVA.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockProjects.map((project, index) => (
          <Card 
            key={project.id} 
            className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col animate-slide-in-up"
            style={{animationDelay: `${0.2 + index * 0.1}s`}}
          >
            <CardHeader>
              <div className="relative aspect-video mb-4">
                <Image
                  src={project.thumbnailUrl}
                  alt={project.title}
                  data-ai-hint={project.thumbnailHint}
                  fill
                  className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardTitle className="font-headline text-xl line-clamp-2">{project.title}</CardTitle>
              <CardDescription className="text-xs text-muted-foreground pt-1">{project.category}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-4">{project.description}</p>
            </CardContent>
            <CardFooter className="mt-auto">
              {project.videoUrl && (
                <Button asChild variant="outline" className="w-full">
                  <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Youtube className="mr-2 h-5 w-5" />
                    Ver Video
                  </a>
                </Button>
              )}
              {/* You can add another button for projectUrl if needed */}
              {/* {project.projectUrl && (
                <Button asChild className="w-full mt-2">
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                    <Eye className="mr-2 h-5 w-5" />
                    Ver Proyecto
                  </a>
                </Button>
              )} */}
            </CardFooter>
          </Card>
        ))}
      </div>
       <section className="mt-16 text-center animate-slide-in-up" style={{animationDelay: `${0.2 + mockProjects.length * 0.1 + 0.2}s`}}>
        <Rocket className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="font-headline text-3xl font-bold mb-3">Próximos Proyectos</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          AgenteAVA continúa evolucionando. ¡Mantente atento a nuevas demostraciones y funcionalidades emocionantes!
        </p>
      </section>
    </PageContainer>
  );
}
