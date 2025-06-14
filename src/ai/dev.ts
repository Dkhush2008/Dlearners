import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-lesson-topic.ts';
import '@/ai/flows/generate-quiz-questions.ts';
import '@/ai/flows/adapt-learning-path.ts';