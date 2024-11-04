export interface ExerciseDTO {
  id: number;
  exerciseName: string;
  exerciseDescription?: string;
  seriesQuantity: number;
  repetitionsQuantity: number;
  weightUsed: number;
  restTime: number;
  trainingPlanId?: number;
  progressId: number;
  bodyWeight: number;
}
