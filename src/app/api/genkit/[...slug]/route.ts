import {createNextApiHandler} from '@genkit-ai/next';
import '@/ai/flows/contact-info-suggestion';

export const {GET, POST} = createNextApiHandler();
