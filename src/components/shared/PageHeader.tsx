// src/components/shared/PageHeader.tsx
import type { LucideIcon } from 'lucide-react';
import * as React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, icon: Icon, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 space-y-2 sm:mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-7 w-7 text-primary sm:h-8 sm:w-8" />}
          <h1 className="text-2xl font-headline font-bold tracking-tight sm:text-3xl">{title}</h1>
        </div>
        {actions && <div className="flex flex-shrink-0 gap-2">{actions}</div>}
      </div>
      {description && <p className="text-muted-foreground max-w-2xl">{description}</p>}
    </div>
  );
}
