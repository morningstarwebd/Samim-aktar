'use server';

import {createApiHandler} from 'genkit';
import {ai} from '@/ai/genkit';

// This import is what registers the flow with the API handler.
import '@/ai/flows/contact-info-suggestion';

// This exports the Next.js API route handlers.
export const {GET, POST} = createApiHandler({
  ai, // Pass the initialized ai object to the handler
});
