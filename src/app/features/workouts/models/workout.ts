import { Category } from './category';
import { Exercise } from './exercise';

export type Workout = {
  id: string;
  name: string;
  description: string;
  category?: Category;
  duration: number;
  exercises: Exercise[];
};
