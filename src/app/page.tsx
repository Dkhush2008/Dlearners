// src/app/page.tsx (Dashboard Page)
import { PageHeader } from "@/components/shared/PageHeader";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, ArrowRight, BookOpenText, BrainCircuit, CheckCircle2, LayoutDashboard, PlusCircle, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Sample data - replace with actual data fetching and state management
const userProgress = [
  { title: "Overall Progress", value: 75, icon: CheckCircle2, color: "text-green-500", bgColor: "bg-green-100" },
  { title: "Modules Completed", value: 8, total: 12, icon: BookOpenText, color: "text-blue-500", bgColor: "bg-blue-100" },
  { title: "Quizzes Passed", value: 15, total: 20, icon: BrainCircuit, color: "text-purple-500", bgColor: "bg-purple-100" },
  { title: "Students Active", value: 25, icon: Users, color: "text-yellow-500", bgColor: "bg-yellow-100" }, // For teachers/admins
];

const recentActivities = [
  { id: "1", text: "New module 'Introduction to Algebra' created.", timestamp: "2 hours ago", icon: BookOpenText },
  { id: "2", text: "Student John Doe completed 'Calculus Basics' quiz.", timestamp: "5 hours ago", icon: CheckCircle2 },
  { id: "3", text: "Adaptive path adjusted for student Jane Smith.", timestamp: "1 day ago", icon: TrendingUp },
  { id: "4", text: "Quiz generated for 'Physics Fundamentals'.", timestamp: "2 days ago", icon: BrainCircuit },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your learning activities and progress."
        icon={LayoutDashboard}
        actions={
          <Link href="/modules/create" passHref legacyBehavior>
            <Button>
              <PlusCircle className="mr-2" />
              Create Module
            </Button>
          </Link>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {userProgress.map((item, index) => (
          <ProgressCard
            key={index}
            title={item.title}
            value={item.value}
            total={item.total}
            icon={item.icon}
            color={item.color}
            bgColor={item.bgColor}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Activity className="h-6 w-6 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Track recent events and updates across the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <ul className="space-y-4">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">
                      <activity.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Quick Access</CardTitle>
            <CardDescription>Jump quickly to common tasks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/modules" passHref legacyBehavior>
              <Button variant="outline" className="w-full justify-start">
                <BookOpenText className="mr-2 h-5 w-5" /> View All Modules
              </Button>
            </Link>
            <Link href="/quiz-generator" passHref legacyBehavior>
              <Button variant="outline" className="w-full justify-start">
                <BrainCircuit className="mr-2 h-5 w-5" /> Generate a Quiz
              </Button>
            </Link>
            <Link href="/adaptive-learning" passHref legacyBehavior>
              <Button variant="outline" className="w-full justify-start">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><path d="M12 20h4"/><path d="M12 4H8"/></svg>
                Explore Adaptive Paths
              </Button>
            </Link>
             <div className="relative aspect-video w-full overflow-hidden rounded-lg mt-4">
                <Image src="https://placehold.co/600x400.png" alt="Educational graphic" layout="fill" objectFit="cover" data-ai-hint="education technology"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-4 flex flex-col justify-end">
                    <h3 className="text-lg font-semibold text-primary-foreground font-headline">Unlock Potential</h3>
                    <p className="text-sm text-primary-foreground/80">Discover new learning tools.</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
