import { WeightDTO } from './weightDTO';

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  age: number;
  weight: WeightDTO;
  height: number;
  trainingPlansIds?: number[];
}
