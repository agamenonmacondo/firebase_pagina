
"use client";

import { PageContainer } from "@/components/shared/page-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerateContentForm } from "@/components/newsletter/generate-content-form";
import { DecideRelevanceForm } from "@/components/newsletter/decide-relevance-form";
import { DetermineToneStructureForm } from "@/components/newsletter/determine-tone-structure-form";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Edit3, CheckSquare, Sliders } from "lucide-react";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function NewsletterPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsLoadingPage(false);
    }
  }, [isAuthenticated, router]);

  if (isLoadingPage) {
    return (
      <PageContainer className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <LoadingSpinner text="Verificando acceso..." />
      </PageContainer>
    );
  }

  // At this point, isAuthenticated is true and isLoadingPage is false
  return (
    <PageContainer>
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 animate-slide-in-up">AI Newsletter Toolkit</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-up [animation-delay:0.1s]">
          Leverage the power of AI to generate, analyze, and optimize your newsletter content.
        </p>
      </header>

      <Tabs defaultValue="generate" className="w-full animate-slide-in-up [animation-delay:0.2s]">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8">
          <TabsTrigger value="generate" className="py-3 text-base">
            <Edit3 className="mr-2 h-5 w-5" /> Generate Content
          </TabsTrigger>
          <TabsTrigger value="relevance" className="py-3 text-base">
            <CheckSquare className="mr-2 h-5 w-5" /> Decide Relevance
          </TabsTrigger>
          <TabsTrigger value="tone-structure" className="py-3 text-base">
            <Sliders className="mr-2 h-5 w-5" /> Determine Tone/Structure
          </TabsTrigger>
        </TabsList>

        <Card className="shadow-xl">
          <TabsContent value="generate">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Generate Newsletter Content</CardTitle>
              <CardDescription>Create SEO-optimized newsletter content based on your topic, keywords, tone, and target audience.</CardDescription>
            </CardHeader>
            <CardContent>
              <GenerateContentForm />
            </CardContent>
          </TabsContent>
          <TabsContent value="relevance">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Decide Newsletter Relevance</CardTitle>
              <CardDescription>Evaluate if a piece of content is relevant for your newsletter and get suggestions for tone and structure.</CardDescription>
            </CardHeader>
            <CardContent>
              <DecideRelevanceForm />
            </CardContent>
          </TabsContent>
          <TabsContent value="tone-structure">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Determine Newsletter Tone & Structure</CardTitle>
              <CardDescription>Get AI recommendations for the optimal tone and structure of your newsletter based on its topic and audience.</CardDescription>
            </CardHeader>
            <CardContent>
              <DetermineToneStructureForm />
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </PageContainer>
  );
}
