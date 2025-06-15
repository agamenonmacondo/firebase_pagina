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
import { determineToneStructureAction } from "@/actions/newsletter";
import type { DetermineNewsletterToneStructureOutput } from "@/ai/flows/determine-newsletter-tone-structure";
import { NewsletterResultDisplay } from "./newsletter-result-display";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

const formSchema = z.object({
  topic: z.string().min(5, { message: "Topic must be at least 5 characters." }),
  targetAudience: z.string().min(5, { message: "Target audience must be at least 5 characters." }),
  previousNewsletterPerformance: z.string().min(10, { message: "Performance data must be at least 10 characters." }).or(z.string().length(0)),
});

type DetermineToneStructureFormValues = z.infer<typeof formSchema>;

export function DetermineToneStructureForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetermineNewsletterToneStructureOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<DetermineToneStructureFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      targetAudience: "",
      previousNewsletterPerformance: "",
    },
  });

  async function onSubmit(values: DetermineToneStructureFormValues) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const response = await determineToneStructureAction(values);
    setIsLoading(false);

    if ("error" in response) {
      setError(response.error);
      toast({
        variant: "destructive",
        title: "Error Determining Tone/Structure",
        description: response.error,
      });
    } else {
      setResult(response);
      toast({
        title: "Tone & Structure Determined",
        description: "Recommendations for tone and structure are ready.",
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
                  <Input placeholder="e.g., The Future of Renewable Energy" {...field} />
                </FormControl>
                <FormDescription>The main subject of your newsletter.</FormDescription>
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
                  <Textarea placeholder="e.g., Environmental scientists, policymakers, general public interested in sustainability" {...field} />
                </FormControl>
                <FormDescription>Describe who this newsletter is for.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="previousNewsletterPerformance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Newsletter Performance (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., Open rate: 25%, Click-through rate: 5%, Most clicked link: 'Deep Dive into Solar Panels'" {...field} rows={4}/>
                </FormControl>
                <FormDescription>Provide data on previous newsletters if available.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? <LoadingSpinner text="Determining..." /> : "Determine Tone & Structure"}
          </Button>
        </form>
      </Form>
      {isLoading && !result && !error && <LoadingSpinner className="mt-8" text="AI is crafting suggestions..." />}
      <NewsletterResultDisplay title="Tone & Structure Recommendation" data={result} error={error} />
    </div>
  );
}
