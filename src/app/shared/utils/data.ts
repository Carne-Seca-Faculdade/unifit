import { Workout } from '@core/models/workout';
import { IMC } from './../../core/models/imc';

export const WORKOUTS: Workout[] = [
  {
    id: 'af6372e7-6d3d-45ab-9fc1-17647e1f0cec',
    name: 'Peito e Bíceps',
    description: 'Treino completo para fortalecer o peito e bíceps.',
    duration: 50,
    exercises: [
      {
        id: 'f9e03a3d-3a2d-4d55-bf35-23eede5b2345',
        name: 'Supino reto',
        sets: 4,
        reps: 8,
        workoutId: 'af6372e7-6d3d-45ab-9fc1-17647e1f0cec',
      },
      {
        id: '94e5d0e4-b75f-45c6-b27a-22d89e5387c3',
        name: 'Supino inclinado com halteres',
        sets: 3,
        reps: 10,
        workoutId: 'af6372e7-6d3d-45ab-9fc1-17647e1f0cec',
      },
      {
        id: 'b499e6c9-dfb6-4cb2-b1ae-b72a1c77e27e',
        name: 'Crucifixo',
        sets: 3,
        reps: 12,
        workoutId: 'af6372e7-6d3d-45ab-9fc1-17647e1f0cec',
      },
      {
        id: 'c0db0679-1b08-4bc6-8a43-1ee3c32f53e1',
        name: 'Rosca direta',
        sets: 4,
        reps: 10,
        workoutId: 'af6372e7-6d3d-45ab-9fc1-17647e1f0cec',
      },
      {
        id: 'ef2f5c62-1c9b-48a0-a95f-1aabb5b8cc6d',
        name: 'Rosca martelo',
        sets: 3,
        reps: 12,
        workoutId: 'af6372e7-6d3d-45ab-9fc1-17647e1f0cec',
      },
      {
        id: '7a9a8c8e-cc97-4be2-8721-dcb3e1c4d16a',
        name: 'Flexão de braços',
        sets: 3,
        reps: 15,
        workoutId: 'af6372e7-6d3d-45ab-9fc1-17647e1f0cec',
      },
    ],
  },
  {
    id: 'b60c2eaf-8128-4041-b3c9-7b68b80a65eb',
    name: 'Costas e Tríceps',
    description:
      'Treino para fortalecer as costas e tríceps com foco na simetria.',
    duration: 55,
    exercises: [
      {
        id: '4ae46b52-68c5-4c03-bc63-5ae1da64d1a8',
        name: 'Puxada na barra',
        sets: 4,
        reps: 8,
        workoutId: 'b60c2eaf-8128-4041-b3c9-7b68b80a65eb',
      },
      {
        id: 'cdee61d5-1a0e-4d75-951e-76147b42246b',
        name: 'Remada unilateral',
        sets: 3,
        reps: 10,
        workoutId: 'b60c2eaf-8128-4041-b3c9-7b68b80a65eb',
      },
      {
        id: 'b845028b-0e49-4c39-b0b1-cbb295cd74e5',
        name: 'Remada curvada com barra',
        sets: 3,
        reps: 12,
        workoutId: 'b60c2eaf-8128-4041-b3c9-7b68b80a65eb',
      },
      {
        id: '8ee5b3c0-0e35-4a0b-88d1-43a7e8460ed5',
        name: 'Tríceps na polia alta',
        sets: 4,
        reps: 10,
        workoutId: 'b60c2eaf-8128-4041-b3c9-7b68b80a65eb',
      },
      {
        id: 'a4f33fd0-2cbe-4cc4-9055-947ef5c9a6ec',
        name: 'Mergulho entre bancos',
        sets: 3,
        reps: 12,
        workoutId: 'b60c2eaf-8128-4041-b3c9-7b68b80a65eb',
      },
      {
        id: 'cc880036-d720-4e48-88bb-bdff7f5e0c8d',
        name: 'Extensão de tríceps com halteres',
        sets: 3,
        reps: 15,
        workoutId: 'b60c2eaf-8128-4041-b3c9-7b68b80a65eb',
      },
    ],
  },
  {
    id: '6c5f4799-d1f3-40d2-b0a7-20421ff5d264',
    name: 'Pernas e Ombros',
    description:
      'Treino focado em pernas e ombros, promovendo força e definição.',
    duration: 60,
    exercises: [
      {
        id: '2e35be94-4090-4f54-a802-0f5b4f46e97f',
        name: 'Agachamento',
        sets: 4,
        reps: 8,
        workoutId: '6c5f4799-d1f3-40d2-b0a7-20421ff5d264',
      },
      {
        id: 'a0283aaf-1689-486c-93d2-bc4e3c9e5057',
        name: 'Leg Press',
        sets: 4,
        reps: 10,
        workoutId: '6c5f4799-d1f3-40d2-b0a7-20421ff5d264',
      },
      {
        id: 'ff79b272-8ca1-4269-81de-420748a4da14',
        name: 'Stiff',
        sets: 3,
        reps: 12,
        workoutId: '6c5f4799-d1f3-40d2-b0a7-20421ff5d264',
      },
      {
        id: 'c5f21a2f-35d1-4a8c-a1a4-59f35f6076cb',
        name: 'Desenvolvimento de ombro com halteres',
        sets: 4,
        reps: 10,
        workoutId: '6c5f4799-d1f3-40d2-b0a7-20421ff5d264',
      },
      {
        id: 'a8d20a38-484e-4e37-9b53-fc52d7eeec35',
        name: 'Elevação lateral',
        sets: 3,
        reps: 12,
        workoutId: '6c5f4799-d1f3-40d2-b0a7-20421ff5d264',
      },
      {
        id: '68c1d14d-f52e-4a65-b1b0-e54c6f78e024',
        name: 'Elevação frontal',
        sets: 3,
        reps: 15,
        workoutId: '6c5f4799-d1f3-40d2-b0a7-20421ff5d264',
      },
    ],
  },
];

export const WEIGHt: IMC[] = [
  { id: 1, date: '10/09/2021', weight: 85.0, imc: 25.0 },
  { id: 2, date: '11/10/2021', weight: 84.0, imc: 24.0 },
  { id: 3, date: '12/11/2021', weight: 83.0, imc: 23.0 },
];
