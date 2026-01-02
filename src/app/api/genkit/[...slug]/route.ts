'use server';

import {createApiHandler} from 'genkit';
import '@/ai/flows/contact-info-suggestion';

export const {GET, POST} = createApiHandler();
