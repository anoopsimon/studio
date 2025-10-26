'use server';

/**
 * @fileOverview This file contains the Genkit flow for suggesting relevant messages,
 * poems, or greetings based on the selected occasion. This allows users to quickly
 * create a personalized card.
 *
 * - suggestGreeting - A function that calls the suggestGreetingFlow to generate greeting suggestions.
 * - SuggestGreetingInput - The input type for the suggestGreeting function.
 * - SuggestGreetingOutput - The return type for the suggestGreeting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestGreetingInputSchema = z.object({
  occasion: z
    .string()
    .describe('The occasion for the greeting card (e.g., birthday, holiday).'),
  tone: z
    .string()
    .optional()
    .describe('The desired tone of the greeting (e.g., formal, funny, heartfelt).'),
  style: z
    .string()
    .optional()
    .describe('The desired style (e.g. poem, quote, message)'),
});
export type SuggestGreetingInput = z.infer<typeof SuggestGreetingInputSchema>;

const SuggestGreetingOutputSchema = z.object({
  greetingSuggestion: z
    .string()
    .describe('An AI-generated greeting suggestion based on the occasion.'),
});
export type SuggestGreetingOutput = z.infer<typeof SuggestGreetingOutputSchema>;

export async function suggestGreeting(input: SuggestGreetingInput): Promise<SuggestGreetingOutput> {
  return suggestGreetingFlow(input);
}

const suggestGreetingPrompt = ai.definePrompt({
  name: 'suggestGreetingPrompt',
  input: {schema: SuggestGreetingInputSchema},
  output: {schema: SuggestGreetingOutputSchema},
  prompt: `You are a greeting card expert. Generate a greeting suggestion for the following occasion:

Occasion: {{{occasion}}}

{% if tone %}Tone: {{{tone}}}{% endif %}

{% if style %}Style: {{{style}}}{% endif %}
`,
});

const suggestGreetingFlow = ai.defineFlow(
  {
    name: 'suggestGreetingFlow',
    inputSchema: SuggestGreetingInputSchema,
    outputSchema: SuggestGreetingOutputSchema,
  },
  async input => {
    const {output} = await suggestGreetingPrompt(input);
    return output!;
  }
);
