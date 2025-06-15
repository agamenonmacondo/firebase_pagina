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
import { decideRelevanceAction } from "@/actions/newsletter";
import type { DecideNewsletterRelevanceOutput } from "@/ai/flows/decide-newsletter-relevance";
import { NewsletterResultDisplay } from "./newsletter-result-display";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

const formSchema = z.object({
  content: z.string().min(20, { message: "Content must be at least 20 characters." }),
  newsletterTopic: z.string().min(5, { message: "Newsletter topic must be at least 5 characters." }),
});

type DecideRelevanceFormValues = z.infer<typeof formSchema>;

export function DecideRelevanceForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DecideNewsletterRelevanceOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<DecideRelevanceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      newsletterTopic: "",
    },
  });

  async function onSubmit(values: DecideRelevanceFormValues) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const response = await decideRelevanceAction(values);
    setIsLoading(false);

    if ("error" in response) {
      setError(response.error);
      toast({
        variant: "destructive",
        title: "Error Deciding Relevance",
        description: response.error,
      });
    } else {
      setResult(response);
      toast({
        title: "Relevance Assessed",
        description: "Content relevance has been successfully assessed.",
      });
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="newsletterTopic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Newsletter Topic</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Advancements in Quantum Computing" {...field} />
                </FormControl>
                <FormDescription>The main topic of your newsletter.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content to Evaluate</FormLabel>
                <FormControl>
                  <Textarea placeholder="Paste or write the content you want to evaluate for relevance..." {...field} rows={6}/>
                </FormControl>
                <FormDescription>The piece of content you're considering for the newsletter.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
             {isLoading ? <LoadingSpinner text="Assessing..." /> : "Assess Relevance"}
          </Button>
        </form>
      </Form>
      {isLoading && !result && !error && <LoadingSpinner className="mt-8" text="AI is analyzing..." />}
      <NewsletterResultDisplay title="Relevance Assessment" data={result} error={error} />
    </div>
  );
}
