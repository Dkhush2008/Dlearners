'use server';

/**
 * @fileOverview Automatically generates quiz questions of varying difficulty based on the content of a lesson module.
 *
 * - generateQuizQuestions - A function that generates quiz questions based on lesson content.
 * - GenerateQuizQuestionsInput - The input type for the generateQuizQuestions function.
 * - GenerateQuizQuestionsOutput - The return type for the generateQuizQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizQuestionsInputSchema = z.object({
  lessonContent: z
    .string()
    .describe('The content of the lesson module to generate questions for.'),
  numberOfQuestions: z
    .number()
    .default(5)
    .describe('The number of quiz questions to generate.'),
  difficulty: z
    .enum(['easy', 'medium', 'hard'])
    .default('medium')
    .describe('The difficulty level of the quiz questions.'),
});
export type GenerateQuizQuestionsInput = z.infer<
  typeof GenerateQuizQuestionsInputSchema
>;

const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().describe('The quiz question.'),
      answer: z.string().describe('The correct answer to the question.'),
      difficulty: z
        .enum(['easy', 'medium', 'hard'])
        .describe('The difficulty level of the question.'),
    })
  ),
});
export type GenerateQuizQuestionsOutput = z.infer<
  typeof GenerateQuizQuestionsOutputSchema
>;

export async function generateQuizQuestions(
  input: GenerateQuizQuestionsInput
): Promise<GenerateQuizQuestionsOutput> {
  return generateQuizQuestionsFlow(input);
}

const generateQuizQuestionsPrompt = ai.definePrompt({
  name: 'generateQuizQuestionsPrompt',
  input: {schema: GenerateQuizQuestionsInputSchema},
  output: {schema: GenerateQuizQuestionsOutputSchema},
  prompt: `You are an expert teacher generating quiz questions for a lesson module.

  Generate {{numberOfQuestions}} quiz questions of {{difficulty}} difficulty based on the following lesson content:

  {{lessonContent}}

  The questions should assess the student's understanding of the material. Each question object should have the 'question', 'answer', and 'difficulty' fields.
  Output a JSON array of question objects. Do not include any surrounding explanatory text.
  Ensure that the difficulty for each question is correctly set based on the user's requested difficulty level.
  `,
});

const generateQuizQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionsFlow',
    inputSchema: GenerateQuizQuestionsInputSchema,
    outputSchema: GenerateQuizQuestionsOutputSchema,
  },
  async input => {
    const {output} = await generateQuizQuestionsPrompt(input);
    return output!;
  }
);
