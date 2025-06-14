// src/components/modules/ModuleForm.tsx
"use client";

import * as React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Module } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlusCircle, Trash2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const exerciseSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, "Exercise description is required."),
  type: z.enum(["text", "multiple-choice"]).default("text"),
});

const moduleSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters."),
  content: z.string().min(10, "Content must be at least 10 characters."),
  exercises: z.array(exerciseSchema).max(10, "Maximum 10 exercises allowed."),
  isPublic: z.boolean().default(false),
  teacherId: z.string().default("teacher1"), // Placeholder
});

type ModuleFormData = z.infer<typeof moduleSchema>;

interface ModuleFormProps {
  initialData?: Module | null;
  onSave: (data: ModuleFormData) => void;
  onCancel: () => void;
}

export function ModuleForm({ initialData, onSave, onCancel }: ModuleFormProps) {
  const form = useForm<ModuleFormData>({
    resolver: zodResolver(moduleSchema),
    defaultValues: initialData || {
      title: "",
      content: "",
      exercises: [],
      isPublic: false,
      teacherId: "teacher1", // Replace with actual logged-in teacher ID
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "exercises",
  });

  const onSubmit = (data: ModuleFormData) => {
    onSave(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Introduction to Photosynthesis" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Explain the core concepts of the module..." {...field} rows={6} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium font-headline">Exercises</CardTitle>
            <FormDescription>Add interactive exercises for this module.</FormDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md space-y-3 bg-muted/20 relative">
                <FormField
                  control={form.control}
                  name={`exercises.${index}.description`}
                  render={({ field: exerciseField }) => (
                    <FormItem>
                      <FormLabel>Exercise {index + 1} Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the task or question..." {...exerciseField} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 {/* Placeholder for exercise type selection if needed in future */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
                  aria-label={`Remove exercise ${index + 1}`}
                >
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>
            ))}
             {fields.length < 10 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ id: `new_${Date.now()}`, description: "", type: "text" })}
                className="w-full border-dashed hover:border-primary hover:text-primary"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Exercise
              </Button>
            )}
            {form.formState.errors.exercises && !form.formState.errors.exercises.root && (
                 <p className="text-sm font-medium text-destructive">{form.formState.errors.exercises.message}</p>
             )}
          </CardContent>
        </Card>


        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-background">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-labelledby="is-public-label"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel id="is-public-label">
                  Make this module public?
                </FormLabel>
                <FormDescription>
                  Public modules can be accessed by other teachers in the community.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving..." : (initialData ? "Save Changes" : "Create Module")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
