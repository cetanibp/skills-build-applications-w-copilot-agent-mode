import { Router } from 'express';
import { Activity } from '../models';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find({}).lean();
    res.json({ count: activities.length, results: activities });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch activities.', details: (error as Error).message });
  }
});

router.post('/', async (req, res) => {
  const {
    userId,
    type,
    durationMinutes,
    distanceMiles,
    caloriesBurned,
    notes,
  } = req.body ?? {};

  if (!userId || !type || !durationMinutes || !caloriesBurned) {
    return res.status(400).json({
      error: 'userId, type, durationMinutes, and caloriesBurned are required.',
    });
  }

  try {
    const newActivity = await Activity.create({
      id: `activity-${Date.now()}`,
      userId,
      type,
      durationMinutes,
      distanceMiles,
      caloriesBurned,
      notes,
    });

    return res.status(201).json(newActivity.toObject());
  } catch (error) {
    return res.status(400).json({ error: 'Unable to create activity.', details: (error as Error).message });
  }
});

export default router;
