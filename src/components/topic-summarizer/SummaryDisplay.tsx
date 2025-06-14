// src/components/topic-summarizer/SummaryDisplay.tsx
import type { SummarizeLessonTopicOutput } from "@/ai/flows/summarize-lesson-topic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MessageSquareText } from "lucide-react";

interface SummaryDisplayProps {
  summaryOutput: SummarizeLessonTopicOutput;
}

export function SummaryDisplay({ summaryOutput }: SummaryDisplayProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <MessageSquareText className="h-6 w-6 text-primary" />
          Generated Summary
        </CardTitle>
        <CardDescription>
          Here is a concise summary of the provided lesson topic.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="prose prose-sm max-w-none dark:prose-invert text-foreground bg-muted/30 p-4 rounded-md border">
          {summaryOutput.summary.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        {summaryOutput.progress && (
          <div className="flex items-center text-xs text-green-600 bg-green-50 p-2 rounded-md border border-green-200">
            <CheckCircle className="h-4 w-4 mr-2" />
            <p>{summaryOutput.progress}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
