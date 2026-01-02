'use server';

import {createApiHandler} from 'genkit/next';
import '@/ai/flows/contact-info-suggestion';

export const {GET, POST} = createApiHandler();
