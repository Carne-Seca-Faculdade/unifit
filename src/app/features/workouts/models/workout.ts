import { Category } from './category';
import { Exercise } from './exercise';

export type Workout = {
  id: string;
  title: string;
  description: string;
  category?: Category;
  duration: number;
  exercises: Exercise[];
};
