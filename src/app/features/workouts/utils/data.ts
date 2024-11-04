import { Workout } from '../models/workout';

export const WORKOUTS: Workout[] = [
  {
    id: '1',
    name: 'Peito e Bíceps',
    description: 'Treino completo para fortalecer o peito e bíceps.',
    duration: 50,
    exercises: [
      {
        id: '1',
        name: 'Supino reto',
        sets: 4,
        reps: 8,
      },
      {
        id: '2',
        name: 'Supino inclinado com halteres',
        sets: 3,
        reps: 10,
      },
      {
        id: '3',
        name: 'Crucifixo',
        sets: 3,
        reps: 12,
      },
      {
        id: '4',
        name: 'Rosca direta',
        sets: 4,
        reps: 10,
      },
      {
        id: '5',
        name: 'Rosca martelo',
        sets: 3,
        reps: 12,
      },
      {
        id: '6',
        name: 'Flexão de braços',
        sets: 3,
        reps: 15,
      },
    ],
  },
  {
    id: '2',
    name: 'Costas e Tríceps',
    description:
      'Treino para fortalecer as costas e tríceps com foco na simetria.',
    duration: 55,
    exercises: [
      {
        id: '7',
        name: 'Puxada na barra',
        sets: 4,
        reps: 8,
      },
      {
        id: '8',
        name: 'Remada unilateral',
        sets: 3,
        reps: 10,
      },
      {
        id: '9',
        name: 'Remada curvada com barra',
        sets: 3,
        reps: 12,
      },
      {
        id: '10',
        name: 'Tríceps na polia alta',
        sets: 4,
        reps: 10,
      },
      {
        id: '11',
        name: 'Mergulho entre bancos',
        sets: 3,
        reps: 12,
      },
      {
        id: '12',
        name: 'Extensão de tríceps com halteres',
        sets: 3,
        reps: 15,
      },
    ],
  },
  {
    id: '3',
    name: 'Pernas e Ombros',
    description:
      'Treino focado em pernas e ombros, promovendo força e definição.',
    duration: 60,
    exercises: [
      {
        id: '13',
        name: 'Agachamento',
        sets: 4,
        reps: 8,
      },
      {
        id: '14',
        name: 'Leg Press',
        sets: 4,
        reps: 10,
      },
      {
        id: '15',
        name: 'Stiff',
        sets: 3,
        reps: 12,
      },
      {
        id: '16',
        name: 'Desenvolvimento de ombro com halteres',
        sets: 4,
        reps: 10,
      },
      {
        id: '17',
        name: 'Elevação lateral',
        sets: 3,
        reps: 12,
      },
      {
        id: '18',
        name: 'Elevação frontal',
        sets: 3,
        reps: 15,
      },
    ],
  },
];
