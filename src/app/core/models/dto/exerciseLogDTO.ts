import { ExerciseDTO } from './exerciseDTO';
import { UserDTO } from './userDTO';

export interface ExerciseLogDTO {
  id: number;
  user: UserDTO;
  exercise: ExerciseDTO;
  performedAt: number;
  series: number;
  repetitions: number;
  weight: number;
  duration: number;
  status: string;
}
