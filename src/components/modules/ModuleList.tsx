// src/components/modules/ModuleList.tsx
import type { Module } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit3, Eye, Globe, Lock, Share2, Trash2 } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import Image from "next/image";

interface ModuleListProps {
  modules: Module[];
  onEdit: (module: Module) => void;
  onDelete: (moduleId: string) => void;
}

export function ModuleList({ modules, onEdit, onDelete }: ModuleListProps) {
  if (modules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center shadow-sm">
        <BookOpenText className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold font-headline text-foreground">No Modules Yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Get started by creating your first learning module.
        </p>
        {/* Optional: Add a create button here if not present elsewhere on the page */}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {modules.map((module) => (
        <Card key={module.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-40 w-full">
            <Image 
              src={`https://placehold.co/600x400.png?text=${encodeURIComponent(module.title)}`} 
              alt={module.title} 
              layout="fill" 
              objectFit="cover"
              data-ai-hint="education abstract"
            />
             <Badge variant={module.isPublic ? "default" : "secondary"} className="absolute top-2 right-2">
              {module.isPublic ? <Globe className="mr-1 h-3 w-3" /> : <Lock className="mr-1 h-3 w-3" />}
              {module.isPublic ? "Public" : "Private"}
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="font-headline text-lg truncate" title={module.title}>{module.title}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Created {formatDistanceToNow(new Date(module.createdAt), { addSuffix: true })}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-3">{module.content}</p>
            <div className="mt-3">
              <Badge variant="outline">Exercises: {module.exercises.length}</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-2 border-t pt-4">
            <Button variant="ghost" size="sm" onClick={() => alert(`View module ${module.id}`)} className="text-muted-foreground hover:text-primary">
              <Eye className="mr-1.5 h-4 w-4" /> View
            </Button>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" onClick={() => onEdit(module)} aria-label={`Edit ${module.title}`}>
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="icon" onClick={() => onDelete(module.id)} aria-label={`Delete ${module.title}`}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
