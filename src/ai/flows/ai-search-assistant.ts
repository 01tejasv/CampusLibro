'use server';
/**
 * @fileOverview An AI-powered search assistant that converts natural language queries into structured book search parameters.
 *
 * - aiSearchAssistant - A function that processes a natural language book description to generate search criteria.
 * - AiSearchAssistantInput - The input type for the aiSearchAssistant function.
 * - AiSearchAssistantOutput - The return type for the aiSearchAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSearchAssistantInputSchema = z.object({
  query: z.string().describe('A natural language description of the book the user is looking for.'),
});
export type AiSearchAssistantInput = z.infer<typeof AiSearchAssistantInputSchema>;

const AiSearchAssistantOutputSchema = z.object({
  titleKeywords: z.array(z.string()).describe('A list of keywords that might appear in the book title.').default([]),
  authorKeywords: z.array(z.string()).describe('A list of keywords related to the author of the book.').default([]),
  subjectKeywords: z.array(z.string()).describe('A list of keywords describing the subject or topic of the book.').default([]),
  genre: z.string().optional().describe('The genre of the book, if specified.'),
  isbn: z.string().optional().describe('The ISBN of the book, if specified.'),
  yearPublished: z.string().optional().describe('The publication year of the book, if specified. Can be a specific year or a range (e.g., "1990" or "1990-2000").'),
});
export type AiSearchAssistantOutput = z.infer<typeof AiSearchAssistantOutputSchema>;

export async function aiSearchAssistant(input: AiSearchAssistantInput): Promise<AiSearchAssistantOutput> {
  return aiSearchAssistantFlow(input);
}

const aiSearchAssistantPrompt = ai.definePrompt({
  name: 'aiSearchAssistantPrompt',
  input: {schema: AiSearchAssistantInputSchema},
  output: {schema: AiSearchAssistantOutputSchema},
  prompt: `You are an AI assistant for a college library. Your task is to help students find books by converting their natural language descriptions into structured search queries.

A student will describe the type of book they are looking for. Extract relevant keywords for the book's title, author, subject, and if applicable, the genre, ISBN, or publication year. Provide an empty array if no keywords are found for a category.

Student's description: {{{query}}}`,
});

const aiSearchAssistantFlow = ai.defineFlow(
  {
    name: 'aiSearchAssistantFlow',
    inputSchema: AiSearchAssistantInputSchema,
    outputSchema: AiSearchAssistantOutputSchema,
  },
  async input => {
    const {output} = await aiSearchAssistantPrompt(input);
    return output!;
  }
);
