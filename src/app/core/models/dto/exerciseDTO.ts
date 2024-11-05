export interface ExerciseDTO {
  id: number;
  exerciseName: string;
  exerciseDescription?: string;
  seriesQuantity: number;
  repetitionsQuantity: number;
  trainingPlanId: number;
}
