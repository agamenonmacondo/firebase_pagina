"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { generateContentAction } from "@/actions/newsletter";
import type { GenerateNewsletterContentOutput } from "@/ai/flows/generate-newsletter";
import { NewsletterResultDisplay } from "./newsletter-result-display";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

const formSchema = z.object({
  topic: z.string().min(5, { message: "Topic must be at least 5 characters." }),
  keywords: z.string().min(3, { message: "Keywords must be at least 3 characters." }),
  tone: z.string().min(3, { message: "Tone must be at least 3 characters." }),
  targetAudience: z.string().min(5, { message: "Target audience must be at least 5 characters." }),
});

type GenerateContentFormValues = z.infer<typeof formSchema>;

export function GenerateContentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateNewsletterContentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<GenerateContentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      keywords: "",
      tone: "Informative",
      targetAudience: "",
    },
  });

  async function onSubmit(values: GenerateContentFormValues) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const response = await generateContentAction(values);
    setIsLoading(false);

    if ("error" in response) {
      setError(response.error);
      toast({
        variant: "destructive",
        title: "Error Generating Content",
        description: response.error,
      });
    } else {
      setResult(response);
      toast({
        title: "Content Generated",
        description: "Newsletter content has been successfully generated.",
      });
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Newsletter Topic</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Latest AI breakthroughs" {...field} />
                </FormControl>
                <FormDescription>The main subject of your newsletter.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Keywords</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., artificial intelligence, machine learning, innovation" {...field} />
                </FormControl>
                <FormDescription>Comma-separated keywords for SEO optimization.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tone of Voice</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Informative, Humorous, Professional" {...field} />
                </FormControl>
                <FormDescription>The desired tone for the newsletter content.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetAudience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Audience</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., Tech enthusiasts, AI researchers, Business leaders" {...field} />
                </FormControl>
                <FormDescription>Describe who this newsletter is for.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? <LoadingSpinner text="Generating..." /> : "Generate Content"}
          </Button>
        </form>
      </Form>
      {isLoading && !result && !error && <LoadingSpinner className="mt-8" text="AI is thinking..." />}
      <NewsletterResultDisplay title="Generated Content" data={result} error={error} />
    </div>
  );
}
