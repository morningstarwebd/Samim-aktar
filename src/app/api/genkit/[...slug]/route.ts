'use server';

import {ai} from '@/ai/genkit';
import {createApiHandler} from '@genkit-ai/next';
import '@/ai/flows';

export const {GET, POST} = createApiHandler({
  ai,
});
