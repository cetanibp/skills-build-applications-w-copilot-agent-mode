export type User = {
  id: string;
  name: string;
  email: string;
  badge: string;
  teamId: string | null;
  points: number;
};

export type Team = {
  id: string;
  name: string;
  members: string[];
  points: number;
};

export type Activity = {
  id: string;
  userId: string;
  type: 'running' | 'walking' | 'strength';
  durationMinutes: number;
  distanceMiles?: number;
  caloriesBurned: number;
  notes?: string;
};

export type LeaderboardEntry = {
  rank: number;
  userId: string;
  name: string;
  points: number;
  team: string;
};

export type Workout = {
  id: string;
  title: string;
  category: 'cardio' | 'strength' | 'mobility';
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
};

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Ava Martinez',
    email: 'ava@example.com',
    badge: 'Marathon Mindset',
    teamId: 'team-1',
    points: 1200,
  },
  {
    id: 'user-2',
    name: 'Leo Chen',
    email: 'leo@example.com',
    badge: 'Power Builder',
    teamId: 'team-1',
    points: 1045,
  },
  {
    id: 'user-3',
    name: 'Mia Johnson',
    email: 'mia@example.com',
    badge: 'Steady Strider',
    teamId: 'team-2',
    points: 980,
  },
];

export const teams: Team[] = [
  {
    id: 'team-1',
    name: 'Velocity Squad',
    members: ['user-1', 'user-2'],
    points: 2245,
  },
  {
    id: 'team-2',
    name: 'Momentum Makers',
    members: ['user-3'],
    points: 980,
  },
];

export const activities: Activity[] = [
  {
    id: 'activity-1',
    userId: 'user-1',
    type: 'running',
    durationMinutes: 35,
    distanceMiles: 3.5,
    caloriesBurned: 420,
    notes: 'Morning run before school',
  },
  {
    id: 'activity-2',
    userId: 'user-2',
    type: 'strength',
    durationMinutes: 45,
    caloriesBurned: 330,
    notes: 'Upper body circuit',
  },
  {
    id: 'activity-3',
    userId: 'user-3',
    type: 'walking',
    durationMinutes: 25,
    distanceMiles: 1.8,
    caloriesBurned: 180,
    notes: 'Walked on the track after lunch',
  },
];

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: 'user-1', name: 'Ava Martinez', points: 1200, team: 'Velocity Squad' },
  { rank: 2, userId: 'user-2', name: 'Leo Chen', points: 1045, team: 'Velocity Squad' },
  { rank: 3, userId: 'user-3', name: 'Mia Johnson', points: 980, team: 'Momentum Makers' },
];

export const workouts: Workout[] = [
  {
    id: 'workout-1',
    title: 'Cardio Blast',
    category: 'cardio',
    durationMinutes: 20,
    difficulty: 'beginner',
    description: 'A quick interval run with active recovery.',
  },
  {
    id: 'workout-2',
    title: 'Power Circuit',
    category: 'strength',
    durationMinutes: 30,
    difficulty: 'intermediate',
    description: 'Push-ups, squats, and bands for overall strength.',
  },
  {
    id: 'workout-3',
    title: 'Mobility Reset',
    category: 'mobility',
    durationMinutes: 15,
    difficulty: 'beginner',
    description: 'Dynamic stretching and balance work for recovery.',
  },
];
