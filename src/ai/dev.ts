import { config } from 'dotenv';
config();

import '@/ai/flows/generate-newsletter.ts';
import '@/ai/flows/decide-newsletter-relevance.ts';
import '@/ai/flows/determine-newsletter-tone-structure.ts';