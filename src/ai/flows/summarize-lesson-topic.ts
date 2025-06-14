'use server';
/**
 * @fileOverview Summarizes a lesson topic.
 *
 * - summarizeLessonTopic - A function that summarizes a lesson topic.
 * - SummarizeLessonTopicInput - The input type for the summarizeLessonTopic function.
 * - SummarizeLessonTopicOutput - The return type for the summarizeLessonTopic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeLessonTopicInputSchema = z.object({
  topic: z.string().describe('The topic of the lesson to summarize.'),
  lessonContent: z.string().describe('The content of the lesson.'),
});
export type SummarizeLessonTopicInput = z.infer<
  typeof SummarizeLessonTopicInputSchema
>;

const SummarizeLessonTopicOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the lesson topic.'),
  progress: z.string().describe('Progress summary of the summary.'),
});
export type SummarizeLessonTopicOutput = z.infer<
  typeof SummarizeLessonTopicOutputSchema
>;

export async function summarizeLessonTopic(
  input: SummarizeLessonTopicInput
): Promise<SummarizeLessonTopicOutput> {
  return summarizeLessonTopicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeLessonTopicPrompt',
  input: {schema: SummarizeLessonTopicInputSchema},
  output: {schema: SummarizeLessonTopicOutputSchema},
  prompt: `You are an expert educator. Please provide a concise summary of the following lesson topic, focusing on the key concepts:

Topic: {{{topic}}}
Content: {{{lessonContent}}}

Summary:`,
});

const summarizeLessonTopicFlow = ai.defineFlow(
  {
    name: 'summarizeLessonTopicFlow',
    inputSchema: SummarizeLessonTopicInputSchema,
    outputSchema: SummarizeLessonTopicOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output!,
      progress: 'Generated a concise summary of the lesson topic.',
    };
  }
);
