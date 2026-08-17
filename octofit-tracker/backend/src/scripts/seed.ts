import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = [
      { id: 'user-1', name: 'Ava Martinez', email: 'ava@example.com', badge: 'Marathon Mindset', teamId: 'team-1', points: 1200 },
      { id: 'user-2', name: 'Leo Chen', email: 'leo@example.com', badge: 'Power Builder', teamId: 'team-1', points: 1045 },
      { id: 'user-3', name: 'Mia Johnson', email: 'mia@example.com', badge: 'Steady Strider', teamId: 'team-2', points: 980 },
      { id: 'user-4', name: 'Noah Patel', email: 'noah@example.com', badge: 'Recovery Pro', teamId: 'team-2', points: 910 },
    ];

    const teams = [
      { id: 'team-1', name: 'Velocity Squad', members: ['user-1', 'user-2'], points: 2245 },
      { id: 'team-2', name: 'Momentum Makers', members: ['user-3', 'user-4'], points: 1890 },
    ];

    const activities = [
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
      {
        id: 'activity-4',
        userId: 'user-4',
        type: 'running',
        durationMinutes: 28,
        distanceMiles: 2.9,
        caloriesBurned: 310,
        notes: 'Evening tempo run',
      },
    ];

    const leaderboard = [
      { id: 'leaderboard-1', rank: 1, userId: 'user-1', name: 'Ava Martinez', points: 1200, team: 'Velocity Squad' },
      { id: 'leaderboard-2', rank: 2, userId: 'user-2', name: 'Leo Chen', points: 1045, team: 'Velocity Squad' },
      { id: 'leaderboard-3', rank: 3, userId: 'user-3', name: 'Mia Johnson', points: 980, team: 'Momentum Makers' },
      { id: 'leaderboard-4', rank: 4, userId: 'user-4', name: 'Noah Patel', points: 910, team: 'Momentum Makers' },
    ];

    const workouts = [
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
      {
        id: 'workout-4',
        title: 'Hill Sprint Ladder',
        category: 'cardio',
        durationMinutes: 25,
        difficulty: 'advanced',
        description: 'Progressive sprints designed to improve explosive endurance.',
      },
    ];

    await User.insertMany(users);
    await Team.insertMany(teams);
    await Activity.insertMany(activities);
    await LeaderboardEntry.insertMany(leaderboard);
    await Workout.insertMany(workouts);

    const summary = {
      users: await User.countDocuments(),
      teams: await Team.countDocuments(),
      activities: await Activity.countDocuments(),
      leaderboard: await LeaderboardEntry.countDocuments(),
      workouts: await Workout.countDocuments(),
    };

    console.log('Database seeding complete');
    console.log('Seed summary:', summary);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
