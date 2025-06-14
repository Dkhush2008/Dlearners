
export interface Module {
  id: string;
  title: string;
  content: string; // Main lesson content
  exercises: Array<{
    id: string;
    description: string;
    type: 'text' | 'multiple-choice'; // Example exercise types
    // Add more fields for specific exercise types if needed
  }>;
  isPublic: boolean;
  teacherId: string; // ID of the teacher who created it
  createdAt: string; // ISO date string
}

export interface QuizQuestion {
  id: string;
  question: string;
  options?: string[]; // For multiple-choice questions
  answer: string | string[]; // Can be single string for text, or array of correct option indices/values
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string; // Related topic or module ID
}

export interface UserProgress {
  userId: string;
  moduleId: string;
  completedExercises: string[]; // Array of exercise IDs
  quizScores: Array<{
    quizId: string; // or a more specific identifier if quizzes are separate entities
    score: number; // Percentage or raw score
    takenAt: string; // ISO date string
  }>;
  overallProgress?: number; // Percentage for the module
}

export interface StudentPerformanceData {
  exercisesCompleted: number;
  correctAnswers: number;
  timeSpent: number; // in minutes
  hintUsed: boolean;
}
