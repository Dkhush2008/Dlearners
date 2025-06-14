// src/app/modules/page.tsx
"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ModuleForm } from "@/components/modules/ModuleForm";
import { ModuleList } from "@/components/modules/ModuleList";
import type { Module } from "@/lib/types";
import { BookOpenText, PlusCircle } from "lucide-react";

// Sample data - replace with actual data fetching and state management
const sampleModules: Module[] = [
  {
    id: "1",
    title: "Introduction to Algebra",
    content: "This module covers the basics of algebraic expressions and equations.",
    exercises: [{ id: "ex1", description: "Solve for x: 2x + 5 = 15", type: "text" }],
    isPublic: true,
    teacherId: "teacher1",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: "2",
    title: "Calculus Fundamentals",
    content: "An overview of limits, derivatives, and integrals.",
    exercises: [
      { id: "ex2", description: "Find the derivative of f(x) = x^2", type: "text" },
      { id: "ex3", description: "What is a limit?", type: "text" },
    ],
    isPublic: false,
    teacherId: "teacher1",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: "3",
    title: "World History: Ancient Civilizations",
    content: "Explore the rise and fall of ancient civilizations.",
    exercises: [
      { id: "ex4", description: "List three major achievements of Ancient Egypt.", type: "text" },
    ],
    isPublic: true,
    teacherId: "teacher2",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
];

export default function ModulesPage() {
  const [modules, setModules] = React.useState<Module[]>(sampleModules);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingModule, setEditingModule] = React.useState<Module | null>(null);

  const handleSaveModule = (module: Module) => {
    if (editingModule) {
      setModules(modules.map(m => m.id === module.id ? module : m));
    } else {
      setModules([...modules, { ...module, id: String(Date.now()), createdAt: new Date().toISOString() }]);
    }
    setIsFormOpen(false);
    setEditingModule(null);
  };

  const handleEditModule = (module: Module) => {
    setEditingModule(module);
    setIsFormOpen(true);
  };

  const handleDeleteModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId));
  };
  
  const openCreateForm = () => {
    setEditingModule(null);
    setIsFormOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Content Authoring"
        description="Create, customize, and manage learning modules for your students."
        icon={BookOpenText}
        actions={
          <Button onClick={openCreateForm}>
            <PlusCircle className="mr-2" />
            Create New Module
          </Button>
        }
      />
      
      <Dialog open={isFormOpen} onOpenChange={(open) => { setIsFormOpen(open); if (!open) setEditingModule(null); }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="font-headline">{editingModule ? "Edit Module" : "Create New Module"}</DialogTitle>
          </DialogHeader>
          <ModuleForm 
            initialData={editingModule} 
            onSave={handleSaveModule} 
            onCancel={() => { setIsFormOpen(false); setEditingModule(null); }} 
          />
        </DialogContent>
      </Dialog>

      <ModuleList 
        modules={modules} 
        onEdit={handleEditModule} 
        onDelete={handleDeleteModule} 
      />
    </div>
  );
}
