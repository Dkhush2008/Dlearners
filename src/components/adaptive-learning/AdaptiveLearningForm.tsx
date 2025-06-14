// src/components/adaptive-learning/AdaptiveLearningForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { AdaptLearningPathInput } from "@/ai/flows/adapt-learning-path";
import { Loader2 } from "lucide-react";

const adaptiveFormSchema = z.object({
  studentId: z.string().min(1, "Student ID is required.").default("student123"),
  topic: z.string().min(3, "Topic is required.").default("Basic Algebra"),
  performanceData: z.object({
    exercisesCompleted: z.coerce.number().min(0).default(5),
    correctAnswers: z.coerce.number().min(0).default(3),
    timeSpent: z.coerce.number().min(0).default(30), // in minutes
    hintUsed: z.boolean().default(false),
  }),
  currentDifficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
});

type AdaptiveFormData = z.infer<typeof adaptiveFormSchema>;

interface AdaptiveLearningFormProps {
  onSubmit: (data: AdaptLearningPathInput) => void;
  isLoading: boolean;
}

export function AdaptiveLearningForm({ onSubmit, isLoading }: AdaptiveLearningFormProps) {
  const form = useForm<AdaptiveFormData>({
    resolver: zodResolver(adaptiveFormSchema),
    defaultValues: {
      studentId: "student_001",
      topic: "Introduction to Fractions",
      performanceData: {
        exercisesCompleted: 5,
        correctAnswers: 4,
        timeSpent: 25,
        hintUsed: false,
      },
      currentDifficulty: "medium",
    },
  });

  const handleSubmit = (data: AdaptiveFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student ID</FormLabel>
              <FormControl>
                <Input placeholder="e.g., student123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Topic</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Photosynthesis" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="currentDifficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Difficulty</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select current difficulty" />
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

        <h3 className="text-md font-semibold pt-2 font-headline border-t">Performance Data</h3>
        <FormField
          control={form.control}
          name="performanceData.exercisesCompleted"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercises Completed</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="performanceData.correctAnswers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correct Answers</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="performanceData.timeSpent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Spent (minutes)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="performanceData.hintUsed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-labelledby="hint-used-label"
                />
              </FormControl>
              <FormLabel id="hint-used-label" className="font-normal">
                Hint Used?
              </FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adapting...
            </>
          ) : (
            "Adapt Learning Path"
          )}
        </Button>
      </form>
    </Form>
  );
}
