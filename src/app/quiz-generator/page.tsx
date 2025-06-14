// src/app/quiz-generator/page.tsx
"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { QuizGeneratorForm } from "@/components/quiz-generator/QuizGeneratorForm";
import { QuizDisplay } from "@/components/quiz-generator/QuizDisplay";
import type { QuizQuestion } from "@/lib/types";
import { generateQuizQuestions, type GenerateQuizQuestionsInput } from "@/ai/flows/generate-quiz-questions";
import { BrainCircuit, Lightbulb, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function QuizGeneratorPage() {
  const [quizQuestions, setQuizQuestions] = React.useState<QuizQuestion[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateQuiz = async (data: GenerateQuizQuestionsInput) => {
    setIsLoading(true);
    setError(null);
    setQuizQuestions(null);
    try {
      const result = await generateQuizQuestions(data);
      if (result && result.questions) {
         const formattedQuestions: QuizQuestion[] = result.questions.map((q, index) => ({
          ...q,
          id: `q-${Date.now()}-${index}`, 
          topic: "Generated Quiz" // Placeholder topic
        }));
        setQuizQuestions(formattedQuestions);
      } else {
        throw new Error("Failed to generate quiz questions or received an empty response.");
      }
    } catch (e: any) {
      console.error("Quiz generation error:", e);
      const errorMessage = e.message || "An unknown error occurred during quiz generation.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error Generating Quiz",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="AI Quiz Generator"
        description="Automatically generate practice questions and quizzes based on your learning material. Specify the content, number of questions, and difficulty level."
        icon={BrainCircuit}
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline">Quiz Configuration</CardTitle>
            <CardDescription>Provide the lesson content and set parameters for your quiz.</CardDescription>
          </CardHeader>
          <CardContent>
            <QuizGeneratorForm onSubmit={handleGenerateQuiz} isLoading={isLoading} />
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          {isLoading && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 animate-pulse text-primary" />
                  Generating Quiz...
                </CardTitle>
                <CardDescription>Our AI is crafting your questions. This might take a moment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {error && !isLoading && (
            <Alert variant="destructive">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Quiz Generation Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && quizQuestions && (
            <QuizDisplay questions={quizQuestions} />
          )}
          
          {!isLoading && !error && !quizQuestions && (
             <Card className="flex flex-col items-center justify-center text-center p-8 border-dashed min-h-[300px]">
                <BrainCircuit className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <CardTitle className="font-headline text-xl mb-2">Ready to Generate a Quiz?</CardTitle>
                <CardDescription>Fill out the form on the left to create your AI-powered quiz.</CardDescription>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
