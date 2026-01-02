'use server';

import {createApiHandler} from 'genkit';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

import '@/ai/flows/contact-info-suggestion';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});

export const {GET, POST} = createApiHandler();
