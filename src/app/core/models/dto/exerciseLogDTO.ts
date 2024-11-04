import { ExerciseDTO } from './exerciseDTO';
import { userDTO } from './userDTO';

export interface ExerciseLogDTO {
  id: number;
  user: userDTO;
  exercise: ExerciseDTO;
  performedAt: number;
  series: number;
  repetitions: number;
  weight: number;
  duration: number;
  status: string;
}
