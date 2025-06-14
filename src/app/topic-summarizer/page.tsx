// src/app/topic-summarizer/page.tsx
"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TopicSummarizerForm } from "@/components/topic-summarizer/TopicSummarizerForm";
import { SummaryDisplay } from "@/components/topic-summarizer/SummaryDisplay";
import { summarizeLessonTopic, type SummarizeLessonTopicInput, type SummarizeLessonTopicOutput } from "@/ai/flows/summarize-lesson-topic";
import { ScrollText, Lightbulb, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function TopicSummarizerPage() {
  const [summaryOutput, setSummaryOutput] = React.useState<SummarizeLessonTopicOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateSummary = async (data: SummarizeLessonTopicInput) => {
    setIsLoading(true);
    setError(null);
    setSummaryOutput(null);
    try {
      const result = await summarizeLessonTopic(data);
      if (result && result.summary) {
        setSummaryOutput(result);
      } else {
        throw new Error("Failed to generate summary or received an empty response.");
      }
    } catch (e: any) {
      console.error("Summary generation error:", e);
      const errorMessage = e.message || "An unknown error occurred during summary generation.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error Generating Summary",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="AI Topic Summarizer"
        description="Get concise summaries of key lesson topics. Provide the topic name and the content you want to summarize."
        icon={ScrollText}
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline">Summarization Input</CardTitle>
            <CardDescription>Enter the details for the topic you want summarized.</CardDescription>
          </CardHeader>
          <CardContent>
            <TopicSummarizerForm onSubmit={handleGenerateSummary} isLoading={isLoading} />
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          {isLoading && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 animate-pulse text-primary" />
                  Generating Summary...
                </CardTitle>
                <CardDescription>Our AI is distilling the key points. This might take a moment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          )}

          {error && !isLoading && (
            <Alert variant="destructive">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Summary Generation Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && summaryOutput && (
            <SummaryDisplay summaryOutput={summaryOutput} />
          )}

          {!isLoading && !error && !summaryOutput && (
             <Card className="flex flex-col items-center justify-center text-center p-8 border-dashed min-h-[300px]">
                <ScrollText className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <CardTitle className="font-headline text-xl mb-2">Ready to Summarize?</CardTitle>
                <CardDescription>Fill out the form on the left to get your AI-powered summary.</CardDescription>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
