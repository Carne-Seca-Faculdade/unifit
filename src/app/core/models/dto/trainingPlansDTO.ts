import { ExerciseDTO } from './exerciseDTO';

export interface trainingPlansDTO {
  id: number;
  planName: string;
  planDescription?: string;
  exerciseIds?: number[];
  userIds?: number[];
  exercise: ExerciseDTO[];
}
