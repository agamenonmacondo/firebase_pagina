'use server';

/**
 * @fileOverview Generates SEO-optimized content for an AI newsletter.
 *
 * - generateNewsletterContent - A function that generates the newsletter content.
 * - GenerateNewsletterContentInput - The input type for the generateNewsletterContent function.
 * - GenerateNewsletterContentOutput - The return type for the generateNewsletterContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateNewsletterContentInputSchema = z.object({
  topic: z.string().describe('The topic of the newsletter.'),
  keywords: z.string().describe('The SEO keywords for the newsletter, comma separated.'),
  tone: z.string().describe('The tone of the newsletter (e.g., informative, humorous, professional).'),
  targetAudience: z.string().describe('The target audience for the newsletter.'),
});
export type GenerateNewsletterContentInput = z.infer<typeof GenerateNewsletterContentInputSchema>;

const GenerateNewsletterContentOutputSchema = z.object({
  title: z.string().describe('The title of the newsletter.'),
  content: z.string().describe('The SEO-optimized content of the newsletter.'),
});
export type GenerateNewsletterContentOutput = z.infer<typeof GenerateNewsletterContentOutputSchema>;

export async function generateNewsletterContent(
  input: GenerateNewsletterContentInput
): Promise<GenerateNewsletterContentOutput> {
  return generateNewsletterContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNewsletterContentPrompt',
  input: {schema: GenerateNewsletterContentInputSchema},
  output: {schema: GenerateNewsletterContentOutputSchema},
  prompt: `You are an expert marketing manager specializing in AI newsletters. Generate SEO-optimized content for the newsletter based on the following information:

Topic: {{{topic}}}
Keywords: {{{keywords}}}
Tone: {{{tone}}}
Target Audience: {{{targetAudience}}}

Write a title and content for the newsletter that will be engaging and informative for the target audience. Optimize the content for search engines using the provided keywords. The content should be well-structured and easy to read. The tone should match the specified tone.

Title:
Content:`, 
});

const generateNewsletterContentFlow = ai.defineFlow(
  {
    name: 'generateNewsletterContentFlow',
    inputSchema: GenerateNewsletterContentInputSchema,
    outputSchema: GenerateNewsletterContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
