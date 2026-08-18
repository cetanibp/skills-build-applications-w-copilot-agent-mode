import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    badge: { type: String, default: 'New Starter' },
    teamId: { type: String, default: null },
    points: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    members: { type: [String], default: [] },
    points: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    type: {
      type: String,
      enum: ['running', 'walking', 'strength'],
      required: true,
    },
    durationMinutes: { type: Number, required: true },
    distanceMiles: { type: Number },
    caloriesBurned: { type: Number, required: true },
    notes: { type: String },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    rank: { type: Number, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
    team: { type: String, required: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['cardio', 'strength', 'mobility'],
      required: true,
    },
    durationMinutes: { type: Number, required: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
