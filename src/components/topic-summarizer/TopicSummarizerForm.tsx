// src/components/topic-summarizer/TopicSummarizerForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { SummarizeLessonTopicInput } from "@/ai/flows/summarize-lesson-topic";
import { Loader2 } from "lucide-react";

const summaryFormSchema = z.object({
  topic: z.string().min(3, "Topic name must be at least 3 characters.").max(100, "Topic name must be at most 100 characters."),
  lessonContent: z.string().min(50, "Lesson content must be at least 50 characters.").max(10000, "Lesson content must be at most 10,000 characters."),
});

type SummaryFormData = z.infer<typeof summaryFormSchema>;

interface TopicSummarizerFormProps {
  onSubmit: (data: SummarizeLessonTopicInput) => void;
  isLoading: boolean;
}

export function TopicSummarizerForm({ onSubmit, isLoading }: TopicSummarizerFormProps) {
  const form = useForm<SummaryFormData>({
    resolver: zodResolver(summaryFormSchema),
    defaultValues: {
      topic: "",
      lessonContent: "",
    },
  });

  const handleSubmit = (data: SummaryFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., The Water Cycle" {...field} />
              </FormControl>
              <FormDescription>The main subject of the lesson content.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lessonContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lesson Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste the full lesson material here. The AI will extract key concepts to create a summary."
                  {...field}
                  rows={12}
                  className="min-h-[200px] resize-y"
                />
              </FormControl>
              <FormDescription>Provide detailed content for an accurate summary.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Summarizing...
            </>
          ) : (
            "Generate Summary"
          )}
        </Button>
      </form>
    </Form>
  );
}
