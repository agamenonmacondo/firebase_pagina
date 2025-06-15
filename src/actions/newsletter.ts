"use server";

import { 
  generateNewsletterContent, 
  type GenerateNewsletterContentInput,
  type GenerateNewsletterContentOutput 
} from "@/ai/flows/generate-newsletter";
import { 
  decideNewsletterRelevance, 
  type DecideNewsletterRelevanceInput,
  type DecideNewsletterRelevanceOutput
} from "@/ai/flows/decide-newsletter-relevance";
import { 
  determineNewsletterToneStructure, 
  type DetermineNewsletterToneStructureInput,
  type DetermineNewsletterToneStructureOutput
} from "@/ai/flows/determine-newsletter-tone-structure";

export async function generateContentAction(
  input: GenerateNewsletterContentInput
): Promise<GenerateNewsletterContentOutput | { error: string }> {
  try {
    // Add any necessary validation or authentication checks here
    const result = await generateNewsletterContent(input);
    return result;
  } catch (error) {
    console.error("Error in generateContentAction:", error);
    return { error: error instanceof Error ? error.message : "An unknown error occurred" };
  }
}

export async function decideRelevanceAction(
  input: DecideNewsletterRelevanceInput
): Promise<DecideNewsletterRelevanceOutput | { error: string }> {
  try {
    const result = await decideNewsletterRelevance(input);
    return result;
  } catch (error) {
    console.error("Error in decideRelevanceAction:", error);
    return { error: error instanceof Error ? error.message : "An unknown error occurred" };
  }
}

export async function determineToneStructureAction(
  input: DetermineNewsletterToneStructureInput
): Promise<DetermineNewsletterToneStructureOutput | { error: string }> {
  try {
    const result = await determineNewsletterToneStructure(input);
    return result;
  } catch (error) {
    console.error("Error in determineToneStructureAction:", error);
    return { error: error instanceof Error ? error.message : "An unknown error occurred" };
  }
}
