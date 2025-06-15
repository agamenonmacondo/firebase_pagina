// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview This file defines a Genkit flow that uses an LLM tool to determine the relevance of content for a newsletter.
 *
 * - decideNewsletterRelevance - A function that uses an LLM tool to determine the relevance of content for a newsletter.
 * - DecideNewsletterRelevanceInput - The input type for the decideNewsletterRelevance function.
 * - DecideNewsletterRelevanceOutput - The return type for the decideNewsletterRelevance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DecideNewsletterRelevanceInputSchema = z.object({
  content: z.string().describe('The content to evaluate for newsletter relevance.'),
  newsletterTopic: z.string().describe('The main topic of the newsletter.'),
});
export type DecideNewsletterRelevanceInput = z.infer<
  typeof DecideNewsletterRelevanceInputSchema
>;

const DecideNewsletterRelevanceOutputSchema = z.object({
  isRelevant: z.boolean().describe('Whether the content is relevant to the newsletter topic.'),
  relevanceExplanation: z
    .string()
    .describe('Explanation of why the content is relevant or not.'),
  suggestedTone: z
    .string()
    .describe('Suggested tone for presenting the content in the newsletter.'),
  suggestedStructure: z
    .string()
    .describe('Suggested structure for presenting the content in the newsletter.'),
});
export type DecideNewsletterRelevanceOutput = z.infer<
  typeof DecideNewsletterRelevanceOutputSchema
>;

export async function decideNewsletterRelevance(
  input: DecideNewsletterRelevanceInput
): Promise<DecideNewsletterRelevanceOutput> {
  return decideNewsletterRelevanceFlow(input);
}

const decideNewsletterRelevanceTool = ai.defineTool({
  name: 'decideNewsletterRelevance',
  description: 'Determines the relevance of content for a newsletter and suggests tone/structure.',
  inputSchema: DecideNewsletterRelevanceInputSchema,
  outputSchema: DecideNewsletterRelevanceOutputSchema,
  async resolve(input) {
    // Placeholder implementation - replace with actual LLM logic
    return {
      isRelevant: true, // Replace with LLM decision
      relevanceExplanation: 'This is a placeholder explanation.', // Replace with LLM explanation
      suggestedTone: 'Informative', // Replace with LLM suggestion
      suggestedStructure: 'Brief summary followed by detailed information.', // Replace with LLM suggestion
    };
  },
});

const decideNewsletterRelevancePrompt = ai.definePrompt({
  name: 'decideNewsletterRelevancePrompt',
  tools: [decideNewsletterRelevanceTool],
  prompt: `Determine the relevance of the following content to the newsletter topic. Use the decideNewsletterRelevance tool to make a determination as to the suitability of the content.

Newsletter Topic: {{{newsletterTopic}}}
Content: {{{content}}}`,
});

const decideNewsletterRelevanceFlow = ai.defineFlow(
  {
    name: 'decideNewsletterRelevanceFlow',
    inputSchema: DecideNewsletterRelevanceInputSchema,
    outputSchema: DecideNewsletterRelevanceOutputSchema,
  },
  async input => {
    const {output} = await decideNewsletterRelevancePrompt(input);
    return output!;
  }
);
