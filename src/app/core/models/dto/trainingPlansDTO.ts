import { Category } from '../category';
import { ExerciseDTO } from './exerciseDTO';

export interface TrainingPlansDTO {
  id: number;
  planName: string;
  planDescription?: string;
  duration: number;
  exerciseIds?: number[];
  userIds?: number[];
  newExercises?: ExerciseDTO[];
  category?: Category;
}
