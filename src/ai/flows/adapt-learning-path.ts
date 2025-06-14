'use server';

/**
 * @fileOverview Adjusts the difficulty of exercises and content based on student performance.
 *
 * - adaptLearningPath - A function that adjusts the learning path based on student performance.
 * - AdaptLearningPathInput - The input type for the adaptLearningPath function.
 * - AdaptLearningPathOutput - The return type for the adaptLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptLearningPathInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  topic: z.string().describe('The topic of the current lesson.'),
  performanceData: z
    .object({
      exercisesCompleted: z.number().describe('The number of exercises completed.'),
      correctAnswers: z.number().describe('The number of correct answers.'),
      timeSpent: z.number().describe('The time spent on the lesson in minutes.'),
      hintUsed: z.boolean().describe('Whether the student used a hint.'),
    })
    .describe('Data about the student performance on the current lesson.'),
  currentDifficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The current difficulty level of the lesson.'),
});
export type AdaptLearningPathInput = z.infer<typeof AdaptLearningPathInputSchema>;

const AdaptLearningPathOutputSchema = z.object({
  newDifficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The new difficulty level of the lesson.'),
  reasoning: z.string().describe('The reasoning behind the difficulty adjustment.'),
});
export type AdaptLearningPathOutput = z.infer<typeof AdaptLearningPathOutputSchema>;

export async function adaptLearningPath(input: AdaptLearningPathInput): Promise<AdaptLearningPathOutput> {
  return adaptLearningPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptLearningPathPrompt',
  input: {schema: AdaptLearningPathInputSchema},
  output: {schema: AdaptLearningPathOutputSchema},
  prompt: `You are an AI learning path adapter that adjusts the difficulty of the lesson based on student performance.

  Student ID: {{{studentId}}}
  Topic: {{{topic}}}
  Performance Data: 
    - Exercises Completed: {{{performanceData.exercisesCompleted}}}
    - Correct Answers: {{{performanceData.correctAnswers}}}
    - Time Spent: {{{performanceData.timeSpent}}} minutes
    - Hint Used: {{{performanceData.hintUsed}}}
  Current Difficulty: {{{currentDifficulty}}}

  Based on the student's performance, determine whether the difficulty should be increased, decreased, or remain the same.

  Consider the following factors:
    - A high number of correct answers and a short amount of time spent may indicate that the difficulty should be increased.
    - A low number of correct answers and a long amount of time spent may indicate that the difficulty should be decreased.
    - Using a hint may indicate that the difficulty should be decreased.

  Return the new difficulty level and the reasoning behind the adjustment.`,
});

const adaptLearningPathFlow = ai.defineFlow(
  {
    name: 'adaptLearningPathFlow',
    inputSchema: AdaptLearningPathInputSchema,
    outputSchema: AdaptLearningPathOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
