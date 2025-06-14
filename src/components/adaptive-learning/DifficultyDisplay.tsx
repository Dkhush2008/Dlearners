// src/components/adaptive-learning/DifficultyDisplay.tsx
import type { AdaptLearningPathOutput } from "@/ai/flows/adapt-learning-path";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft, Info, Sparkles } from "lucide-react";

interface DifficultyDisplayProps {
  adaptationOutput: AdaptLearningPathOutput;
}

export function DifficultyDisplay({ adaptationOutput }: DifficultyDisplayProps) {
  const getDifficultyBadgeVariant = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return 'default';
      case 'medium': return 'secondary';
      case 'hard': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <ArrowRightLeft className="h-6 w-6 text-primary" />
          Learning Path Adaptation Result
        </CardTitle>
        <CardDescription>
          The AI has analyzed the performance and suggested a new difficulty level.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
          <span className="text-lg font-medium text-foreground">New Recommended Difficulty:</span>
          <Badge variant={getDifficultyBadgeVariant(adaptationOutput.newDifficulty)} className="px-3 py-1 text-md capitalize">
            {adaptationOutput.newDifficulty}
          </Badge>
        </div>

        <div>
          <h4 className="font-semibold text-md mb-2 flex items-center gap-2 text-foreground">
            <Info className="h-5 w-5 text-primary/80" />
            Reasoning:
          </h4>
          <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground bg-background p-3 rounded-md border">
            <p>{adaptationOutput.reasoning}</p>
          </div>
        </div>
        
        <div className="flex items-start text-xs text-accent-foreground bg-accent/20 p-3 rounded-md border border-accent/30">
            <Sparkles className="h-5 w-5 mr-2 mt-0.5 text-accent shrink-0" />
            <p>This adaptation helps tailor the learning experience to the student's current understanding, promoting engagement and effective learning.</p>
        </div>
      </CardContent>
    </Card>
  );
}
