import { PageContainer } from "@/components/shared/page-container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { CheckCircle, Target, Layers, Users } from "lucide-react";

export default function ProjectPage() {
  const techStack = [
    { name: "Next.js", description: "React framework for server-side rendering and static site generation." },
    { name: "TypeScript", description: "Strongly typed JavaScript for enhanced code quality." },
    { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development." },
    { name: "Shadcn/UI", description: "Reusable UI components built with Radix UI and Tailwind CSS." },
    { name: "Firebase Genkit", description: "AI integration framework for building with large language models." },
    { name: "Zod", description: "TypeScript-first schema declaration and validation." },
  ];

  return (
    <PageContainer>
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 animate-slide-in-up">About AgenteAVA</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-up [animation-delay:0.1s]">
          An in-depth look at the AgenteAVA project, its objectives, technology, and development process.
        </p>
      </header>

      <div className="space-y-12">
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-up [animation-delay:0.2s]">
          <div className="md:flex">
            <div className="md:w-1/2">
              <Image
                src="https://placehold.co/800x600.png"
                alt="Project Development"
                data-ai-hint="project development"
                width={800}
                height={600}
                className="object-cover w-full h-64 md:h-full"
              />
            </div>
            <div className="md:w-1/2">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <Target className="h-8 w-8 text-primary mr-3" />
                  <CardTitle className="font-headline text-3xl">Project Goals</CardTitle>
                </div>
                <CardDescription className="text-lg">
                  Empowering users with AI-driven tools for efficient and effective newsletter creation and management.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>AgenteAVA aims to simplify the complexities of content generation by leveraging the power of Generative AI. Our core objectives include:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Providing an intuitive platform for generating SEO-optimized newsletter content.</li>
                  <li>Offering AI-powered analysis to determine content relevance for specific audiences.</li>
                  <li>Assisting in defining the optimal tone and structure for newsletters to maximize engagement.</li>
                  <li>Showcasing the capabilities of modern AI frameworks like Firebase Genkit.</li>
                </ul>
              </CardContent>
            </div>
          </div>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-up [animation-delay:0.3s]">
          <CardHeader>
            <div className="flex items-center mb-2">
               <Layers className="h-8 w-8 text-primary mr-3" />
               <CardTitle className="font-headline text-3xl">Technology Stack</CardTitle>
            </div>
            <CardDescription>
              Built with a modern, robust, and scalable technology stack to deliver a seamless user experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((tech) => (
                <div key={tech.name} className="p-4 border rounded-lg bg-background hover:border-primary transition-colors">
                  <h3 className="font-semibold text-lg mb-1 text-foreground">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-up [animation-delay:0.4s]">
           <CardHeader>
            <div className="flex items-center mb-2">
               <Users className="h-8 w-8 text-primary mr-3" />
               <CardTitle className="font-headline text-3xl">Development Process</CardTitle>
            </div>
            <CardDescription>
              Agile methodologies and a focus on user experience guided the development of AgenteAVA.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>The development of AgenteAVA followed an iterative approach, focusing on delivering core AI functionalities first and then building the user interface around them. Key aspects of our process included:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                <span>
                  <strong>Feature Prioritization:</strong> Identifying and focusing on the most impactful AI features for newsletter management.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                <span>
                  <strong>Modular Design:</strong> Creating reusable components and services for AI interactions and UI elements.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                <span>
                  <strong>Continuous Refinement:</strong> Regularly reviewing and improving AI prompts and model interactions for better results.
                </span>
              </li>
               <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                <span>
                  <strong>Accessibility and UX:</strong> Ensuring the application is accessible and provides a smooth, intuitive user experience across devices and themes.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
