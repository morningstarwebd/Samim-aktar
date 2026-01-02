'use server';

import {createApiHandler} from 'genkit/next';
import {ai} from '@/ai/genkit';
import '@/ai/flows';

export const {GET, POST} = createApiHandler({
  ai,
});
