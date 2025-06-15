import { PageContainer } from "@/components/shared/page-container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Network, Database, Cpu, MessageSquareCode, Users } from "lucide-react";

export default function ArchitecturePage() {
  const architecturePoints = [
    {
      title: "Frontend Framework",
      icon: Cpu,
      description: "The user interface is built with Next.js, a powerful React framework. This allows for server-side rendering (SSR) and static site generation (SSG), ensuring fast load times and SEO-friendliness. TypeScript is used for type safety and improved developer experience.",
      image: { src: "https://placehold.co/600x400.png", hint: "NextJS React" },
    },
    {
      title: "Styling and UI Components",
      icon: Layers,
      description: "Styling is handled by Tailwind CSS, a utility-first CSS framework that enables rapid UI development. Shadcn/UI provides a set of beautifully designed and accessible components, built on Radix UI and Tailwind CSS, ensuring a consistent and modern look and feel.",
      image: { src: "https://placehold.co/600x400.png", hint: "Tailwind CSS components" },
    },
    {
      title: "AI Integration with Genkit",
      icon: MessageSquareCode,
      description: "Firebase Genkit is employed to integrate with large language models (LLMs). Genkit flows are defined for specific AI tasks like content generation, relevance analysis, and tone determination. These flows are callable via Next.js Server Actions, keeping AI logic on the server-side for security and scalability.",
      image: { src: "https://placehold.co/600x400.png", hint: "AI model diagram" },
    },
    {
      title: "Server Actions for Data Mutation",
      icon: Database,
      description: "Next.js Server Actions are used for handling form submissions and interactions with the AI backend. This approach simplifies data mutations by allowing server-side code to be called directly from client components without needing to create separate API endpoints.",
      image: { src: "https://placehold.co/600x400.png", hint: "data flow diagram" },
    },
     {
      title: "User Authentication (Mock)",
      icon: Users,
      description: "For this showcase, user authentication is mocked using a client-side Zustand store. In a production environment, this would be replaced with a robust solution like Firebase Authentication or NextAuth.js to manage user sessions and protect routes.",
      image: { src: "https://placehold.co/600x400.png", hint: "user authentication flow" },
    },
  ];

  return (
    <PageContainer>
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 animate-slide-in-up">AgenteAVA Architecture</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-up [animation-delay:0.1s]">
          A technical deep dive into the components and systems that make AgenteAVA work.
        </p>
      </header>

      <div className="grid md:grid-cols-1 gap-10">
         <Card className="mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-up [animation-delay:0.2s]">
          <CardHeader className="text-center">
            <Network className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="font-headline text-3xl">System Overview</CardTitle>
            <CardDescription className="text-lg">
              AgenteAVA is designed as a modern web application with a clear separation of concerns between the frontend, backend AI logic, and data handling.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Image
              src="https://placehold.co/1200x600.png"
              alt="Overall System Architecture Diagram"
              data-ai-hint="system architecture diagram"
              width={1200}
              height={600}
              className="rounded-lg shadow-md mx-auto object-contain"
            />
          </CardContent>
        </Card>

        {architecturePoints.map((point, index) => (
          <Card key={point.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-up" style={{animationDelay: `${0.3 + index * 0.1}s`}}>
            <div className={`md:flex ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2 p-2">
                 <Image
                  src={point.image.src}
                  alt={point.title}
                  data-ai-hint={point.image.hint}
                  width={600}
                  height={400}
                  className="rounded-md object-cover w-full h-64 md:h-full"
                />
              </div>
              <div className="md:w-1/2">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <point.icon className="h-8 w-8 text-primary mr-3" />
                    <CardTitle className="font-headline text-2xl">{point.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{point.description}</p>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}

// Placeholder for Layers icon if not available in lucide-react
const Layers = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);
