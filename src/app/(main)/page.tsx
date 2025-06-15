import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/page-container";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Brain, Lightbulb, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <PageContainer>
      <section className="text-center py-16 md:py-24">
        <div className="inline-block p-4 bg-primary/10 rounded-full mb-6 animate-slide-in-up [animation-delay:0.1s]">
          <Bot className="h-12 w-12 text-primary" />
        </div>
        <h1 className="font-headline text-4xl md:text-6xl font-bold mb-6 animate-slide-in-up [animation-delay:0.2s]">
          Welcome to AgenteAVA Showcase
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-slide-in-up [animation-delay:0.3s]">
          Discover the power of AgenteAVA, an innovative project leveraging cutting-edge AI to revolutionize content creation and newsletter management. Explore its architecture, features, and the intelligent solutions it offers.
        </p>
        <div className="space-x-4 animate-slide-in-up [animation-delay:0.4s]">
          <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/project">Explore Project</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/newsletter">AI Newsletter</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 grid md:grid-cols-3 gap-8">
        <Card className="animate-slide-in-up [animation-delay:0.5s] hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="items-center text-center">
            <div className="p-3 bg-primary/10 rounded-full mb-2">
               <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Project Insights</CardTitle>
            <CardDescription>Deep dive into AgenteAVA's development, goals, and the technology stack powering it.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild variant="link">
              <Link href="/project">Learn More &rarr;</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="animate-slide-in-up [animation-delay:0.6s] hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="items-center text-center">
            <div className="p-3 bg-primary/10 rounded-full mb-2">
               <Zap className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Architecture Explained</CardTitle>
            <CardDescription>Understand the robust architecture behind AgenteAVA through diagrams and technical explanations.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild variant="link">
              <Link href="/architecture">View Architecture &rarr;</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="animate-slide-in-up [animation-delay:0.7s] hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="items-center text-center">
             <div className="p-3 bg-primary/10 rounded-full mb-2">
               <Brain className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">AI-Powered Newsletter</CardTitle>
            <CardDescription>Experience intelligent newsletter generation, content relevance analysis, and tone optimization.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild variant="link">
              <Link href="/newsletter">Try AI Tools &rarr;</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

       <section className="py-16 md:py-24 bg-muted/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-lg">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-up [animation-delay:0.8s]">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6">
              Intelligent Content, Effortlessly
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              AgenteAVA utilizes advanced GenAI models to create SEO-optimized newsletter content, determine topic relevance, and suggest the perfect tone and structure. Say goodbye to writer's block and hello to engaging, effective communication.
            </p>
            <p className="text-lg text-muted-foreground">
              Our platform is designed for marketing professionals, content creators, and anyone looking to enhance their outreach with AI-driven insights.
            </p>
          </div>
          <div className="animate-slide-in-up [animation-delay:0.9s]">
            <Image
              src="https://placehold.co/600x400.png"
              alt="AI working on content"
              data-ai-hint="AI content creation"
              width={600}
              height={400}
              className="rounded-lg shadow-xl object-cover"
            />
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
