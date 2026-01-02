'use server';

/**
 * @fileOverview Generates a personalized response message for patient inquiries based on their initial message.
 *
 * - generateContactMessage - A function that generates a personalized contact message.
 * - ContactMessageInput - The input type for the generateContactMessage function.
 * - ContactMessageOutput - The return type for the generateContactMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContactMessageInputSchema = z.object({
  patientMessage: z
    .string()
    .describe('The initial message from the patient.'),
});
export type ContactMessageInput = z.infer<typeof ContactMessageInputSchema>;

const ContactMessageOutputSchema = z.object({
  suggestedMessage: z
    .string()
    .describe('A personalized suggested response message for the patient.'),
});
export type ContactMessageOutput = z.infer<typeof ContactMessageOutputSchema>;

export async function generateContactMessage(
  input: ContactMessageInput
): Promise<ContactMessageOutput> {
  return contactMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contactMessagePrompt',
  input: {schema: ContactMessageInputSchema},
  output: {schema: ContactMessageOutputSchema},
  prompt: `You are a helpful assistant tasked with drafting personalized response messages to patients based on their initial inquiries.\n\nGiven the patient's message below, generate a response that acknowledges their concerns and offers relevant information or next steps. Keep the message concise and professional.\n\nPatient Message: {{{patientMessage}}}\n\nSuggested Response:`,
});

const contactMessageFlow = ai.defineFlow(
  {
    name: 'contactMessageFlow',
    inputSchema: ContactMessageInputSchema,
    outputSchema: ContactMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
