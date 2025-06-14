// src/app/adaptive-learning/page.tsx
"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { AdaptiveLearningForm } from "@/components/adaptive-learning/AdaptiveLearningForm";
import { DifficultyDisplay } from "@/components/adaptive-learning/DifficultyDisplay";
import { adaptLearningPath, type AdaptLearningPathInput, type AdaptLearningPathOutput } from "@/ai/flows/adapt-learning-path";
import { TrendingUp, Lightbulb, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function AdaptiveLearningPage() {
  const [adaptationOutput, setAdaptationOutput] = React.useState<AdaptLearningPathOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleAdaptPath = async (data: AdaptLearningPathInput) => {
    setIsLoading(true);
    setError(null);
    setAdaptationOutput(null);
    try {
      const result = await adaptLearningPath(data);
      if (result && result.newDifficulty) {
        setAdaptationOutput(result);
      } else {
        throw new Error("Failed to adapt learning path or received an empty response.");
      }
    } catch (e: any) {
      console.error("Adaptive learning error:", e);
      const errorMessage = e.message || "An unknown error occurred during path adaptation.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error Adapting Path",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Adaptive Learning Path Demo"
        description="Simulate student performance to see how the AI adapts the learning difficulty. This demonstrates the intelligent adjustment of content presentation."
        icon={TrendingUp}
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline">Performance Input</CardTitle>
            <CardDescription>Enter simulated student performance data to trigger adaptation.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdaptiveLearningForm onSubmit={handleAdaptPath} isLoading={isLoading} />
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          {isLoading && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 animate-pulse text-primary" />
                  Adapting Learning Path...
                </CardTitle>
                <CardDescription>Our AI is analyzing the performance and adjusting the difficulty. This might take a moment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          )}

          {error && !isLoading && (
            <Alert variant="destructive">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Path Adaptation Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && adaptationOutput && (
            <DifficultyDisplay adaptationOutput={adaptationOutput} />
          )}

          {!isLoading && !error && !adaptationOutput && (
             <Card className="flex flex-col items-center justify-center text-center p-8 border-dashed min-h-[300px]">
                <TrendingUp className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <CardTitle className="font-headline text-xl mb-2">Ready to Adapt?</CardTitle>
                <CardDescription>Fill out the performance form on the left to see AI-driven path adaptation in action.</CardDescription>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
