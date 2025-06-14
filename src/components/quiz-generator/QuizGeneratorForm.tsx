// src/components/quiz-generator/QuizGeneratorForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { GenerateQuizQuestionsInput } from "@/ai/flows/generate-quiz-questions";
import { Loader2 } from "lucide-react";

const quizFormSchema = z.object({
  lessonContent: z.string().min(50, "Lesson content must be at least 50 characters.").max(5000, "Lesson content must be at most 5000 characters."),
  numberOfQuestions: z.coerce.number().min(1).max(10).default(5),
  difficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
});

type QuizFormData = z.infer<typeof quizFormSchema>;

interface QuizGeneratorFormProps {
  onSubmit: (data: GenerateQuizQuestionsInput) => void;
  isLoading: boolean;
}

export function QuizGeneratorForm({ onSubmit, isLoading }: QuizGeneratorFormProps) {
  const form = useForm<QuizFormData>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      lessonContent: "",
      numberOfQuestions: 5,
      difficulty: "medium",
    },
  });

  const handleSubmit = (data: QuizFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="lessonContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lesson Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste the lesson material here. The more detailed the content, the better the quiz questions will be."
                  {...field}
                  rows={10}
                  className="min-h-[150px] resize-y"
                />
              </FormControl>
              <FormDescription>Provide enough text for the AI to understand the context.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfQuestions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Questions</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Quiz"
          )}
        </Button>
      </form>
    </Form>
  );
}
