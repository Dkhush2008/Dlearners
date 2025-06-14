// src/components/dashboard/ProgressCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressCardProps {
  title: string;
  value: number;
  total?: number;
  icon: LucideIcon;
  color?: string;
  bgColor?: string;
}

export function ProgressCard({ title, value, total, icon: Icon, color = "text-primary", bgColor = "bg-primary/10" }: ProgressCardProps) {
  const percentage = total ? (value / total) * 100 : value;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", bgColor, color)}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {total ? `${value}/${total}` : `${value}%`}
        </div>
        {total && <p className="text-xs text-muted-foreground pt-1">Progress towards goal</p>}
        {!total && <p className="text-xs text-muted-foreground pt-1">Completion rate</p>}
        <Progress value={percentage} aria-label={`${title} progress: ${percentage.toFixed(0)}%`} className="mt-3 h-2" indicatorClassName={cn(color.replace("text-", "bg-"))}/>
      </CardContent>
    </Card>
  );
}
