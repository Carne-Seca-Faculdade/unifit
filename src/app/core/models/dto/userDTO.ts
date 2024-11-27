import { WeightDTO } from './weightDTO';

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  age: number;
  weight: WeightDTO;
  height: number;
  trainingPlansIds?: number[];
}
